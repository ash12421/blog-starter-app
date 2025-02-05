"use server"
import { cookies } from "next/headers"
import getDb from "@/utils/neon"
import { signJWT } from "@/utils/jwt"
import { permanentRedirect } from "next/navigation"

export default async function LoginModal() {
  async function handleSubmit(formData: FormData) {
    "use server"
    const db = getDb()

    const username = formData.get("username")
    const password = formData.get("password")

    const cookieStore = await cookies()

    if (!username || !password) return

    const query = "SELECT * from users WHERE username='" + username + "' AND password='" + password + "';"
    const result = await db(query)

    if (!result[0]) return

    const token = await signJWT("admin")
    cookieStore.set("session", token)
    permanentRedirect("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="dark:bg-slate-900 dark:text-slate-400 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" action={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

