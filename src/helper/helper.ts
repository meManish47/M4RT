"use server";
import { verifyToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";

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
