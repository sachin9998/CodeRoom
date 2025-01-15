import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    // fetch(api_base_url + "/signUp", {
    //   mode: "cors",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },

    //   body: JSON.stringify({
    //     fullName: fullName,
    //     email: email,
    //     password: password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success) {
    //       navigate("/login");
    //     } else {
    //       toast.error(data.message);
    //     }
    //   });
  };

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
