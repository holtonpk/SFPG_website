import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import twilio from "twilio";

admin.initializeApp();

export const shopifyWebhook = functions.https.onRequest(async (req, res) => {
  // Parse webhook body
  const webhook = req.body;

  console.log("Webbbb$$$", webhook);

  // Shopify webhook topics

  // Get order details
  // const orderDetails = webhook.order;

  // Create Twilio client
  const client = twilio(
    "ACd5a134fd46c7ab11506aa4109c9d4ea2",
    "14b77569afb66b60c408af452d0ffeef"
  );

  await client.messages.create({
    body: `💲💲 ${name} placed and order for $${webhook.total_price} 💲💲`,
    from: "+18447352798",
    to: "+17206482708",
  });

  // Return 200 OK
  res.status(200).send();
});
