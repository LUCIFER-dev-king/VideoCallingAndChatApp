import React, { useContext, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { signIn } from "./helper/authHelper";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    signIn({ username, password });
  };

  return (
    <div className='container fluid'>
      <div className='explore'>
        <Link to='/learn'>Explore</Link>
      </div>
      <div className='row'>
        <div className='col-md-4 offset-md-4 mt-5'>
          <section className='text-center'>
            <h1>Password Manager</h1>

            <h4 className='p-2'>Welcome Back</h4>

            <p>
              Don't have an account,
              <Link to='signup'>
                <a>Sign Up</a>
              </Link>
            </p>
          </section>

          <section className='p-4'>
            <form action=''>
              <label className='p-1' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
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
                onClick={handleSignIn}
                className='btn btn-secondary w-100 rounded mt-3'
              >
                Sign In
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

export default SignIn;
