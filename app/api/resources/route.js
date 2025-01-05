import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import { ResourceModel } from "../../../models/Resource";

export async function GET(req) {
  await dbConnect();

  try {
    const resources = await ResourceModel.find({});
    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}