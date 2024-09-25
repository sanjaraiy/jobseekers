import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="flex items-center justify-center max-7-xl mx-auto">
      <form
        action=""
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-3xl mb-5">Sign Up</h1>
        <div>
          <Label htmlFor="fullname">Full Name</Label>
          <Input className="my-2" type="text" placeholder="John" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input className="my-2" type="email" placeholder="john@gmail.com" />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input className="my-2" type="number" placeholder="935333222" />
        </div>
        <div>
          <Label htmlFor="password">Create Password</Label>
          <Input className="my-2" type="password" placeholder="*******" />
        </div>
        <div className="mt-5 flex justify-between items-center">
          <RadioGroup className="flex items-center gap-5" defaultValue="option-one">
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="APPLICANT" name='role' id="applicant" />
              <Label htmlFor="applicant">Applicant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="RECRUITER" name='role' id="recruiter" />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </RadioGroup>
          
          <div className="flex  items-center gap-2">
            <Label>Profile</Label>
            <Input 
              accept="image/*"
              type="file"
              className="cursor-pointer"
            ></Input>
          </div>
          
        </div>
        
        <Button type="submit" className='w-full my-4'>Signup</Button>
        <span className="text-sm">Already have an account? <Link to={'/login'} className="text-blue-600 hover:underline">Login</Link></span>
      </form>
    </div>
  );
}

export default Signup;
