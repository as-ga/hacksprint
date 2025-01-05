import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "../../../../lib/mongodb";
import { QuizModel } from "../../../../models/Quiz";
import { PerformanceModel } from "../../../../models/Performance";

export async function POST(req) {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.error("Token not found or invalid");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { quizId, answers } = await req.json();
  const userId = token.sub;

  try {
    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    const performance = new PerformanceModel({
      userId,
      quizId,
      score,
    });

    await performance.save();

    return NextResponse.json({ score }, { status: 201 });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}