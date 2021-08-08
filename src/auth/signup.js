import React, { useState, useContext, useEffect } from "react";
import { signUp } from "./helper/authHelper";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const handleSignUpSubmit = (e) => {
    signUp({ username, password });
  };

  return (
    <div className='container fluid'>
      <div className='row'>
        <div className='col-md-4 offset-md-4 mt-5'>
          <section className='text-center'>
            <h1>Video chat app</h1>

            <h4 className='p-2'>Create your account</h4>

            <p>
              Already have an account,
              <Link to='signin'>
                <a>Sign Up</a>
              </Link>
            </p>
          </section>

          <section className='p-4'>
            <form action=''>
              <label className='p-1' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                name='username'
                id='username'
                className='form-control p-2'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />

              <label className='p-1 mt-2' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                className='form-control p-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type='button'
                className='btn btn-secondary w-100 rounded mt-3'
                onClick={handleSignUpSubmit}
              >
                Sign Up
              </button>
            </form>
            <p className='mt-1 text-center'>
              <a href=''>Forgot password?</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
