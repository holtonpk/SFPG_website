import React, { useEffect } from "react";
import { siteConfig } from "@/config/site";
import Product from "./prodcut";
interface Props {
  products: any;
  data: any;
}

export async function getProductData() {
  const url = new URL("http://localhost:3000");
  url.pathname = "/api/products";

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error(res);
    return { props: {} };
  }

  const data = await res.json();

  console.log("data ===>", data);

  const product = data.products.edges.map(({ node }: any) => {
    if (node.totalInventory <= 0) {
      return false;
    }

    return {
      id: node.id,
      title: node.title,
      description: node.descriptionHtml,
      quantityAvailable: node.totalInventory,
      images: node.images.edges,
      imageSrc: node.images.edges[0].node.src,
      imageAlt: node.title,
      price: node.variants.edges[0].node.priceV2,
      compareAtPrice: node.variants.edges[0].node.compareAtPriceV2,
      variants: node.variants,
      reviews: {
        ratingAverage: node.ratingAverage.value || 0,
        ratingCount: node.ratingCount.value || 0,
        productReviews: node.productReviews,
      },
    };
  });

  return {
    props: {
      products: product,
    },
  };
}

const getData = async (id: string): Promise<any> => {
  const res = await fetch(`${siteConfig.url}/api/products`, {
    cache: "no-cache",
  });

  const record = await res.json();

  const prodDataRes = await fetch(`${siteConfig.url}/api/products`, {
    cache: "no-cache",
  });
  const productData: any[] = await prodDataRes.json();

  // const accountPromises = record.accounts.map((account: string) =>
  //   fetch(`${siteConfig.url}/api/view-account/${account}`, {
  //     cache: "no-cache",
  //   }).then((res) => res.json())
  // );

  // const accountData: AccountDataType[] = await Promise.all(accountPromises);\

  const node = productData.products.edges[0].node;

  const product = {
    id: node.id,
    title: node.title,
    description: node.descriptionHtml,
    quantityAvailable: node.totalInventory,
    images: node.images.edges,
    imageSrc: node.images.edges[0].node.src,
    imageAlt: node.title,
    price: node.variants.edges[0].node.priceV2,
    compareAtPrice: node.variants.edges[0].node.compareAtPriceV2,
    variants: node.variants,
    reviews: {
      ratingAverage: node.ratingAverage?.value || 0,
      ratingCount: node.ratingCount?.value || 0,
      productReviews: node.productReviews,
    },
  };

  return {
    product,
  };
};

export default async function ProductPage({ params }: any) {
  const data = await getData(params.id);

  console.log("data ===>", data);

  return (
    <div className="min-h-screen  flex flex-col justify-between ">
      <Product productData={data} />
    </div>
  );
}

interface Props {
  products: any;
}
