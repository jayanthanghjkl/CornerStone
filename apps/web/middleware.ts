import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/env";

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
    const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
    const isCheckoutPage = request.nextUrl.pathname.startsWith("/checkout");

    
    if (!user && (isAdminPage || isCheckoutPage)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    
    if (user && isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
  } catch (e) {
    console.error("Middleware Error:", e);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
