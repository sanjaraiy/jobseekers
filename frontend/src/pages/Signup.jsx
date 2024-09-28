import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    profilePhoto: "",
  });

  const {loading} = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    // console.log(e.target);
    
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeEventFileHandler = (e) => {
    setInput({ ...input,  profilePhoto: e.target.files?.[0]});
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phone",input.phone);
    formData.append("password",input.password);
    formData.append("role",input.role);
   
    if(input.profilePhoto){
      formData.append("profilePhoto",input.profilePhoto);
    }
    
      // Display FormData entries
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });
    
    try {
        dispatch(setLoading(true));
      const response  = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      
      console.log(response.data);
      
      if(response.data.success){
         navigate('/login')
         toast.success(response.data.message);

      }

      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)


    }
    finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center max-7-xl mx-auto">
      <form
        action=""
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-3xl mb-5">Sign Up</h1>
        <div>
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            className="my-2"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            placeholder="John"
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            className="my-2"
            type="email"
            placeholder="john@gmail.com"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            className="my-2"
            type="text"
            placeholder="935333222"
            name="phone"
            value={input.phone}
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label htmlFor="password">Create Password</Label>
          <Input
            className="my-2"
            type="password"
            placeholder="*******"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
          />
        </div>
        <div className="mt-5 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="flex items-center cursor-pointer space-x-2">
              <input
                type="radio"
                value="APPLICANT"
                name="role"
                id="applicant"
                
                checked={input.role === "APPLICANT"}
                onChange={changeEventHandler}
              />
              <Label htmlFor="applicant">Applicant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value="RECRUITER"
                name="role"
                
                id="recruiter"
                checked={input.role === "RECRUITER"}
                onChange={changeEventHandler}
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor='profilePhoto'>Profile</Label>
            <Input
              name="profilePhoto"
              accept="image/*"
              type="file"
              onChange={changeEventFileHandler}
              className="cursor-pointer"
            />
          </div>
        </div>

        {
        loading ? (<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please wait</Button>) : ( <Button type="submit" className="w-full my-4">
          Signup
        </Button>)
       }
        <span className="text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Signup;
