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
import Image from "next/image";
import { LogoutUser } from "@/lib/mutations";
import { ModeToggle } from "./DarkModeToggle";

function Navbar() {
  const { user } = useUser();
  const { mutate: logout } = LogoutUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky z-[100] h-20 inset-x-0 top-0 w-full border-b border-zinc-200   bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 text-xl font-semibold flex-1/4">
            <div className="flex flex-row items-center">
              stay<span className="text-green-600">Nest</span>
              <Image src="/icon.png" alt="icon" width={80} height={80} />
            </div>
          </Link>
          <div className="hidden items-center min-[850px]:flex gap-1.5 flex-2/4 justify-center">
            <input
              type="search"
              placeholder="search..."
              className=" py-1.5 px-2.5 border-2 border-gray-200 rounded-xl outline-0 w-72"
            />
            <button className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-full p-0 w-10 h-10">
              <Search className="h-1/2 w-1/2 mx-auto text-white" />
            </button>
          </div>
          <div className="flex-1/4 flex items-center gap-2.5 justify-end">
            <Link
              href="/createNest"
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              Nest your House
            </Link>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none" asChild>
                <button className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-full p-0 w-10 h-10">
                  <User className="h-2/3 w-2/3 mx-auto text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32 bg-gray-50 dark:bg-gray-900 px-2.5 py-3.5 rounded-xl border-2 border-green-500 z-50">
                <DropdownMenuLabel className="border-b-2 mb-1.5 font-semibold text-lg">
                  Account
                </DropdownMenuLabel>

                <DropdownMenuGroup>
                  {user?.username && (
                    <>
                      <DropdownMenuItem>{user.username}</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link href="/profile" className="w-full cursor-pointer">
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="w-full cursor-pointer"
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  )}
                  {!user?.username && (
                    <>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link href="/signup" className="w-full cursor-pointer">
                          SignUp
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Link href="/login" className="w-full cursor-pointer">
                          Login
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem>
                    <Link href="/#" className="w-full cursor-pointer">
                      Contact us
                    </Link>
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

//  <nav className=" sticky z-[100] h-20 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
//       <MaxWidthWrapper>
//         <div className="flex h-20 items-center justify-between border-b border-zinc-200">
//           <Link href="/" className="flex z-40 text-xl font-semibold flex-1/4">
//             <div className="flex flex-row items-center">
//               stay<span className="text-green-600">Nest</span>
//               <Image src="/icon.png" alt="icon" width={80} height={80} />
//             </div>
//           </Link>
//           <div className="hidden items-center md:flex gap-1.5 flex-2/4 justify-center">
//             <input
//               type="search"
//               placeholder="search..."
//               className=" py-1.5 px-2.5 border-2 border-gray-200 rounded-xl outline-0 w-72"
//             />
//             <button className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-full p-0 w-10 h-10">
//               <Search className="h-1/2 w-1/2 mx-auto" />
//             </button>
//           </div>
//           <div className="flex-1/4 flex items-center gap-2.5 justify-end">
//             <Link
//               href="/createNest"
//               className={buttonVariants({ size: "sm", variant: "ghost" })}
//             >
//               Nest your House
//             </Link>
//             <ModeToggle />
//             <DropdownMenu>
//               <DropdownMenuTrigger className="outline-none" asChild>
//                 <button className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-full p-0 w-10 h-10">
//                   <User className="h-2/3 w-2/3 mx-auto" />
//                 </button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-32 bg-gray-50 px-2.5 py-3.5 rounded-xl border-2 border-green-500 z-50">
//                 <DropdownMenuLabel className="border-b-2 mb-1.5 font-semibold text-lg">
//                   Account
//                 </DropdownMenuLabel>

//                 <DropdownMenuGroup>
//                   {user?.username && (
//                     <>
//                       <DropdownMenuItem>{user.username}</DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer">
//                         <Link href="/profile">Profile</Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={handleLogout}
//                         className="cursor-pointer"
//                       >
//                         Logout
//                       </DropdownMenuItem>
//                     </>
//                   )}
//                   {!user?.username && (
//                     <>
//                       <DropdownMenuItem className="cursor-pointer">
//                         <Link href="/signup">SignUp</Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer">
//                         <Link href="/login">Login</Link>
//                       </DropdownMenuItem>
//                     </>
//                   )}
//                   <DropdownMenuItem>
//                     <Link href="/#">Contact us</Link>
//                   </DropdownMenuItem>
//                 </DropdownMenuGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             {/* <Button className="rounded-full">

//             </Button> */}
//           </div>
//         </div>
//       </MaxWidthWrapper>
//     </nav>
