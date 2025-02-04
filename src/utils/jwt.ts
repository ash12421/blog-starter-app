import { createSecretKey } from "crypto";
import { jwtVerify, SignJWT } from "jose";

const secretKey = createSecretKey(process.env.NEXT_PUBLIC_SECRET_KEY!, "utf-8")
export async function signJWT<T>(data: T) {
    const token = await new SignJWT({
        data
    }) // details to  encode in the token
        .setProtectedHeader({
            alg: 'HS256'
        }) // algorithm
        .setIssuedAt()
        .setExpirationTime("1 day") // token expiration time, e.g., "1 day"
        .sign(secretKey); // secretKey generated from previous step
    return token;
}

export async function verifyJWT(token: string) {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
}