import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse, type NextRequest } from 'next/server'
import bcrypt from 'bcrypt';
import prisma from "@/libs/prismadb";
// import { NextResponse  } from 'next/server'


export async function POST(req: NextRequest){

    let res = NextResponse;

    if(req.method !== 'POST') {
        return res.json({}, {status: 500});
    }

    try{
        const {email, username, name, password} = await req.json();

        // console.log(username, name, email, password)
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                username, 
                name, 
                hashedPassword
            }
        })

        return res.json(user);

    }catch(e){
        console.log(e);
        return new Response('',{
            status: 400
        })
    }
}