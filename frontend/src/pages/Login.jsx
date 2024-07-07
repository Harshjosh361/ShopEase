import React from "react";
import { useState } from "react";
import Layout from "../component/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate('/');
  const location = useLocation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    console.log(user);
    const res = await axios.post("/api/v1/auth/login", user);
    if (res.data.success) {
      console.log(res);
      toast.success(res.data.message);
      // using context api here
      setAuth({...auth,user:res.data.user,token:res.data.token});
      // using local storage here to store the token and user data 
      localStorage.setItem("auth", JSON.stringify(res.data)); 
      navigate( location.state ||"/");
    } else {
      console.log(res.data.message);
      toast.error(res.data.message);
    }
  };
  return (
    <Layout>
      <div className="register  flex justify-center items-center flex-col mt-20 w-full">
          <form onSubmit={(e) => handleSubmit(e)} className=" p-7 mt-4 border rounded-xl w-1/2 ">
          <h1 className="text-center m-5 text-4xl font-bold">Login</h1>
            <div className="mb-3 ">
              <div className="m-2 text-xl">Email:</div>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
               className="w-full bg-white p-3 m-1 border border-orange-800 rounded-lg"
                value={email}
                required
              />
            </div>
            <div className="mb-4">
              <div className="m-2 text-xl">Password:</div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                 className="w-full bg-white p-3 m-1 border border-orange-800 rounded-lg"
                id="exampleInputPassword1"
                value={password}
                required
              />
            </div>
            <div className="text-center">
            <button type="submit" className="text-white bg-orange-600 w-1/2 p-2 hover:bg-orange-400 text-lg rounded-lg" >
              Login
            </button>
            </div>
            
          </form>
        </div>
      
    </Layout>
  );  
}

export default Login;
