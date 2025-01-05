import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import { MessageModel } from "../../../models/Forum";

export async function GET(req) {
  await dbConnect();

  try {
    const messages = await MessageModel.find({});
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  const { text, userId } = await req.json();

  try {
    const message = new MessageModel({ text, userId });
    await message.save();
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}