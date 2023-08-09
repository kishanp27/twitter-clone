import React from 'react';
import CommentItem from './_CommentItem';

interface CommentFeedProps {
    comments?: Record<string, any>[]
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = []}) => {
  return (
    <>
        {comments?.map((comment) => {
            return <CommentItem key={comment.id} data={comment}/>
        })}
    </>
  )
}

export default CommentFeed