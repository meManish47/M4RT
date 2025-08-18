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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { gqlClient } from "@/services/graphql";
import { gql } from "graphql-request";
import { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { User } from "../../../../generated/prisma";
import { toast } from "sonner";

const UPDATE_USER = gql`
  mutation UpdateUserProfile(
    $userId: String!
    $name: String!
    $email: String!
    $username: String!
    $role: String
  ) {
    updateUserProfile(
      userId: $userId
      name: $name
      email: $email
      username: $username
      role: $role
    ) {
      name
      email
      username
      avatar
      role
    }
  }
`;

export default function UserUpdateButton({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState("staff");
  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: { updateUserProfile: User } = await gqlClient.request(
      UPDATE_USER,
      {
        userId: user.id,
        name,
        email,
        username,
        role,
      }
    );
    if (data.updateUserProfile) {
      toast.success("User Updated");
      window.location.reload();
    } else {
      toast.error("Failed");
    }
    console.log({ name, username, email, role });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-6 w-max cursor-pointer" variant="ghost">
          <LiaUserEditSolid size={20} className="cursor-pointer" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Update user details here. Click <b>Update</b> when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleClick} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="username123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label>Role</Label>
            <RadioGroup value={role} onValueChange={(value) => setRole(value)}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="staff" id="staff" />
                <Label htmlFor="staff">Staff</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="manager" id="manager" />
                <Label htmlFor="manager">Manager</Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="outline" className="cursor-pointer">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
