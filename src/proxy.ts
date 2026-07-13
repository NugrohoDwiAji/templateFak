import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const sessionToken =
      request.cookies.get("authjs.session-token")?.value ??
      request.cookies.get("__Secure-authjs.session-token")?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
