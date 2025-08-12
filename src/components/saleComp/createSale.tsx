"use client";
import { gql } from "graphql-request";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
const CREATE_SALE = gql`
  mutation Mutation($id: String!, $quantity: Int) {
    createSale(id: $id, quantity: $quantity)
  }
`;
export default function CreateSaleButton({ id }: { id: string }) {
  
    const [quantity, setQuantity] = useState<number>();
  async function handleSubmit() {}
  return (
    <div>
      <Input
        type="number"
        placeholder="Enter quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <Button onClick={handleSubmit}>Create Sale</Button>
    </div>
  );
}
