import ProductSaleChart, { ProductWithSales } from "@/components/example-chart";
import ProductDetailsCard from "@/components/productComp/productDetail";
import { gqlClient } from "@/services/graphql";
import { gql } from "graphql-request";

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
    <div className="min-h-screen flex flex-col lg:flex-row gap-4 justify-center items-start px-4 py-8 pb-20">
      <ProductDetailsCard product={product} />
      <div className="h-100 w-full lg:h-100 flex flex-col gap-2 py-4 justify-center ">
        <p className="text-xl font-semibold lg:text-3xl lg:font-bold">
          Sales Chart:
        </p>
        <ProductSaleChart product={product} />
      </div>
    </div>
  );
}
