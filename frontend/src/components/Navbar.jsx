import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="nav flex px-[100px] items-center justify-between h-[80px] bg-[#0f0e0e]">
        <Link to={"/"}>
          <img src="/logo.png" className="w-[170px] object-cover" alt="" />
        </Link>

        <div className="links flex items-center gap-[15px]">
          <Link className=" transition-all hover:text-blue-500" to={"/"}>
            Home
          </Link>

          <a
            href="https://www.sachinalam.in"
            target="_blank"
            className=" transition-all hover:text-blue-500"
            rel="noopener noreferrer"
          >
            About
          </a>

          <a
            href="https://www.sachinalam.in"
            target="_blank"
            className=" transition-all hover:text-blue-500"
            rel="noopener noreferrer"
          >
            Services
          </a>

          <a
            href="https://www.sachinalam.in"
            target="_blank"
            className=" transition-all hover:text-blue-500"
            rel="noopener noreferrer"
          >
            Contact
          </a>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("isLoggedIn");
              window.location.reload();
            }}
            className="btnNormal bg-red-500 transition-all hover:bg-red-600 px-[20px]"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
