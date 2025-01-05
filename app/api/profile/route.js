import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "../../../lib/mongodb";
import { UserModel } from "../../../models/User";

export async function GET(req) {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await UserModel.findById(token.sub);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}