"use server";

import prismaClient from "@/services/prisma";
import { Roletype } from "../../generated/prisma";

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
