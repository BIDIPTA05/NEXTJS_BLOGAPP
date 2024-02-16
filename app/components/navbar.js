"use client";
import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Navbar() {
  const [tagname, setTagname] = React.useState("Login/Signup");
  const [isloggedin, setIsloggedin] = React.useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      //to get signedion user , checking here
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);

      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      console.log(user);

      if (user) {
        setTagname("Logout Here");
        setIsloggedin(true);
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setTagname("Login/Signup");
    router.push("/user/login");
  };

  return (
    <div>
      <nav>
        <div className="flex justify-between my-4 mx-5">
          <img
            src="https://media.designrush.com/inspiration_images/137695/conversions/_1611238416_548_lego_logo_3_e7490534eacf-mobile.jpg"
            width="100"
            height="70"
            onClick={() => router.push("/")}
          />{" "}
          <div className="flex items-center space-x-5">
            <p>
              <Link href="/blog"> Write a Blog </Link>{" "}
            </p>{" "}
            {isloggedin ? (
              <button
                className="bg-red-500 p-2 rounded-lg text-white"
                onClick={handleLogout}
              >
                {tagname}{" "}
              </button>
            ) : (
              <button
                className="bg-blue-500 p-2 rounded-lg text-white"
                onClick={() => {
                  router.push("/user/login");
                }}
              >
                {tagname}{" "}
              </button>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </nav>{" "}
    </div>
  );
}
