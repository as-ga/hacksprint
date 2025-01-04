import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import { UserModel } from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },

        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          await dbConnect();
          const user = await UserModel.findOne({ email: credentials?.email });

          if (!user) throw new Error("No user found with this email");

          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error) {
          throw new Error(error?.message || "Sumthing Went Wrong");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.name = user?.name;
        token.email = user.email;
        token.role = user?.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.name = token?.name;
      session.user.email = token.email;
      session.user.role = token?.role;

      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXT_SECRET,
};
