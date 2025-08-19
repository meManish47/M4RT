"use server";
import { verifyToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { Roletype, User } from "../../generated/prisma";

export async function getUserFromCookies() {
  try {
    const userCookies = await cookies();
    const token = userCookies.get("token")?.value;
    if (!token) return null;
    const data = verifyToken(token);
    if (!data) return null;

    const user = await prismaClient.user.findUnique({
      where: {
        id: data,
      },
    });
    if (!user) return null;
    return user;
  } catch (err) {
    return null;
  }
}
export async function deleteCookies() {
  const userCookies = await cookies();
  userCookies.delete("token");
}

export async function createUserInDb(data: {
  name: string;
  email: string;
  password: string;
  username: string;
  avatar: string | null;
  role: Roletype;
}) {
  try {
    const existing = await prismaClient.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      return {
        success: true,
        user: existing,
      };
    }
    const user = await prismaClient.user.create({
      data,
    });
    if (user) {
      return {
        success: true,
        user,
      };
    } else {
      return { success: false, message: "User not created!" };
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}
