import { default as fetch } from "node-fetch";

export const postToShopify = async ({ query, variables }) => {
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

    if (result.errors) {
      console.log({ errors: result.errors });
      return result.errors;
    } else if (!result || !result.data) {
      console.log({ result });
      return "No results found.";
    }

    return result.data;
  } catch (error) {
    console.log("errorShop", error);
  }
};
