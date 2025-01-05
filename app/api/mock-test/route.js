import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import { QuizModel } from "../../../models/Quiz";

export async function POST(req) {
  await dbConnect();
  const { topic, questions } = await req.json();

  try {
    const newQuiz = new QuizModel({ topic, questions });
    await newQuiz.save();
    return NextResponse.json(newQuiz, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();
  const url = new URL(req.url);
  const topic = url.searchParams.get('topic');

  try {
    const quizzes = await QuizModel.find(topic ? { topic } : {});
    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}