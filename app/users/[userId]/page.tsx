'use client'
 
import { useRouter, useParams } from 'next/navigation'
import React from 'react';
import Header from '@/components/Header';
import useUser from '@/hooks/useUser';
import { ClipLoader } from 'react-spinners';
import UserHero from '@/components/UserProfileComponents/UserHero';
import UserBio from '@/components/UserProfileComponents/UserBio';
import PostFeed from '@/components/Posts/PostFeed';


const page = () => {
    const router = useRouter();
    const { userId } = useParams();

    const { data: user, isLoading } = useUser(userId as string);

    if(isLoading || !user){
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

  return (
    <>
        <Header showBackArrow label={user?.username} />
        <UserHero userId={userId as string} />
        <UserBio userId={userId as string} />
        <PostFeed userId={userId as string} />
    </>
  )
}

export default page;