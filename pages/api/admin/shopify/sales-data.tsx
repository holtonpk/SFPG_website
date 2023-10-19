import { NextApiRequest, NextApiResponse } from "next";
import { promises as fsPromises } from "fs";
import { SalesData } from "@/app/admin/types/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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

    const dataRaw = await response.json();
    const salesData: SalesData[] = dataRaw.data.orders.edges.map(
      (order: any) => {
        const productCost: number = order.node.lineItems.edges.reduce(
          (acc: number, item: any) => {
            return (
              acc + Number(item.node.variant.inventoryItem.unitCost.amount)
            );
          },
          0
        );

        const revenue: number = Number(
          order.node.totalPriceSet.shopMoney.amount
        );
        const shippingPrice: number = Number(
          order.node.totalShippingPriceSet.shopMoney.amount
        );

        const profit: number =
          Math.round(
            ((revenue - shippingPrice - productCost) as number) * 100
          ) / 100;

        return {
          id: order.node.id,
          customerId: order.node.name,
          customer: {
            firstName: order.node.customer.firstName,
            lastName: order.node.customer.lastName,
          },
          email: order.node.email,
          revenue,
          profit,
          shippingPrice,
          createdAt: order.node.createdAt,
        };
      }
    );

    // Sort the salesData array by createdAt in ascending order (oldest to newest)
    salesData.sort(
      (b, a) =>
        new Date(a.createdAt as string).getTime() -
        new Date(b.createdAt as string).getTime()
    );

    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
}
