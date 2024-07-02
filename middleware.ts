import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Allow access to login page even if not authenticated
        if (path === "auth/signin") {
          return true;
        }

        // Require authentication for home and user-settings routes
        if (path === "/" || path.startsWith("/user-settings")) {
          return !!token;
        }

        // Allow access to all other routes
        return true;
      },
    },
  }
);

// Specify the paths that should be protected
export const config = {
  matcher: ["/", "/user-settings/:path*"],
};
