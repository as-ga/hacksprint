import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_SECRET,
  });

  const url = request.nextUrl.pathname;
  if (
    token &&
    (url.startsWith("/login") ||
      url.startsWith("/signup") ||
      url.startsWith("/landing"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && url == "/") {
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: "/:path*",
};
