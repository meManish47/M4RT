import prismaClient from "@/services/prisma";

export async function createSale(
  _: any,
  args: {
    id: string;
    quantity: number;
  }
) {
  try {
    const sale = await prismaClient.sale.create({
      data: {
        productId: args.id,
        quantity: args.quantity,
      },
    });
    if (sale) return true;
    else return false;
  } catch (error) {
    return false;
  }
}
