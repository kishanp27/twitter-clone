import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import useUser from "@/hooks/useUser";

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {

  const { data: user } = useUser(data.userId as string);

  const router = useRouter();

  const goToUser = useCallback((event: any) => {
    event.stopPropagation();
    router.push('/users/'+data.userId)

  }, [router, data.useId]);

  const createdAt = useMemo(() => {
    if(!data?.createdAt){
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt))
  },[data?.createdAt])

  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.userId} />
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <p className="text-white cursor-pointer hover:underline" onClick={goToUser}>
              {user?.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block" onClick={goToUser}>
              @{user?.username}
            </span>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              {createdAt}
            </span>
          </div>
          <p className="text-white">{data.body}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
