import Image from "next/image";
import { Product } from "../../../generated/prisma";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card w-86 h-100 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden dark:shadow-[0px_0px_10px_rgb(255,255,255,0.2)] bg-transparent">
      <Link href={`/product/${product.id}`} className="block h-[60%]">
        <figure className="relative w-full h-full hover:scale-105 transition-transform duration-200">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </figure>
      </Link>

      <div className="p-4 h-[40%] flex flex-col justify-between  ">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
            {product.category}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </div>
  );
}
