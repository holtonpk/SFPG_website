import React, { useEffect } from "react";
import { siteConfig } from "@/config/site";
import Product from "./product";
interface Props {
  products: any;
  data: any;
}

const getData = async (id: string): Promise<any> => {
  const res = await fetch(`${siteConfig.url}/api/products`, {
    cache: "no-cache",
  });

  const record = await res.json();

  const prodDataRes = await fetch(`${siteConfig.url}/api/products`, {
    cache: "no-cache",
  });
  const productData: ProductsData = await prodDataRes.json();

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
  };
  console.log("product", product);

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

type Product = {
  id: string;
  handle: string;
  descriptionHtml: string;
  title: string;
  totalInventory: number;
  ratingAverage: number | null;
  ratingCount: number | null;
  productReviews: any[] | null; // You can replace 'any' with the actual type of product reviews if available
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        quantityAvailable: number;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        compareAtPriceV2: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
  priceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        src: string;
        altText: string | null;
      };
    }[];
  };
};

type ProductEdge = {
  node: Product;
};

type ProductsData = {
  products: {
    edges: ProductEdge[];
  };
};
