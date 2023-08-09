'use client'
import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePost = (postId?: string) => {
  const url =  `/api/post/${postId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;