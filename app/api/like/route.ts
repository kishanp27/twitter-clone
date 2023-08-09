import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {postId} = await req.json();

        const currentUser = await serverAuth();

        const post = await prisma.post.findUnique({
            where:{
                id: postId
            }
        })

        if(!post){
            throw new Error('Invalid Id');
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        updatedLikedIds.push(currentUser?.id)

        const updatedPost = await prisma.post.update({
            where:{
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }

        })

        return NextResponse.json({ updatedPost }, { status: 200 })

    } catch (error) {

    }
}

export async function DELETE(req: Request) {
    try{
        const {postId} = await req.json();

        const currentUser = await serverAuth();

        const post = await prisma.post.findUnique({
            where:{
                id: postId
            }
        })

        if(!post){
            throw new Error('Invalid Id');
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        updatedLikedIds.filter(likedId => (likedId != currentUser?.id))

        const updatedPost = await prisma.post.update({
            where:{
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }

        })

        return NextResponse.json({ updatedPost }, { status: 200 })

    } catch (error) {

    }
}