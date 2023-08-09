'use client'

import useSWR from 'swr';
import fetcher from "@/libs/fetcher";

const useComments = (postId?: string) => {
    const url = `/api/comments/${postId}`;
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useComments

