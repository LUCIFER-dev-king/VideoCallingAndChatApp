import React, { useContext, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { signIn } from "./helper/authHelper";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    signIn({ email, password });
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center mt-20">
      <div className="text-center">
        <h1 className="font-bold text-4xl">CHATz</h1>
      </div>

      <div
        style={{ boxShadow: "0 25px 25px rgba(0, 0, 0, 0.15)" }}
        className="w-96 mt-8 flex flex-col rounded p-10"
      >
        <h4 className="text-gray text-center font-semibold">
          Login with Chatz
        </h4>

        <input
          type="email"
          id="email"
          placeholder="Email"
          className="mt-4 p-2 rounded border-2 border-gray focus:border-transparent focus:ring-2 focus:ring-gray focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="mt-2 p-2 rounded border-2 border-gray focus:border-transparent focus:ring-2 focus:ring-gray focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleSignIn}
          className="w-100 rounded text-white bg-secondary p-2 font-semibold mt-3"
        >
          Sign In
        </button>

        <a href="http://www.localhost:8080/api/user">test</a>
        <div className="mt-2 text-gray text-center font-normal">
          Don't have an account, <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
