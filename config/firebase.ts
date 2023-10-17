import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { useRouter } from "next/router"; // Import the useRouter hook from Next.js

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const analytics = getAnalyticsIfNotLocalhost();
// Export a function to get analytics conditionally
export function getAnalyticsIfNotLocalhost() {
  const router = useRouter(); // Get the router instance

  // Check if the current route starts with "/admin"
  if (!router.pathname.startsWith("/admin")) {
    var host = window.location.hostname;
    if (host !== "localhost") {
      return getAnalytics(app);
    }
  }

  return null; // Disable analytics for /admin route or localhost
}
