import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/mongodb';

export async function POST(req) {
  await dbConnect();

  try {
    const { message, conversation } = await req.json();

    // Dummy response for the AI Assistant
    const responseMessage = "This is a dummy response from the AI Assistant.";

    return NextResponse.json({
      success: true,
      dummyMessage: responseMessage,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}