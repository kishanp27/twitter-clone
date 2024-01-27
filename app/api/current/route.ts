import serverAuth from "@/libs/serverAuth";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse} from 'next/server'

export async function GET(){

    let res = NextResponse;

    try {
        const currentUser = await serverAuth();
        return res.json(currentUser, { status: 200 });
    } catch (error) {
        console.log(error);
        return res.json({error: "no current user"}, { status: 400 });
    }
}