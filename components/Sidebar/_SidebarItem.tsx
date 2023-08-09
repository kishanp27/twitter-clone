'use client'

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean
}

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth
}) => {

  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const router = useRouter()


  const handleClick = useCallback(() => {
    if(auth && !currentUser) {
      loginModal.onOpen();
      return;
    }

    if(!href) return;
    if(onClick) return onClick();
    router.push(href)
  }, [router, href, loginModal, auth])

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className="relative rounded-full hidden lg:flex items-center justify-center p-4 hover:bg-slate-100 hover:bg-opacity-10 cursor-pointer gap-4">
        <Icon size={28} color="white" />
        <p className='hidden lg:block text-white text-xl'>
            {label}
        </p>
      </div>
    </div>
  );
};

export default SidebarItem;
