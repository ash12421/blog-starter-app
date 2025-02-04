import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
    let cookieStore = await cookies();
    let session = cookieStore.get("session");
    if (session) {
      cookieStore.delete("session");
    }
    permanentRedirect('/');
}