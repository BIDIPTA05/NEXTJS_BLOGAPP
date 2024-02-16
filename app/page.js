import Allblogs from "./blog/allblogs";
import Navbar from "./components/navbar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const supabase = createClientComponentClient();
  const { data: session } = supabase.auth.getSession();

  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-3">
        <Allblogs />
      </div>{" "}
    </main>
  );
}
