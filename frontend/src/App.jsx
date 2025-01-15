import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <RouteHandler />
    </BrowserRouter>
  );
};

const RouteHandler = () => {
  // const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route
        path="/editior/:id"
        element={isLoggedIn ? <Editor /> : <Navigate to={"/login"} />}
      /> */}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
};

export default App;
