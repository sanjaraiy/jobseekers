import Navbar from "@/components/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

function Profile() {
//   const { user } = useSelector((store) => store.user);
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl  mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg?t=st=1727597066~exp=1727600666~hmac=85a4f5fca7a319e5336d53b8cb8dd89247da035f5666581dfa2e41422965a510&w=740"
              alt="profile"
            ></AvatarImage>
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">Full Name</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloremque recusandae tenetur quod sunt non vero fugiat ut minima
              cum reprehenderit!
            </p>
          </div>
        </div>
        <Button className="text-right" variant="outline">
          <Pen></Pen>
        </Button>
        </div>
        <div className="my-5">
         <div className="flex items-center gap-3 my-2">
         <Mail></Mail>
         <span>sanjay@gmail.com</span>
         </div>
            <div className="flex items-center gap-3 my-2">
            <Contact></Contact>
            <span>345346466634</span>
            </div>
          
        </div>
        <div>
            <h1>Skills</h1>
            <div>
                {
                    [1,2,4,5].map((item, idx) => <Badge key={idx}>item</Badge>)
                }
            </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
