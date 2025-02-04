import Link from "next/link";
import { cookies } from "next/headers";
// import Button from "./ui/button";
// import { useRouter } from "next/router";
import { permanentRedirect } from "next/navigation";
async function Header() {
  let cookieStore = await cookies();
  let session = cookieStore.get("session");
  
  async function handleClick() {
    "use server"
    let cookieStore = await cookies();
    let session = cookieStore.get("session");
    if (session) {
      cookieStore.delete("session");
    }
    permanentRedirect('/');
  }
  return (
    <div className="w-full flex p-8 text-xl mb-20 items-center justify-between">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight flex items-center">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <div className="">

        {!session ?
          <Link href={'/login'} className="hover:underline ml-auto p-2">Login</Link>
          : <button onClick={handleClick}>Logout</button>
        }
      </div>

    </div>


  );
};

export default Header;
