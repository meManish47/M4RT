import prismaClient from "@/services/prisma";
import { ProductCategory } from "../../../../../generated/prisma";

export default async function addProduct(
  parent: unknown,
  args: {
    title: string;
    description: string;
    category: ProductCategory;
    imageUrl: string;
    price: number;
    stock: number;
  }
) {
  try {
    const product = await prismaClient.product.create({
      data: args,
    });
    return product;
  } catch (error) {
    return null;
  }
}
export async function getAllProducts() {
  try {
    const products = await prismaClient.product.findMany();
    return products;
  } catch (error) {
    return null;
  }
}

export async function getProductById(parent: unknown, args: { id: string }) {
  try {
    const product = await prismaClient.product.findUnique({
      where: { id: args.id },
      include: { sales: { orderBy: { createdAt: "asc" } } },
    });
    return product;
  } catch (error) {
    return null;
  }
}
