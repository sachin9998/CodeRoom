import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form className="min-w-[25vw] h-[auto] flex flex-col items-center bg-[#0f0e0e] p-[20px] rounded-lg shadow-xl shadow-black/50">
          <img
            className="w-[220px] m-5 object-cover"
            src="./logo.png"
            alt="codeRoom Logo"
          />

          <div className="inputBox">
            <input
              //   onChange={(e) => {
              //     setFullName(e.target.value);
              //   }}
              //   value={fullName}
              type="text"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="inputBox">
            <input
              //   onChange={(e) => {
              //     setEmail(e.target.value);
              //   }}
              //   value={email}
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="inputBox">
            <input
              //   onChange={(e) => {
              //     setPwd(e.target.value);
              //   }}
              //   value={pwd}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p className="text-[gray] text-[14px] mt-3 self-start">
            Alerady have an account{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>

          <button className="btnNormal mt-3 bg-blue-500 transition-all hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
