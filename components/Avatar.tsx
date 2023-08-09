"use client";

import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { useCallback } from "react";
import Image from "next/image";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: user } = useUser(userId);

  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`
        ${ hasBorder ? "border-4 border-black" : "" }
        ${ isLarge ? "h-32 w-32" : "h-12 w-12" } 
        rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="avatar"
        onClick={onClick}
        src={user?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
