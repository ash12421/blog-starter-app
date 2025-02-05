import { NextRequest, NextResponse } from "next/server";
import getDb from "@/utils/neon";
export async function POST(req: NextRequest) {
    const db = getDb();
    const body = await req.json();
    const { username, password } = body;
    const query = await db`INSERT INTO users (username, password) VALUES (${username},${password})`
    return NextResponse.json(
        {
            data: query
        },
        {
            status: 200
        }
    )
}