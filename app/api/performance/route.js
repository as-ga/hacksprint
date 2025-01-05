import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "../../../lib/mongodb";
import { QuizModel } from "../../../models/Quiz";
import { PerformanceModel } from "../../../models/Performance";

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    const performances = await PerformanceModel.find({ userId }).populate('quizId');
    return NextResponse.json(performances, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}