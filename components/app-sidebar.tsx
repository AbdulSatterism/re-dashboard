"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logout } from "@/service/authService";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },

  {
    title: "All Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Reports",
    url: "/report",
    icon: MessageSquare,
  },
  {
    title: "Notification",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  if (
    pathname === "/auth/login" ||
    pathname === "/auth/forgot-password" ||
    pathname === "/auth/verfiy_email" ||
    pathname === "/auth/reset-password"
  ) {
    return null;
  }

  const handleLogout = async () => {
    try {

      await logout();
      localStorage.removeItem("accessToken");
      toast.success("Logout successful!");

    } catch (error) {

    }
  };


  return (
    <Sidebar className=" ">
      <SidebarHeader className="p-4 ">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/512.png"
            alt="Logo"
            width={600}
            height={600}
            className="w-[150px] h-[150px] mx-auto flex items-center justify-center"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 px-6 py-5   text-[20px] rounded-full ${pathname === item.url
                        ? "bg-[#1A1A1A]  text-[20px] text-white"
                        : "hover:bg-[#1A1A1A]  "
                        }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/auth/login"} onClick={handleLogout}>
                <button className="flex items-center gap-3 px-3 py-2 w-full text-white text-center justify-center bg-red-500">
                  <LogOut className="w-5 h-5" />
                  <span>Log out</span>
                </button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
