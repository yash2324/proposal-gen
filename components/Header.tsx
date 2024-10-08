"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { TbSparkles } from "react-icons/tb";

export default function Header() {
  return (
    <header className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl flex gap-x-2 justify-center items-center font-bold text-orange-600"
              prefetch={false}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform duration-300">
                <TbSparkles className="text-2xl md:text-2xl" />
              </div>
              BizGen AI
            </Link>
            <NavigationMenu className="hidden lg:ml-10 lg:flex">
              <NavigationMenuList>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                    prefetch={false}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="/user-settings"
                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                    prefetch={false}
                  >
                    My Details
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center">
            <Button
              onClick={() => signOut()}
              className="bg-orange-100 text-orange-700 hover:bg-orange-200 hover:text-orange-800"
            >
              Logout
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-4 lg:hidden"
                >
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="grid gap-4 py-6">
                  <Link
                    href="/"
                    className="text-lg font-semibold text-gray-700 hover:text-orange-600"
                    prefetch={false}
                  >
                    Home
                  </Link>
                  <Link
                    href="/user-settings"
                    className="text-lg font-semibold text-gray-700 hover:text-orange-600"
                    prefetch={false}
                  >
                    My Details
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
