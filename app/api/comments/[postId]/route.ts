import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest, query:{params: {postId: string}}){
    try{
        const postId = query.params.postId;

        const comments = await prisma.comment.findMany({
            where:{
                postId: postId
            }
        })

        return NextResponse.json({ comments }, { status: 200 })

    } catch(error) {
        console.log(error);
    }
}