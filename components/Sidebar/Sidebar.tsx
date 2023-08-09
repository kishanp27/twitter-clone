'use client'

import { FC, ReactElement } from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./_SidebarLogo";
import SidebarItem from "./_SidebarItem";
import {BiLogOut} from 'react-icons/bi'
import SidebarTweetButton from "./_SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";

import { signOut, useSession } from 'next-auth/react'

const Sidebar: FC = (): ReactElement => {
  const {data: currentUser} = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
      auth: false
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true
    },
    {
      label: "Profile",
      href: "/users/"+currentUser?.id,
      icon: FaUser,
      auth: true
    },
  ];
  return (
    <div className="col-span-1 pr-4 md:pr-6 text-white">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => {
            return <SidebarItem key={item.href} href={item.href} label={item.label} icon={item.icon} auth={item.auth}></SidebarItem>;
          })}
         {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} href='/' label="logout" />}
          <SidebarTweetButton /> 
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
