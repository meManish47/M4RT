import { getUserFromCookies } from "@/helper/helper";
import { createTokenWithId } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { Roletype } from "../../../../../generated/prisma";

export async function LoginUser(
  _: any,
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
    if (user.password == args.password) {
      const token = createTokenWithId({ id: user.id });
      userCookies.set("token", token);
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
}

export async function createUser(
  _: any,
  args: {
    name: string;
    username: string;
    email: string;
    password: string;
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
  _: any,
  args: {
    userId: string;
    role: Roletype;
  }
) {
  try {
    const currentUser = await getUserFromCookies();
    if (currentUser?.role !== "admin") return null;
    const updatedUser = await prismaClient.user.update({
      where: {
        id: args.userId,
      },
      data: {
        role: args.role,
      },
    });
    return updatedUser;
  } catch (error) {
    return null;
  }
}
export async function updateUserProfile(
  _: any,
  args: {
    name: string;
    email: string;
    avatar: string;
    username: string;
    userId: string;
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
    };
    const updatedUser = await prismaClient.user.update({
      where: { id: args.userId },
      data: dataToSave,
    });
    if (!updatedUser) return null;
    return updatedUser;
  } catch (error) {
    return null;
  }
}
