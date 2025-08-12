import { ImageSliderComponent } from "@/components/ui/image-auto-slider";
import { gqlClient } from "@/services/graphql";
import { Product } from "../../../../generated/prisma";
import ProductCard from "@/components/productComp/productCard";

export default async function ProductPage() {
  const data: { getAllProducts: Product[] } =
    await gqlClient.request(`query GetAllProducts {
  getAllProducts {
    imageUrl title description id category price stock 
  }
}`);
  const products = data.getAllProducts;
  return (
    <main className="w-screen h-screen flex     ">
      <div className="w-full h-full flex flex-wrap bg-emerald px-40 py-4 gap-12">
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
