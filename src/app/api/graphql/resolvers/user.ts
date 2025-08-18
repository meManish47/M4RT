import { getUserFromCookies } from "@/helper/helper";
import { createTokenWithId } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { Roletype } from "../../../../../generated/prisma";

export async function LoginUser(
  parent: unknown,
  args: { userCred: string; password: string }
) {
  try {
    const userCookies = await cookies();
    const user = await prismaClient.user.findFirst({
      where: {
        OR: [{ email: args.userCred }, { username: args.userCred }],
      },
    });
    if (!user) return false;

    if (user.password === args.password) {
      const token = createTokenWithId({ id: user.id });
      userCookies.set("token", token);
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

export async function createUser(
  parent: unknown,
  args: {
    name: string;
    username: string;
    email: string;
    password: string;
    role: Roletype;
  }
) {
  try {
    const currUser = await getUserFromCookies();
    if (currUser?.role !== "admin") return null;

    const user = await prismaClient.user.create({
      data: args,
    });
    return user;
  } catch (error) {
    return null;
  }
}

export async function updateUserRole(
  parent: unknown,
  args: { userId: string; role: Roletype }
) {
  try {
    const currentUser = await getUserFromCookies();
    if (currentUser?.role !== "admin") return null;

    const updatedUser = await prismaClient.user.update({
      where: { id: args.userId },
      data: { role: args.role },
    });
    return updatedUser;
  } catch (error) {
    return null;
  }
}

export async function updateUserProfile(
  parent: unknown,
  args: {
    name: string;
    email: string;
    avatar: string;
    username: string;
    userId: string;
    role: Roletype;
  }
) {
  try {
    const currUser = await getUserFromCookies();
    if (args.userId !== currUser?.id && currUser?.role !== "admin") return null;

    const dataToSave = {
      name: args.name,
      username: args.username,
      email: args.email,
      avatar: args.avatar,
      role: args.role,
    };

    const updatedUser = await prismaClient.user.update({
      where: { id: args.userId },
      data: dataToSave,
    });
    return updatedUser || null;
  } catch (error) {
    return null;
  }
}

export async function getAllUsers() {
  const user = await getUserFromCookies();
  if (user?.role !== "admin") return null;
  try {
    const users = await prismaClient.user.findMany();
    return users.filter((user) => user.role !== "admin");
  } catch (error) {
    return null;
  }
}
