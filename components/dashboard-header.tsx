"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfileQuery } from "@/redux/feature/userSlice";

import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname(); 
  const {data}  = useUserProfileQuery(undefined);

  if (pathname === "/auth/login" || pathname === "/auth/forgot-password" || pathname === "/auth/verfiy_email" || pathname === "/auth/reset-password") {
    return null; 
  }

  const IMAGE = process.env.NEXT_PUBLIC_API_URL

  return (
    <header className="border-b bg-white px-6 py-4 fixed w-full ">
      <div className="flex items-center justify-between w-full  ">
        <div>
          <p className="text-sm text-gray-600">Welcome</p>
          <h1 className="text-xl font-semibold">{data?.data?.name}</h1>
        </div>
        <div >
          <Avatar>
            <AvatarImage src={IMAGE + data?.data?.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

      </div>
    </header>
  );
}
