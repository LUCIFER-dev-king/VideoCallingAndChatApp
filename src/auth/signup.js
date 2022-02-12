import React, { useState, useContext, useEffect } from "react";
import { signUp } from "./helper/authHelper";
import { Link, useHistory } from "react-router-dom";
import { API } from "../backend";

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const handleSignUpSubmit = (e) => {
    signUp({ email, username, password });
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
        <h4 className="text-gray-500 text-center font-semibold">Let's begin</h4>

        <input
          type="text"
          id="Username"
          placeholder="Username"
          className="p-2 rounded border-2 border-gray focus:border-transparent focus:ring-2 focus:ring-gray focus:outline-none mt-4"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="email"
          id="email"
          placeholder="Email"
          className="mt-2 p-2 rounded border-2 border-gray focus:border-transparent focus:ring-2 focus:ring-gray focus:outline-none"
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
          onClick={handleSignUpSubmit}
          className="w-100 rounded text-white bg-secondary p-2 font-semibold mt-3"
        >
          Sign Up
        </button>

        <a
          href={`${API}/auth/google`}
          className="w-100 text-center rounded text-white bg-secondary p-2 font-semibold mt-3"
        >
          Sing up with Google
        </a>
        <div className="mt-2 text-gray text-center font-normal">
          Already have an account, <a href="/signin">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
