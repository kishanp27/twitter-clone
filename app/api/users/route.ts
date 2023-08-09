import { NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';

export async function GET(){
    try{
        const users = await prisma.user.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc'
            }, 
        })

       return NextResponse.json({ users }, { status: 200 });
       
    } catch(error){
        console.log(error);
        return NextResponse.json({error: 'Unable to fetch the users'}, { status: 400})
    }
}