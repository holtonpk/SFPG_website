import { NextApiRequest, NextApiResponse } from "next";
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/sales", async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Your GraphQL query
    const query = `
    {
        orders(first: 10) {
          edges {
            node {
              id
              name
              email
              customer{
                firstName
                lastName
              }
              totalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              totalShippingPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              createdAt
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      price
                      product {
                        handle
                      }
                      inventoryItem {
                        unitCost{
                          amount
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    // Make the GraphQL request using fetch or another HTTP client
    const response = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env
            .NEXT_PUBLIC_ADMIN_ACCESS_TOKEN as string,
        },
        body: JSON.stringify({ query }),
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
