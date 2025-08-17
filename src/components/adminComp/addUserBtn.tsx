"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gqlClient } from "@/services/graphql";
import { gql } from "graphql-request";
import { useState } from "react";
import { toast } from "sonner";
import { User } from "../../../generated/prisma";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $username: String!
    $role: String!
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      username: $username
      role: $role
    ) {
      name
      email
      username
      role
      id
      avatar
    }
  }
`;
export default function AddUserButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const data: { createUser: User } = await gqlClient.request(CREATE_USER, {
      email,
      name,
      username,
      password,
      role,
    });
    const createdUser = data.createUser;
    console.log(createdUser);
    if (createdUser) toast.success("Created Successfully");
    else toast.error("Failed");
    setOpen(false);
    setLoading(false);
  }
  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="h-max py-1 ps-4">
            <span className="font-extrabold">+</span>Add user
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add user details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue=""
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                id="email"
                name="email"
                defaultValue=""
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue=""
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                defaultValue=""
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
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
