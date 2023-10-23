import {NextApiRequest, NextApiResponse} from "next";
import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import {app} from "@/config/firebase";

export const db = getFirestore(app);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // try {
  //   const ordersSnapshot = await getDocs(collection(db, "orders"));
  //   const ordersArray = [];

  //   for (const doc of ordersSnapshot.docs) {
  //     let order = doc.data();
  //     const lineItems = [];

  //     for (const lineItem of order.line_items) {
  //       const unitCost = await getUnitCost(lineItem.variant_id);

  //       lineItems.push({
  //         title: lineItem.title,
  //         quantity: lineItem.quantity,
  //         variant: {
  //           price: lineItem.price_set.shop_money.amount,
  //           product: {
  //             id: lineItem.product_id,
  //             title: lineItem.name,
  //           },
  //           unitCost,
  //         },
  //       });
  //     }

  //     const revenue = Number(order.current_total_price);
  //     const shippingPrice = Number(
  //       order.total_shipping_price_set.shop_money.amount
  //     );

  //     ordersArray.push({
  //       id: order.id,
  //       name: order.name,
  //       email: order.email,
  //       customer: {
  //         firstName: order.customer.first_name,
  //         lastName: order.customer.last_name,
  //       },
  //       createdAt: order.createdAt,
  //       lineItems,
  //       revenue,
  //       shippingPrice,
  //       order: order,
  //     });
  //   }

  //   const data = await Promise.all(ordersArray);

  //   res.status(200).json(data);
  // } catch (error) {
  //   console.error("Error fetching and processing orders:", error);
  //   res.status(500).json({error: "Internal Server Error"});
  // }
  res.status(200).json({message: "hello"});
}

// const getUnitCost = async (variantId: string) => {
//   // fetch the product from firebase
//   const variantRef = doc(db, "products", variantId);
//   const variantSnap = await getDoc(variantRef);
//   const variantData = variantSnap.data();
//   // find variant by variantId
//   const variant = variantData.variants.find(
//     (variant: any) => variant.id === variantId
//   );

//   const inventoryItemId = variant.inventory_item_id;

//   //  create a shopify query to fetch  inventoryItem cost for each lineItem
//   const query = `{
//   inventoryItem(id: gid://shopify/InventoryItem/${inventoryItemId}) {
//     id
//     unitCost{
//       amount
//     }
//   }
// }`;
//   // fetch the data from shopify
//   const response = await fetch("https://api.easypost.com/v2/shipments", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Shopify-Access-Token": process.env
//         .NEXT_PUBLIC_ADMIN_ACCESS_TOKEN as string,
//     },
//     body: JSON.stringify({
//       query,
//     }),
//   });
//   const data = await response.json();
//   const unitCost = data.data.inventoryItem.unitCost.amount;
//   return unitCost;
// };
