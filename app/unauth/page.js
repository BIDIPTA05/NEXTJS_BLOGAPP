import React from "react";
import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Unath() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center">
      <div
        className="text-bold text-2xl
        "
      >
        {" "}
        You are not authenticated to view Todos, Login to view Todos{" "}
      </div>{" "}
    </div>
  );
}
