import React, { useState } from "react";
import Layout from "../component/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {API_URL} from "../config"

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // used to navigate to defined page
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, email, password, phone, address };
    console.log(user);

    const res = await axios.post(`${API_URL}api/v1/auth/register`, user);
    if (res.data.success) {
      console.log(res);
      toast.success(res.data.message);
      navigate('/login');
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <Layout>
      <div className="register  flex justify-center items-center flex-col mt-20 w-full ">
        
        
          <form onSubmit={(e) => handleSubmit(e)} className=" p-10 mt-4 border rounded-xl w-1/2">
          <h1 className="text-center m-5 text-4xl font-bold">Register </h1>
            <div className="mb-3 ">
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white p-2 border border-orange-800 rounded-lg"
                value={name}
                required
              />
            </div>
            <div className="mb-3 ">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white p-2 border border-orange-800 rounded-lg"
                value={email}
                required
              />
            </div>
            <div className="mb-3">
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                className="w-full bg-white p-2 border border-orange-800 rounded-lg"
                id="exampleInputPassword1"
                value={password}
                required
              />
            </div>
            <div className="mb-3 ">
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="phone"
                placeholder="Enter your phone number"
                className="form-w-full bg-white p-2 border border-orange-800 rounded-lg w-full"
                value={phone}
                required
              />
            </div>
            <div className="mb-3 ">
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="form-w-full bg-white p-2 border border-orange-800 rounded-lg w-full"
                value={address}
                required
              />
            </div>
            <div className="text-center">
            <button type="submit" className="text-white bg-orange-600 w-1/2 p-2 hover:bg-orange-400 text-lg rounded-lg">
              Submit
            </button>
            </div>
          </form>
        <div/>
        </div>
    </Layout>
  );
}

export default Register;
