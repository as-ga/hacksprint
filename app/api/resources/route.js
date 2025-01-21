import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { ResourceModel } from "@/models/Resource";

export async function GET(req) {
  await dbConnect();

  try {
    const resources = await ResourceModel.find({});
    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { name, description, link } = await req.json();
  await dbConnect();

  try {
    const resources = await ResourceModel.create({
      name,
      description,
      link,
    });
    return NextResponse.json(
      { seccess: false, message: "Resources added successfully", resources },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
