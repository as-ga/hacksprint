import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: [true, "Topic is required"],
    },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const QuizModel =
  mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);