"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { MainNav } from "./components/main-nav";
import { UserNav } from "./components/user-nav";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Toaster } from "sonner";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); 
  const router = useRouter();
  useEffect(() => {
    if (pathname === "/") {
      router.push("/login");
    }
  }, [pathname, router]);
  // Define pages where the sidebar should be hidden

  const isAuthPage = pathname === "/login" || pathname === "/forgot-password" || pathname === "/";
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen">            
            {!isAuthPage && (
              <div className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
                <div className="flex h-full flex-col">
                  <div className="border-b p-4">
                    
                            <Image  src="/images/logo.png"  alt="HR Portal Logo"  width={120}  height={40}  priority  />

                  </div>
                  <div className="flex-1 p-4">
                    <MainNav />
                  </div>
                </div>
              </div>
            )}

            {/* Main content */}
            <div className="flex-1">
              {/* Conditionally render header only if NOT on login page */}
              {!isAuthPage && (
                <header className="border-b">
                  <div className="flex h-16 items-center px-4 gap-4">
                    <div className="flex-1">
                      {/* <h1 className="text-lg font-semibold">HR Portal</h1> */}
                    </div>
                    <UserNav />
                  </div>
                </header>
              )}

              <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
          </div>
          <Toaster position="top-right" richColors /> 
        </ThemeProvider>
      </body>
    </html>
  );
}
