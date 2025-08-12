import { gqlClient } from "@/services/graphql";
import { gql } from "graphql-request";
import { Product } from "../../../../../generated/prisma";
import Image from "next/image";

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
    }
  }
`;
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: { getProductById: Product } = await gqlClient.request(
    GET_PRODUCT_BYID,
    {
      id,
    }
  );
  const product = data.getProductById;
  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-8">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 shadow-md rounded-lg overflow-hidden dark:shadow-[0px_0px_10px_rgb(255,255,255,0.2)] bg-transparent">
        <div className="relative w-full h-96">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                {product.category}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-semibold text-primary">
                ${product.price}
              </span>
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              className="btn btn-primary flex-1"
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
            <button className="btn btn-outline flex-1">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
