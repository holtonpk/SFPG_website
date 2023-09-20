import { postToShopify } from "../../lib/validations/shopify";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // Parse lineItems from request headers
  const lineItemsHeader = _req.headers["x-line-items"];
  let lineItems;

  if (lineItemsHeader) {
    try {
      lineItems = JSON.parse(lineItemsHeader);
    } catch (error) {
      res.status(400).json({ error: "Invalid x-line-items header format" });
      return;
    }
  } else {
    res.status(400).json({ error: "x-line-items header is missing" });
    return;
  }

  const data = await postToShopify({
    query: `
            mutation($lineItems: [CheckoutLineItemInput!]!) {
              checkoutCreate(input: {
                lineItems: $lineItems
              }) {
                checkout {
                  id
                  webUrl
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `,
    variables: { lineItems },
  });

  res.status(200).json(data);
}

// [{ variantId: "gid://shopify/ProductVariant/7687490601184", quantity: 1 }]
