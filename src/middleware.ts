import { NextResponse, type NextRequest } from "next/server";

// Members-only pages: send visitors without a session to the login page.
// (Each page also re-checks the session properly on the server.)
export function middleware(req: NextRequest) {
  if (req.cookies.get("csp_session")) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*", "/matches/:path*", "/search"],
};
