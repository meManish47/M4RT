"use client";
import { gql } from "graphql-request";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { gqlClient } from "@/services/graphql";
import { toast } from "sonner";
import { Product } from "../../../generated/prisma";
const CREATE_SALE = gql`
  mutation Mutation($id: String!, $quantity: Int) {
    createSale(id: $id, quantity: $quantity)
  }
`;
export default function CreateSaleButton({
  id,
  product,
}: {
  id: string;
  product: Product;
}) {
  const [quantity, setQuantity] = useState<number>(1);

  async function handleSubmit() {
    if (quantity > product.stock) {
      toast.error("Not enough stocks");
      return;
    }
    const data: { createSale: boolean } = await gqlClient.request(CREATE_SALE, {
      id,
      quantity,
    });
    if (data.createSale) {
      toast.success("Sale Created");
      window.location.reload();
    } else toast.success("Failed");
  }
  return (
    <div className="flex gap-2">
      <Input
        type="number"
        placeholder="Enter quantity"
        value={quantity}
        min={1}
        onChange={(e) =>
          setQuantity(Math.max(1, parseInt(e.target.value) || 1))
        }
      />
      <Button onClick={handleSubmit}>Create Sale</Button>
    </div>
  );
}
