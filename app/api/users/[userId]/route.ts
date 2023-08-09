import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function GET(request: Request, query: { params: { userId: string }}){
    try{
        // console.log(params);
        const { userId } = query.params;


        if(!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID')
        }

        const existingUser = await prisma.user.findUnique({
            where: {
               id: userId 
            }
        });

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        });

       return NextResponse.json({ ...existingUser, followersCount }, { status: 200 });
       
    } catch(error){
        console.log(error);
        return NextResponse.json({error: 'Unable to fetch the users'}, { status: 400})
    }
}