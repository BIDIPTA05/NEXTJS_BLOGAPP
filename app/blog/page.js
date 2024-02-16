"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Navbar from "../components/navbar";

export default function Page() {
  const supabase = createClientComponentClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleBlogSubmit = async () => {
    try {
      // Make a request to insert a new blog post into the "blogs" table
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { id } = user;

      const { data, error } = await supabase.from("blogs").insert([
        {
          userId: id,
          titleOfTheBlog: title,
          contentOfTheBlog: content,
        },
      ]);

      if (error) {
        throw error;
      }

      console.log("Blog post inserted successfully:", data);

      // Optionally, you can reset the form fields or perform other actions after successful submission
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error inserting blog post:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="my-10">
          <p className="text-5xl"> Create your own Blog here </p>{" "}
        </div>{" "}
        <div>
          <div className="my-10">
            <p className="text-2xl mb-5"> Title of the Blog: </p>{" "}
            <input
              type="text"
              className="shadow border-2 rounded-lg p-2 w-96"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
          </div>{" "}
          <div className="my-10">
            <p className="text-2xl mb-5"> Blog: </p>{" "}
            <textarea
              className="shadow border-2 rounded-lg p-2 w-96"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>{" "}
          </div>{" "}
          <div>
            <button
              className="p-2 bg-black rounded-xl text-white w-96"
              onClick={handleBlogSubmit}
            >
              Submit{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
