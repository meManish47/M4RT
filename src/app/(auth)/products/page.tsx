import { ImageSliderComponent } from "@/components/ui/image-auto-slider";
import { gqlClient } from "@/services/graphql";
import { Product } from "../../../../generated/prisma";
import ProductCard from "@/components/productComp/productCard";
export const dynamic = "force-dynamic";
export default async function ProductPage() {
  const data: { getAllProducts: Product[] } =
    await gqlClient.request(`query GetAllProducts {
  getAllProducts {
    imageUrl title description id category price stock 
  }
}`);
  const products = data.getAllProducts;
  return (
    <main className="w-screen h-full flex  mb-20 lg:mb-2  ">
      <div className="w-full h-full flex flex-wrap bg-emerald lg:px-40 py-4 lg:gap-12 gap-4 justify-center">
        <ImageSliderComponent />
        {products.map((product) => {
          return (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
