'use client'

import CommentFeed from '@/components/Comments/CommentFeed';
import Form from '@/components/Form';
import Header from '@/components/Header';
import PostItem from '@/components/Posts/_PostItem';
import useComments from '@/hooks/useComments';
import usePost from '@/hooks/usePost';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ClipLoader } from 'react-spinners';

const page = () => {

    const router = useRouter();
    const { postId } = useParams();
    const { data: fetchedPost, isLoading } = usePost(postId as string);
    const { data: fetchedComments } = useComments(postId as string);

    // console.log(fetchedComments);


    if( isLoading || !fetchedPost){
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color='lightblue' size={80} />

            </div>
        )
    }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost}/>
      <Form postId={postId as string}
        isComment
        placeholder='Tweet your reply'

      />
      <CommentFeed comments={fetchedComments?.comments}/>
    </>
  )
}

export default page