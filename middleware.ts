import { NextResponse } from "next/server";
import { getCurrentUser } from "./service/authService";

export async function middleware(request: Request) {
  
  const token = await getCurrentUser();

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/users","/report","/notifications", "/settings"],
};
