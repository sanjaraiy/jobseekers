import React from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar() {
  // const user = false;
  const {user} = useSelector((store) => store.auth);
  console.log(user);
  
  return (
    <div className="bg-white px-5 drop-shadow-lg">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/jobs'>Jobs</Link>
            </li>
            <li>
              <Link to='/browser'>Browse</Link>
            </li>
          </ul>
          {!user ? (
            <div className="flex gap-2 items-center">
              <Link to={'/login'}>
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={'/signup'}>
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user.profile.profilePhoto}
                    alt="profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 mr-2">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user.profile.profilePhoto}
                      alt="profile"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex items-center">
                    <User2></User2>
                    <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                  </div>
                  <div className="flex items-center">
                    <LogOut></LogOut>
                    <Button variant="link"> Logout </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
