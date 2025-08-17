"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { gqlClient } from "@/services/graphql";
import { Label } from "@radix-ui/react-label";
import { gql } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LOGIN_USER = gql`
  query Query($userCred: String!, $password: String!) {
    loginUser(userCred: $userCred, password: $password)
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!email || !password) {
      toast.error("Email and password can't be empty");
      return;
    }
    setLoading(true);
    const data: { loginUser: boolean } = await gqlClient.request(LOGIN_USER, {
      userCred: email,
      password,
    });
    if (data.loginUser) {
      toast.success("Successfully logged in!");
      window.location.href = "/admin";
    } else toast.error("Can't login");
    setLoading(false);
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="flex w-[95%] h-[65%] gap-1 max-w-4xl mx-auto flex-col md:flex-row md:w-[90%] md:h-auto shadow-[1px_1px_50px_rgb(0,0,0,0.3)] bg-black">
        <div className="w-1/2 h-full overflow-hidden relative hidden  md:block">
          <Image
            src={"/login_image.jpg"}
            alt="Image"
            className="object-cover min-h-[412px]"
            height={1500}
            width={1500}
            objectFit="cover"
          />
          <div className="absolute inset-0 h-full w-full bg-black/40"></div>
        </div>

        <Card className="w-full md:w-1/2 md:h-103 h-full rounded-xs flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold mb-2">
              Login as Admin
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="rounded-xs font-mono tracking-wider text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-bars loading-xs"></span>
              ) : (
                "Login"
              )}
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
