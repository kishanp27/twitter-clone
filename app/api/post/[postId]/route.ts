import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest, {params}: {
    params: { postId: string}
}){
    try{
        const { postId } = params;

        if(!postId || typeof postId !== 'string'){
            return new Error('Invalid Id')
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        // console.log(post);

        return NextResponse.json(post, { status: 200 })

    } catch(error) {
        console.log(error);
        return NextResponse.json({error: error}, {status: 400})
    }
}