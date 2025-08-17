import { gqlClient } from "@/services/graphql";
import { gql } from "graphql-request";
import { Product } from "../../../../../generated/prisma";
import Image from "next/image";
import ProductDetailsCard from "@/components/productComp/productDetail";
import ProductSaleChart, { ProductWithSales } from "@/components/example-chart";

const GET_PRODUCT_BYID = gql`
  query GetProductById($id: String!) {
    getProductById(id: $id) {
      title
      description
      category
      id
      imageUrl
      price
      stock
      sales {
        createdAt
        id
        quantity
        productId
      }
    }
  }
`;
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: { getProductById: ProductWithSales } = await gqlClient.request(
    GET_PRODUCT_BYID,
    {
      id,
    }
  );
  const product = data.getProductById;
  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-8">
      <ProductDetailsCard product={product} />
      <div className="h-100 w-100">
        <ProductSaleChart product={product}/>
      </div>
    </div>
  );
}
