import { postToShopify } from "../../lib/validations/shopify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const id = _req.query.id;

  const data = await postToShopify({
    query: `
    query GetProductsById($id: ID!) {
    product(id: $id) {
      title
      id
      handle
      descriptionHtml
collections(first: 10) {
  edges {
    node {
      title
    }}}
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
  }`,
    variables: {
      id: `gid://shopify/Product/${id}`,
    },
  });

  res.status(200).json(data);
}

// 8732971761980

// {
//   query: `
//   query getProductList {
//     products(first: 10, reverse: true) {
//       edges {
//         node {
//           id
//           handle
//           descriptionHtml
//           title
//           totalInventory
//           ratingAverage: metafield(namespace: "reviews", key: "ratingAverage") {
//             value
//           }
//           ratingCount: metafield(namespace: "reviews", key: "ratingCount") {
//             value
//           }
//           productReviews: metafield(namespace: "reviews", key: "productReviews") {
//             value
//           }
//           variants(first: 5) {
//             edges {
//               node {
//                 id
//                 title
//                 quantityAvailable
//                 priceV2 {
//                   amount
//                   currencyCode
//                 }
//                 compareAtPriceV2 {
//                   amount
//                   currencyCode
//                 }
//               }
//             }
//           }
//           priceRange {
//             maxVariantPrice {
//               amount
//               currencyCode
//             }
//             minVariantPrice {
//               amount
//               currencyCode
//             }
//           }
//           images(first: 10) {
//             edges {
//               node {
//                 src
//                 altText
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `,
//   variables: {},
// }
