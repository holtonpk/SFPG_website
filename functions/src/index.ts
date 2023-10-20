import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const processShopifyWebhook = functions.https.onCall(
  async (data, context) => {
    // Check if the request is authenticated (optional but recommended)
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Authentication required."
      );
    }

    const {shopifyData} = data;

    try {
      const firestore = admin.firestore();
      const docRef = firestore.collection("sales").doc();
      await docRef.set(shopifyData);

      return {
        message: "Webhook data processed and Firestore updated successfully",
      };
    } catch (error) {
      console.error("Error processing Shopify webhook:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Error processing Shopify webhook"
      );
    }
  }
);
