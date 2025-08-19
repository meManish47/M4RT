"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { gql } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Roletype } from "../../../generated/prisma";
import { createUserInDb } from "@/helper/createUser";
export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleClick() {
    if (!name || !email || !password) {
      toast.error("Name, email, and password can't be empty");
      return;
    }
    const userToCreate: {
      name: string;
      email: string;
      password: string;
      username: string;
      avatar: string | null;
      role: Roletype;
    } = {
      name,
      email,
      username,
      password,
      avatar: null,
      role: "staff",
    };
    const res = await createUserInDb(userToCreate);

    if (res.success) {
      toast.success("Signup successful!");
      window.location.href = "/";
    } else {
      toast.error(res.message);

    }
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="flex w-[95%] h-[65%] gap-1 max-w-4xl mx-auto flex-col md:flex-row md:w-[90%] md:h-auto shadow-[1px_1px_50px_rgb(0,0,0,0.3)] bg-black">
        <div className="w-1/2 h-full overflow-hidden relative hidden md:block">
          <Image
            src={"/shirt.jpg"}
            alt="Image"
            className="object-cover h-[504px] "
            height={1500}
            width={1500}
            objectFit="cover"
          />
          <div className="absolute inset-0 h-full w-full bg-black/40"></div>
        </div>
        <Card className="w-full md:w-1/2 h-[100%] rounded-xs flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold mb-2">
              Sign Up
            </CardTitle>
            <div className="flex">
              <p className="text-xs text-muted-foreground">
                Already have an account?
              </p>
              <Link
                className="ms-1 cursor-pointer text-xs underline text-foreground"
                href={"/"}
              >
                Login
              </Link>
            </div>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    required
                    className="rounded-xs"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="rounded-xs"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Username</Label>
                  <Input
                    type="text"
                    placeholder="username"
                    required
                    className="rounded-xs"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="rounded-xs"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full cursor-pointer hover:scale-97 duration-200 transition rounded-xs"
              onClick={handleClick}
            >
              Sign Up
            </Button>

            <Button
              variant="link"
              className="mt-2 cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
