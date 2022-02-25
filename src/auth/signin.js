import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { signIn } from "./helper/authHelper";

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (testemail, testpass) => {
    var credentails = {
      email: email === "" ? testemail : email,
      password: password === "" ? testpass : password,
    };
    console.log(credentails);
    signIn(credentails).then((res) => {
      if (res) {
        history.push("/");
      }
    });
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center mt-20">
      <div className="text-center">
        <h1 className="font-bold text-4xl">CHATz</h1>
      </div>

      <div
        style={{ boxShadow: "0 25px 25px rgba(0, 0, 0, 0.15)" }}
        className="w-96 mt-2 flex flex-col rounded p-10"
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

        <div className="flex justify-center align-center mt-3">
          <button
            type="button"
            onClick={() => {
              setEmail("test1@test.com");
              setPassword("123456");
              handleSignIn("test1@test.com", "123456");
            }}
            className="w-100 mr-5 rounded text-white bg-gray p-2 font-semibold text-sm"
          >
            Guest User1 Login
          </button>
          <button
            type="button"
            onClick={() => {
              setEmail("test2@gmail.com");
              setPassword("123456");
              handleSignIn("test2@gmail.com", "123456");
            }}
            className="w-100 rounded text-white bg-gray p-2 font-semibold text-sm"
          >
            Guest User2 Login
          </button>
        </div>

        <div className="mt-2 text-gray text-center font-normal">
          Don't have an account, <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
