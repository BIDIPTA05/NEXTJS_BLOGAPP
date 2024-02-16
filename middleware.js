import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  // Creating a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });
  // Refreshing session if expired - required for Server Components
  await supabase.auth.getSession();
  return res;
}
