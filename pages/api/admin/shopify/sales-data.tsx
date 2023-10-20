import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Step 1: Create a bulk operation to fetch the data
    const bulkOperationQuery = `
      mutation {
        bulkOperationRunQuery(
          query: """
          {
            orders {
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
                  lineItems {
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
                            unitCost {
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
          """
        ) {
          bulkOperation {
            id
            status
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const bulkOperationResponse = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env
            .NEXT_PUBLIC_ADMIN_ACCESS_TOKEN as string,
        },
        body: JSON.stringify({ query: bulkOperationQuery }),
      }
    );

    const bulkOperationData = await bulkOperationResponse.json();
    const bulkOperationId: string =
      bulkOperationData.data.bulkOperationRunQuery.bulkOperation.id;

    // Step 2: Check the status of the bulk operation periodically
    let bulkOperationStatus: string;
    do {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again

      const checkStatusQuery = `
        query {
          node(id: "${bulkOperationId}") {
            ... on BulkOperation {
              status
            }
          }
        }
      `;

      const statusResponse = await fetch(
        process.env.NEXT_PUBLIC_ADMIN_API_URL as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": process.env
              .NEXT_PUBLIC_ADMIN_ACCESS_TOKEN as string,
          },
          body: JSON.stringify({ query: checkStatusQuery }),
        }
      );

      const statusData = await statusResponse.json();
      bulkOperationStatus = statusData.data.node.status;
    } while (bulkOperationStatus === "RUNNING");

    if (bulkOperationStatus !== "COMPLETED") {
      throw new Error(
        `Bulk operation failed with status: ${bulkOperationStatus}`
      );
    }

    // Step 3: Retrieve the data from the bulk operation file
    const fileQuery = `
      query {
        node(id: "${bulkOperationId}") {
          ... on BulkOperation {
            url
          }
        }
      }
    `;

    const fileResponse = await fetch(
      process.env.NEXT_PUBLIC_ADMIN_API_URL as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env
            .NEXT_PUBLIC_ADMIN_ACCESS_TOKEN as string,
        },
        body: JSON.stringify({ query: fileQuery }),
      }
    );

    const fileData = await fileResponse.json();
    const dataUrl: string = fileData.data.node.url;

    // Step 4: Fetch and process the data from the provided URL
    const dataResponse = await fetch(dataUrl);
    const dataRaw: string = await dataResponse.text();
    const dataLines: string[] = dataRaw
      .split("\n")
      .filter((line) => line.trim());
    const orders: Record<string, any>[] = [];

    dataLines.forEach((line) => {
      const jsonLine: Record<string, any> = JSON.parse(line);

      if (jsonLine.id) {
        // Start of a new order
        const order: Record<string, any> = { ...jsonLine, lineItems: [] };
        orders.push(order);
      } else if (jsonLine.__parentId) {
        // LineItem associated with the last order
        const lastOrder = orders[orders.length - 1];
        if (lastOrder) {
          lastOrder.lineItems.push(jsonLine);
        }
      }
    });

    // data processing logic
    const salesData = orders.map((order) => {
      // const order = JSON.parse(orderJSON);
      const lineItems = order.lineItems.map((lineItem: any) => ({
        title: lineItem.title,
        quantity: lineItem.quantity,
        variant: {
          price: lineItem.variant.price,
          product: {
            handle: lineItem.variant.product.handle,
          },
          inventoryItem: {
            unitCost: lineItem.variant.inventoryItem.unitCost,
          },
        },
      }));

      const productCost = lineItems.reduce(
        (acc: number, item: any) =>
          acc + Number(item.variant.inventoryItem.unitCost.amount),
        0
      );

      const revenue = Number(order.totalPriceSet.shopMoney.amount);
      const shippingPrice = Number(
        order.totalShippingPriceSet.shopMoney.amount
      );

      const profit =
        Math.round((revenue - shippingPrice - productCost) * 100) / 100;

      return {
        id: order.id,
        name: order.name,
        email: order.email,
        customer: {
          firstName: order.customer.firstName,
          lastName: order.customer.lastName,
        },
        totalPriceSet: order.totalPriceSet,
        totalShippingPriceSet: order.totalShippingPriceSet,
        createdAt: order.createdAt,
        lineItems,
        revenue,
        profit,
        shippingPrice,
        order: order, // If you need the original order data
      };
    });
    // Sort the salesData array by createdAt in ascending order (oldest to newest)
    salesData.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
}
