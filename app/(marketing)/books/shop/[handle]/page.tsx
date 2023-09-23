import React, { useEffect } from "react";
import { siteConfig } from "@/config/site";
import Product from "./product";
interface Props {
  products: any;
  data: any;
}
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: `${siteConfig.title} - The new era of books`,
  description: siteConfig.description,
});

const getData = async (handle: string): Promise<any> => {
  const prodDataRes = await fetch(
    `${siteConfig.url}/api/productData?handle=${handle}`,
    {
      cache: "no-cache",
    }
  );

  const productDataRes: ProductInfo = await prodDataRes.json();
  const productData = productDataRes.productByHandle;
  const product = {
    id: productData.id,
    title: productData.title,
    description: productData.descriptionHtml,
    collection: productData.collections.edges[0].node.title,
    quantityAvailable: productData.totalInventory,
    images: productData.images.edges,
    imageSrc: productData.images.edges[0].node.src,
    imageAlt: productData.title,
    price: productData.variants.edges[0].node.priceV2,
    compareAtPrice: productData.variants.edges[0].node.compareAtPriceV2,
    variants: productData.variants,
  };

  return {
    product,
  };
};

export default async function ProductPage({ params }: any) {
  const data = await getData(params.handle);

  return (
    <div className="min-h-screen  flex flex-col justify-between ">
      <Product productData={data} />
    </div>
  );
}

type ProductInfo = {
  productByHandle: {
    title: string;
    id: string;
    handle: string;
    descriptionHtml: string;
    collections: {
      edges: {
        node: {
          title: string;
        };
      }[];
    };
    totalInventory: number;
    ratingAverage: number | null;
    ratingCount: number | null;
    productReviews: any | null; // You can replace 'any' with a more specific type
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
};
