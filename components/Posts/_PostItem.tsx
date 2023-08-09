"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import Avatar from "../Avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineMessage, AiOutlineHeart, AiFillLike, AiFillHeart } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const gotToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const { hasLiked, toggleLike } = useLike({
    postId: data.id, userId
  })


  const goToPost = useCallback(() => {
    router.push(`/post/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      if(!currentUser){
        loginModal.onOpen()
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={gotToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span
              onClick={gotToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition">
              <AiOutlineMessage size={20} className="transition hover:text-neutral-200"/>
              <p>{data.coments?.length || 0}</p>
            </div>
            <div onClick={onLike} className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition ">
              <LikeIcon size={20} className='transition hover:text-red-500' color={hasLiked ? 'red' : ''}/>
              <p>{data.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
