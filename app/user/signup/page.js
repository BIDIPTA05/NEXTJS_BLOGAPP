"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`, // Use window.location.origin
      },
    });

    router.refresh();
  };

  return (
    <div className="flex ">
      <div className="relative">
        <button
          className="flex text-xl absolute left-20 top-14"
          onClick={() => router.push("/")}
        >
          {" "}
          Home{" "}
        </button>{" "}
        <img
          src="https://img.freepik.com/free-vector/freelancer-working-laptop-her-house_1150-35048.jpg?w=1060&t=st=1704652021~exp=1704652621~hmac=e39a6ea58cbd67b17701367975ee60ee9fccba0d1eaf8b3a6264dce34ebf16e3"
          alt="Loading..."
          className="h-screen"
        />
      </div>{" "}
      <div className="mt-14 w-1/2 mx-10">
        <div className="flex items-center justify-end space-x-5">
          <p> Have an Account ? </p>{" "}
          <button
            className="bg-blue-600 p-2 rounded-lg text-white"
            onClick={() => router.push("/user/login")}
          >
            {" "}
            Log in{" "}
          </button>{" "}
        </div>{" "}
        <div className="ml-16">
          <p className="text-5xl font-light my-16">
            {" "}
            Create your free account{" "}
          </p>{" "}
          <p className="py-3"> Full name </p>{" "}
          <input
            type="text"
            className="shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Name here"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />{" "}
          <p className="py-3"> Email </p>{" "}
          <input
            type="email"
            className="shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Email here"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <p className="py-3"> Password </p>{" "}
          <input
            type="password"
            className="shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="******************"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <button
            className="bg-blue-700 w-4/6 p-3 my-3 text-white rounded-md "
            onClick={handleSignUp}
          >
            <p> Create your account </p>{" "}
          </button>{" "}
          <div>
            <p className="text-red-500"> {error} </p>{" "}
          </div>{" "}
          <div className="flex justify-center w-4/6 font-normal text-md">
            <p> OR </p>{" "}
          </div>{" "}
          <button className="flex items-center justify-center shadow border w-4/6 p-3 my-3 rounded-md space-x-2">
            <FcGoogle className="text-2xl" />
            <p> Sign up with Google </p>{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
