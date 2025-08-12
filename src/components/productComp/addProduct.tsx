"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { gql } from "graphql-request";
import {
  Product,
  ProductCategory,
  Roletype,
  User,
} from "../../../generated/prisma";
import { gqlClient } from "@/services/graphql";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $stock: Int!
    $imageUrl: String!
  ) {
    addProduct(
      title: $title
      description: $description
      category: $category
      price: $price
      stock: $stock
      imageUrl: $imageUrl
    ) {
      title
      description
      category
      imageUrl
      price
      stock
    }
  }
`;
export default function AddProductButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("others");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const data: { addProduct: Product } = await gqlClient.request(ADD_PRODUCT, {
      title,
      description,
      price,
      stock,
      category,
      imageUrl,
    });
    const product = data.addProduct;
    if (product) toast.success("Product added");
    else toast.error("Failed");
    setOpen(false);
    setLoading(false);
  }
  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className=" py-1 ps-10">
            <span className="font-extrabold">+</span>Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add user details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue=""
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter description of the product"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              <Label>Stock</Label>
              <Input
                type="number"
                placeholder="Enter stock quantity"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value))}
              />
            </div>

            <div className="grid gap-3">
              <Label>Image Url</Label>
              <Input
                placeholder="Enter image url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="decoration">Decoration</SelectItem>
                  <SelectItem value="others">Others..</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <span className="loading loading-bars loading-xs"></span>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
