import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "", // Applicant or Recruiter
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers : {
          "Content-Type": "application/json"
          
        },
        withCredentials: true,
      })

      if(response.data.success){
        navigator('/')
        toast.success(response.data.message);
      }
      
    } catch (error) {
       console.log(error);
       
       toast.error(error.response.data.message)
    }
    
  };

  return (
    <div className="flex items-center justify-center max-7-xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-3xl mb-5">Sign in</h1>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            className="my-2"
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="john@gmail.com"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            className="my-2"
            type="password"
            name="password"
            placeholder="*******"
            value={input.password}
            onChange={changeEventHandler}
          />
        </div>

        <div className="mt-5 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="applicant"
                name="role"
                value="APPLICANT"
                checked={input.role === "APPLICANT"}
                onChange={changeEventHandler}
              />
              <Label htmlFor="applicant">Applicant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="recruiter"
                name="role"
                value="RECRUITER"
                checked={input.role === "RECRUITER"}
                onChange={changeEventHandler}
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full my-4">
          Login
        </Button>
        <span className="text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
