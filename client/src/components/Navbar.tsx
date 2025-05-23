"use client";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { User, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuGroup, DropdownMenuItem } from "./ui/dropdown-menu";
import { useUser } from "./UserContext";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

function Navbar() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <nav className=" sticky z-[100] h-20 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 text-xl font-semibold flex-1/4">
            <div className="flex flex-row items-center">
              stay<span className="text-green-600">Nest</span>
              <Image src="/icon.png" alt="icon" width={80} height={80} />
            </div>
          </Link>
          <div className="hidden items-center md:flex gap-1.5 flex-2/4 justify-center">
            <input
              type="search"
              placeholder="search..."
              className=" py-1.5 px-2.5 border-2 border-gray-200 rounded-xl outline-0 w-72"
            />
            <button className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-full p-0 w-10 h-10">
              <Search className="h-1/2 w-1/2 mx-auto" />
            </button>
          </div>
          <div className="flex-1/4 flex items-center gap-2.5 justify-end">
            <Link
              href="/createNest"
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              Nest your House
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none" asChild>
                <button className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-full p-0 w-10 h-10">
                  <User className="h-2/3 w-2/3 mx-auto" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32 bg-gray-50 px-2.5 py-3.5 rounded-xl border-2 border-green-500 z-50">
                <DropdownMenuLabel className="border-b-2 mb-1.5 font-semibold text-lg">
                  Profile
                </DropdownMenuLabel>

                <DropdownMenuGroup>
                  {user?.username && (
                    <>
                      <DropdownMenuItem>{user.username}</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </>
                  )}
                  {!user?.username && (
                    <>
                      <DropdownMenuItem>
                        <Link href="/signup">SignUp</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/login">Login</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem>
                    <Link href="/#">Contact us</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Button className="rounded-full">
              
            </Button> */}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
