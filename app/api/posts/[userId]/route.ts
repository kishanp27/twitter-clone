import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try{
        const currentUser = await serverAuth();
        const { body } = await req.json();

        const post = await prisma.post.create({
            data: {
                body,
                userId: currentUser?.id
            }
        })

        return NextResponse.json({ post }, { status: 200})

    }catch(error){
        console.log(error);

    }
}

export async function GET(request: Request, query: { params: { userId: string }}) {
    try{
        const { userId } = query.params;

        let posts;

        if(userId && typeof userId === 'string'){
            posts = await prisma.post.findMany({
                where: {
                    userId
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        } else {
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true,

                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        }

        return NextResponse.json({ posts }, { status: 200 })
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: 'error'}, { status: 400 })
    }
}