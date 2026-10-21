import type React from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import Providers from "@/Provider/Providers";
import { Toaster } from "sonner";
import { Suspense } from "react";

const inter = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "re:",
  description: "Complete admin dashboard with routing",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} cz-shortcut-listen="true" >
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center" >Loading...</div>}>
          <Providers>
            <SidebarProvider defaultOpen={true}>
              <div className="flex min-h-screen w-full bg-[#e6e6e6]">
                <AppSidebar />
                <div className="flex-1  flex flex-col  ">
                  <DashboardHeader />
                  <Toaster />
                  <main className="flex-1 p-6 mt-16 bg-[#e6e6e6]">{children}</main>
                </div>
              </div>
            </SidebarProvider>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
