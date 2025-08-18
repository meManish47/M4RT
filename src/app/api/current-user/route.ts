import { NextResponse } from "next/server";
import { getUserFromCookies } from "@/helper/helper";

export async function GET() {
  const user = await getUserFromCookies();
  return NextResponse.json({ user });
}
