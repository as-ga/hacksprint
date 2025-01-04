import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      required: [true, "Please enter your password!"],
    },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  { timestamps: true }
);
export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
