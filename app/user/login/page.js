"use client";
import { React, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
//import { redirect } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogin = async () => {
    if (password.length < 3) {
      setError("Incorect Passowrd");
      return;
    }
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      router.push("/");
    }
    console.log(data);
    setError(null);
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
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
          alt="Loading..."
          className="h-screen"
        />
      </div>{" "}
      <div className="mt-14 w-1/2 mx-8">
        <div className="flex items-center justify-end space-x-5">
          <p> Don 't have an Account ? </p>{" "}
          <button
            className="bg-blue-600 p-2 rounded-lg text-white"
            onClick={() => router.push("/user/signup")}
          >
            {" "}
            Sign up here{" "}
          </button>{" "}
        </div>{" "}
        <div className="ml-16">
          <p className="text-5xl font-light my-16"> Sign in your account </p>{" "}
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
            onClick={handleLogin}
          >
            <p> Sign in </p>{" "}
          </button>{" "}
          <div>
            <p className="text-red-500"> {error} </p>{" "}
          </div>{" "}
          <div className="flex justify-center w-4/6 font-normal text-md">
            <p> OR </p>{" "}
          </div>{" "}
          <button className="flex items-center justify-center shadow border w-4/6 p-3 my-3 rounded-md space-x-2">
            <FcGoogle className="text-2xl" />
            <p> Sign in with Google </p>{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
