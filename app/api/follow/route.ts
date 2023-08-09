import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const { userId } = await req.json();
        const currentUser = await serverAuth();

        if(!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            throw new Error('Invalid ID');
        }

        let updatedFollowingIds = [...(currentUser.followingIds || [])];

        let updatedFollowersIds = [...(user.followersIds || [])];

        updatedFollowingIds.push(userId);

        updatedFollowersIds.push(currentUser?.id);
        
        const updatedCurrentUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })

        const updatedUser = await prisma.user.update({
            where:{
                id: userId
            },
            data: {
                followersIds: updatedFollowersIds
            }
        })
        return NextResponse.json({updatedCurrentUser}, {status: 200});
        
        
    }catch(error) {
        console.log(error);
        return NextResponse.json({}, { status: 400 })
    }
}

export async function DELETE(req: Request) {
    try{
        const data = await req.json();
        const { userId } = data;

        
        const currentUser = await serverAuth();

        if(!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) {
            throw new Error('Invalid ID');
        }

        let updatedFollowingIds = [...(currentUser.followingIds || [])];
        let updatedFollowersIds = [...(user.followersIds || [])];

        updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId);

        updatedFollowersIds = updatedFollowersIds.filter(followerId => followerId !== currentUser?.id);
        
        const updatedCurrentUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })

        const updatedUser = await prisma.user.update({
            where:{
                id: userId
            },
            data: {
                followersIds: updatedFollowersIds
            }
        })

        return NextResponse.json({updatedCurrentUser}, {status: 200});
        
        
    }catch(error) {
        console.log(error);
        return NextResponse.json({}, { status: 400 })
    }
}