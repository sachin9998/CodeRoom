import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../helper.js";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      if (!fullName || !email || !password) {
        toast.error("All fields are required!");
        return;
      }

      if (password.length < 6) {
        toast.error("Password should be at least 6 characters long.");
        return;
      }

      const response = await fetch(`${api_base_url}/signUp`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      if (data.success) {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.message.includes("User already exists")) {
        toast.error("User with this email already exists!");
      } else {
        toast.error(error.message);
      }
      console.error("Signup error:", error);
    }
  };

  // const submitForm = (e) => {
  //   e.preventDefault();

  //   if (fullName === "" || email === "" || password == "") {
  //     toast.error("All Fields are required!");
  //     return;
  //   }

  //   if (password.length < 6) {
  //     toast.error("Password Should be greater than 6 Characters.");
  //     return;
  //   }

  //   fetch(api_base_url + "/signUp", {
  //     mode: "cors",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //     body: JSON.stringify({
  //       fullName: fullName,
  //       email: email,
  //       password: password,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         toast.success("Signup Successfull");
  //         navigate("/login");
  //       } else {
  //         toast.error(data.message);
  //       }
  //     });
  // };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form
          onSubmit={submitForm}
          className="min-w-[350px] w-[25vw] h-[auto] flex flex-col items-center bg-[#0f0e0e] p-[20px] rounded-lg shadow-xl shadow-black/50"
        >
          <img
            className="w-[220px] object-cover"
            src="./logo.png"
            alt="codeRoom Logo"
          />

          <div className="inputBox">
            <input
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              value={fullName}
              type="text"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="inputBox">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="inputBox">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
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
