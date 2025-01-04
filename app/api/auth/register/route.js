import { dbConnect } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { UserModel } from "@/models/User";

export async function POST(req) {
  await dbConnect();
  const { name, email, password } = await req.json();
  try {
    if (!name || !email || !password) {
      return Response.json(
        { seccess: false, message: "All fields are Requird" },
        { status: 402 }
      );
    }

    const existUser = await UserModel.findOne({ email });
    if (existUser)
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 403 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    if (!newUser)
      return Response.json(
        { seccess: false, message: "sumthing went worng" },
        { status: 500 }
      );

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Failed to register user because ${error.message}`,
      },
      { status: 501 }
    );
  }
}
