"use client";
import React, { useContext, useState, useEffect, createContext } from "react";
import { app } from "@/config/firebase";
import { Author } from "@/app/admin/types";
import { getAuth } from "firebase/auth";
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  updateProfile,
  signInWithPopup,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";

import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

interface DeleteAccountResponse {
  success?: string;
  error?: string;
}

interface AuthType {
  currentUser: UserData | undefined;
  signIn: (email: string, password: string) => Promise<any>;
  createAccount: (
    email: string,
    name: { first: string; last: string },
    password: string
  ) => Promise<any>;
  logInWithGoogle: () => Promise<any>;
  logOut: () => Promise<void>;
  changeUserPassword: (currentPassword: string, newPassword: string) => any;
  changeUserEmail: (currentPassword: string, newEmail: string) => any;
  changeUserDisplayName: (newName: string) => any;
  resetPassword: () => any;
  uploadProfilePicture: (file: File) => any;
  changeProfilePicture: (url: string) => any;
  DeleteAccount: () => Promise<DeleteAccountResponse>;
  author: Author;
}

const Auth = createContext<AuthType | null>(null);

export const emailRef = React.createRef();

export function useAuth() {
  return useContext(Auth);
}

export const db = getFirestore(app);

export interface UserData extends FirebaseUser {
  firstName: string;
  lastName: string;
  avatar: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = getAuth(app);

  const [currentUser, setCurrentUser] = useState<UserData | undefined>(
    undefined
  );
  const author: Author = {
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    avatar: currentUser?.avatar || "",
    email: currentUser?.uid || "",
  };

  const [loading, setLoading] = useState(true);
  const [rerender, setRerender] = useState(true);

  // const router = useRouter();

  const defaultProfilePictures: string[] = [
    "https://firebasestorage.googleapis.com/v0/b/tikdrop-788d3.appspot.com/o/profile-pictures%2F1.png?alt=media&token=2fa64355-bc2d-485e-bc6b-3bd5ac6aaa05",
    "https://firebasestorage.googleapis.com/v0/b/tikdrop-788d3.appspot.com/o/profile-pictures%2F2.png?alt=media&token=0a370360-d7e8-463e-8173-d27b9ba104b6",
    "https://firebasestorage.googleapis.com/v0/b/tikdrop-788d3.appspot.com/o/profile-pictures%2F3.png?alt=media&token=94ed0bda-533a-48bb-b4a5-6120156c47e6",
  ];

  // Function to pick a random image URL from the array
  function getRandomImageUrl(): string {
    const randomIndex = Math.floor(
      Math.random() * defaultProfilePictures.length
    );
    return defaultProfilePictures[randomIndex] as string;
  }

  async function createAccount(
    email: string,
    name: { first: string; last: string },
    password: string
  ) {
    const account = createUserWithEmailAndPassword(auth, email, password)
      .then((cred: any) => {
        createUserStorage(cred?.user.uid, name, email);

        // updateProfile(cred.user, {
        //   displayName: name,
        //   avatar: profileUrl,
        // });
        // createUserStorage(cred?.user);
        return { success: cred };
      })
      .catch((error) => {
        return { error: error.code };
      });

    return account;
  }

  function signIn(email: string, password: string) {
    const login = signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        return { success: value };
      })
      .catch((error) => {
        console.log("error((((", error);
        return { error: error.code };
      });
    return login;
  }

  function logOut() {
    setCurrentUser(undefined);
    return signOut(auth);
  }

  async function logInWithGoogle(): Promise<{ success?: any; error?: any }> {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      if (result.user) {
        await createUserStorage(
          result.user.uid,
          {
            first: result.user?.displayName?.split(" ")[0] || "",
            last: result.user?.displayName?.split(" ")[1] || "",
          },
          result.user.email || "",
          result.user.photoURL || ""
        );
        setCurrentUser({
          ...result.user,
          firstName: result.user?.displayName?.split(" ")[0] || "",
          lastName: result.user?.displayName?.split(" ")[1] || "",
          avatar: result.user.photoURL || "",
        });
        return { success: result };
      } else {
        return { error: result };
      }
    } catch (error: any) {
      return { error };
    }
  }

  const DeleteAccount = async (): Promise<DeleteAccountResponse> => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        await deleteDoc(userRef);
        await deleteUser(user);
        return { success: "Account deleted successfully." };
      } catch (error) {
        return { success: "failed to delete account" };
      }
    } else {
      return { success: "failed to delete account" };
    }
  };

  const createUserStorage = async (
    uid: string,
    name: { first: string; last: string },
    email: string,
    avatar?: string
  ) => {
    console.log("createUserStorage", uid);
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    console.log("userSnap", userSnap.exists);
    if (!userSnap.exists()) {
      console.log("creating...");
      await setDoc(userRef, {
        firstName: name.first,
        lastName: name.last,
        email: email,
        avatar: avatar || (getRandomImageUrl() as string),
        uid: uid,
      });
    }

    // if (!user.avatar) {
    //   const profileUrl = getRandomImageUrl() as string;
    //   updateProfile(user, {
    //     avatar: profileUrl,
    //   });
    // }
  };

  const uploadProfilePicture = async (file: any) => {
    if (!currentUser) return;
    const storage = getStorage();
    const storageRef = ref(storage, `profile-pictures/${currentUser.uid}`);
    // Create a upload task
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: "image/jpeg", // Manually set the MIME type
    });

    // Create a promise to handle the upload task
    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // You may want to use these to provide feedback to the user
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          // Handle successful uploads on complete
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  };

  const changeProfilePicture = async (url: string) => {
    if (!currentUser) return;
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      avatar: url,
    });
    // updateProfile(firebaseUser, {
    //   avatar: url,
    // });
  };

  // import {
  //   getAuth,
  //   EmailAuthProvider,
  //   reauthenticateWithCredential,
  //   updatePassword
  // } from "firebase/auth";

  async function changeUserPassword(
    currentPassword: string,
    newPassword: string
  ) {
    if (!auth.currentUser || !auth.currentUser.email) {
      return { error: "No user is currently signed in" };
    }

    // Create a credential
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );

    // Re-authenticate the user.
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
    } catch (error) {
      return { error: "Current password is incorrect" };
    }

    // Update the user's password.
    try {
      await updatePassword(auth.currentUser, newPassword);
      return { success: "Password updated successfully" };
    } catch (error) {
      return { error: "Error updating password: " + error };
    }
  }

  function resetPassword() {
    if (!currentUser || !currentUser.email)
      return { error: "No user is signed in" };
    const reset = sendPasswordResetEmail(auth, currentUser.email)
      .then((result) => {
        return "success";
      })
      .catch((error) => {
        console.log("error(((((", error);
        return error.code;
      });

    return reset;
  }

  async function changeUserDisplayName(newDisplayName: string) {
    if (!currentUser) return { error: "No user is signed in" };
    try {
      // await updateProfile(firebaseUser, {
      //   displayName: newDisplayName,
      // });
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        firstName: newDisplayName.split(" ")[0],
        lastName: newDisplayName.split(" ")[1],
      });
      return { success: "Display name updated successfully" };
    } catch (error) {
      return { error: error };
    }
  }

  async function changeUserEmail(newEmail: string, currentPassword: string) {
    if (!currentUser) return { error: "No user is signed in" };
    // Re-authenticate the user
    console.log("currentPassword", currentPassword);
    const credential = EmailAuthProvider.credential(
      currentUser.email as string,
      currentPassword
    );
    console.log("credential", credential);
    try {
      await reauthenticateWithCredential(currentUser, credential);
      // Change the email
      await updateEmail(currentUser, newEmail);
      return { success: "Email updated successfully" };
    } catch (error) {
      return { error: error };
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user?.uid) {
        const token = await user.getIdToken();
        // nookies.set(undefined, "token", token, { path: "/" });
      }
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        if (!userData) return;
        await auth.currentUser?.getIdToken(true);
        const decodedToken = await auth.currentUser?.getIdTokenResult();
        console.log("decodedToken", decodedToken?.claims?.stripeRole);

        setCurrentUser({
          ...user,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          avatar: userData?.avatar,
        });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [rerender, auth]);

  const value = {
    currentUser,
    signIn,
    createAccount,
    logInWithGoogle,
    logOut,
    changeUserDisplayName,
    changeUserEmail,
    changeUserPassword,
    resetPassword,
    uploadProfilePicture,
    changeProfilePicture,
    DeleteAccount,
    author,
  };

  return <Auth.Provider value={value}>{!loading && children}</Auth.Provider>;
}
