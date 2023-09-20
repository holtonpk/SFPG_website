import { postToShopify } from "../../lib/validations/shopify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await postToShopify({
    query: `
    query getProductList {
      products(first: 10, reverse: true) {
        edges {
          node {
            id
            handle
            descriptionHtml
            title
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
      }
    }
  `,
    variables: {},
  });

  res.status(200).json(data);
}
