import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";


config();


export default function getDb() {
    return neon(process.env.DATABASE_URL!)
}