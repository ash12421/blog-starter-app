"use server"
import { cookies } from "next/headers"
import getDb from "@/utils/neon";
import { signJWT } from "@/utils/jwt";
import { permanentRedirect } from "next/navigation";

export default async function LoginModal() {

  
  async function handleSubmit(formData: FormData) {
    "use server"
    const db = getDb();
    
    const username = formData.get('username')
    const password = formData.get('password')
    
    const cookieStore = await cookies();
    
    if (!username || !password) return
    
    const query = "SELECT * from users WHERE username='" + username + "' AND password='" + password + "';";
    const result = await db(query);
    
    if (!result[0]) return
    
    const token = await signJWT("admin");
    cookieStore.set("session", token); 
    permanentRedirect("/")
  }

  return (
    <div className="">
      <form className="flex align-middle flex-col p-8 w-min" action={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" className="w-min bg-black border-2 border-[#ffffff]" />
        <label htmlFor="password" className="w-min bg-black">Password</label>
        <input type="password" name="password" id="" className="w-min bg-black border-2 border-[#ffffff]" />
        <button type="submit" className="bg-black rounded-md" >Submit</button>
      </form>
    </div>
  )

}


