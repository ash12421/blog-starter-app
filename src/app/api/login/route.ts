import getDb from "@/utils/neon";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { signJWT } from "@/utils/jwt";
import { cookies } from "next/headers";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
export async function POST(req: NextRequest) {
    const body = await req.json();
    const cookieStore = await cookies();
    const { username, password } = body;
    const db = getDb();
    if (!username || !password) {
        return NextResponse.json(
            {
                message: "Missing credentials"
            },
            {
                status: 400
            }
        )
    }
    const query = "SELECT * from users WHERE username='" + username + "' AND password='" + password + "';";
    const result = await db(query);

    if (result[0]) {
        let response = NextResponse.json(
            {
                message: "Success!"
            },
            {
                status: 200
            }
        );
        const token = await signJWT("admin");
        cookieStore.set("session", token);
        return response;

    }

    else {
        return NextResponse.json(
            {
                message: "Invalid username / password"
            },
            {
                status: 400
            }
        )
    }


    // const query = await db`INSERT INTO users (username, password) VALUES (${username},${password})`
    // return NextResponse.json(
    //     {
    //         data: query
    //     },
    //     {
    //         status: 200
    //     }
    // )

}