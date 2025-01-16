import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <RouteHandler />
    </BrowserRouter>
  );
};

const RouteHandler = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/editior/:id"
          element={isLoggedIn ? <Editor /> : <Navigate to={"/login"} />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default App;
