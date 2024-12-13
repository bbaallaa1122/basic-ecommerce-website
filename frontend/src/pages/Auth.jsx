import React, { useContext, useEffect, useState } from "react";
import { shopcontext } from "../context/Contextprovider";
import axios from "axios";
import { toast } from "react-toastify";
const Auth = () => {
  const [curstate, setCurstate] = useState("signup");
  const {token,backend, settoken,navigate} = useContext(shopcontext);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  async function submithandler(e) {
    e.preventDefault();
    try {
      const form=e.target;
      if (curstate === 'signup') {
        const res = await axios.post(`${backend}/api/users/register`, { name, email, password });
        if (res.data.success) {
          setname("");
          setemail("");
          setpassword("");
          settoken(res.data.token);
          localStorage.setItem('token', res.data.token);
          form.reset();
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(`${backend}/api/users/login`, { email, password });
        if (res.data.success) {
          settoken(res.data.token);
          localStorage.setItem('token', res.data.token);
          setname("");
          setemail("");
          setpassword("");
          form.reset();
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if(token)
        navigate("/");
  }, [token]);
  function toggleState() {
    setCurstate((prev) => (prev === "signup" ? "login" : "signup"));
  }

  return (
    <div className="pt-20 flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl text-gray-700 font-bold text-center mb-6">
          {curstate === "signup" ? "Create an Account" : "Welcome Back"}
        </h1>
        <form onSubmit={(e) => submithandler(e)} className="space-y-4">
          {curstate === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                onChange={(e) => setname(e.target.value)}
                value={name}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              placeholder="Your Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button 
            className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            {curstate === "signup" ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {curstate === "signup" ? "Already have an account?" : "New here?"}
          </p>
          <button
            onClick={toggleState}
            className="text-gray-700 hover:underline mt-1"
          >
            {curstate === "signup" ? "Switch to Login" : "Switch to Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
