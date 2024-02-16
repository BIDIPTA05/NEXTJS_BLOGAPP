"use client";
import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function AllBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);
  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        // Fetch blogs associated with the authenticated user
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { id } = user;
        console.log(id);
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .filter("userId", "eq", id);

        if (error) {
          throw error;
        }

        // Log user ID and fetched data
        console.log("User ID:", id);
        console.log("Fetched Data:", data);

        // Set the user-specific blogs in state
        setUserBlogs(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user blogs:", error.message);
      }
    };

    // Call the fetchUserBlogs function
    fetchUserBlogs();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <>
      {" "}
      {userBlogs.map((blog) => (
        <div
          className="m-5 w-3/4 h-3/4 border-black border-2 p-3 rounded-lg"
          key={blog.id}
        >
          <div className="mb-3 ">
            <p className="text-xl">
              {" "}
              <u> Title: </u>{" "}
            </p>{" "}
            <p className="text-2xl font-bold"> {blog.titleOfTheBlog} </p>{" "}
          </div>{" "}
          <div className="mb-4">
            <p className="text-xl">
              {" "}
              <u> Content of the Blog: </u>{" "}
            </p>{" "}
            <p className="text-2xl font-bold"> {blog.contentOfTheBlog} </p>{" "}
          </div>{" "}
        </div>
      ))}{" "}
    </>
  );
}
