import logo from "../assets/images/logo.jpg";
import modelImg from "../assets/images/model.png";
import { useState } from "react";
import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError("Please fill in both username and password.");
      return;
    }

    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#fff7f9] via-[#ffeef3] to-[#f7c8d2]">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center justify-center min-h-[600px]">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center items-center h-full text-center">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img src={logo} alt="logo" className="w-32 object-contain" />
          </div>

          <h1
            style={{ fontFamily: "Bodoni Moda" }}
            className="text-4xl font-bold "
          >
            Hiru Sandu
          </h1>
          <p
            style={{ fontFamily: "Bodoni Moda" }}
            className="text-lg text-gray-600 -mt-1"
          >
            Bridal Wear
          </p>
          <p className="text-sm text-light-gray-medium mt-1">
            Elegance in Every Thread
          </p>

          {/* Model Image */}
          <div className="mt-6 flex justify-center">
            <img
              src={modelImg}
              alt="model"
              className="w-80 h-[420px] object-cover rounded-2xl shadow-2xl  border-layout-bg"
            />
          </div>
        </div>

        {/* LOGIN FORM */}
        <div className="flex flex-col justify-center  w-100 mt-35">
          {/* ...existing login form code... */}
          <div className="bg-light-rose-lightest p-10 rounded-2xl border-[1.5px]  h-full shadow-2xl border-[#f3c4cf]">
            <h2
              style={{ fontFamily: "Bodoni Moda" }}
              className="text-3xl font-bold  text-gray-800 text-center"
            >
              Welcome Back
            </h2>
            <p className="text-center text-light-gray-medium text-sm mb-6">
              Login to continue
            </p>

            {/* USERNAME */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>

              <div
                className="
                  flex items-center 
                  border-[1.5px] border-[#f8dce3]
                  rounded-lg px-3 mt-1 
                  transition-shadow duration-300
                  focus-within:shadow-[0px_0px_8px_2px_rgba(243,190,205,0.8)]
                "
              >
                <User size={18} className="text-gray-500" />

                <input
                  type="text"
                  className="flex-1 p-2 bg-transparent outline-none"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div
                className="
                  flex items-center 
                  border-[1.5px] border-[#f8dce3]
                  rounded-lg px-3 mt-1 
                  transition-shadow duration-300
                  focus-within:shadow-[0px_0px_8px_2px_rgba(243,190,205,0.8)]
                "
              >
                <Lock size={18} className="text-gray-500" />

                <input
                  type="password"
                  className="flex-1 p-2 bg-transparent outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="text-[#d46a7e] text-sm mb-3 bg-[#fde7ec] border border-[#f3b5c2] rounded-md p-2">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="
                w-full 
                bg-light-brown-medium text-white 
                py-3 rounded-lg shadow-md
text-light-white font-semibold
                transition-all duration-300
                hover:bg-light-brown hover:scale-105 hover:shadow-xl
                active:scale-95
              "
            >
              Login
            </button>

            <p className="text-center text-light-brown-medium text-sm mt-4 cursor-pointer hover:underline">
              Forgot password?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
