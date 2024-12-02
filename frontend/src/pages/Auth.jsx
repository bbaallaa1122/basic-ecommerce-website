import React, { useState } from "react";

const Auth = () => {
  const [curstate, setCurstate] = useState("signup");

  function submithandler(e) {
    e.preventDefault();
  }

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
              <label
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label
              className="block text-sm font-medium text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
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

