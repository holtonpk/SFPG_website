import { postToShopify } from "../../lib/validations/shopify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { handle } = req.query; // Extract the id (handle) from the query parameters

  const data = await postToShopify({
    query: `
      query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          title
          id
          handle
          descriptionHtml
          collections(first: 10) {
            edges {
              node {
                title
              }
            }
          }
          totalInventory
          ratingAverage: metafield(namespace: "reviews", key: "ratingAverage") {
            value
          }
          ratingCount: metafield(namespace: "reviews", key: "ratingCount") {
            value
          }
          productReviews: metafield(namespace: "reviews", key: "productReviews") {
            value
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                quantityAvailable

                priceV2 {
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                src
                altText
              }
            }
          }
        }
      }
    `,
    variables: {
      handle: handle, // Use the handle as a variable
    },
  });

  res.status(200).json(data);
}
