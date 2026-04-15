import logo from "@/assets/images/logo.png";
import modelImg from "@/assets/images/model.jpeg";
import { User, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/user-auth-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/user.schema";
import type { LoginInput } from "@/types/types";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const {
    user,
    login,
    isAuthenticated,
    isLoading,
    error: authError,
  } = useAuthStore();

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      if (user?.role === "sales_assistant") {
        navigate("/attire");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, isAuthenticated, navigate]);

  const onSubmit = async (data: LoginInput) => {
    const result = await login(data);

    if (result.success) {
      // Get fresh state after login
      const currentUser = useAuthStore.getState().user;
      if (currentUser?.role === "sales_assistant") {
        navigate("/attire");
      } else {
        navigate("/dashboard");
      }
    }
    // Error is automatically set in store, no need to handle here
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

            <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("username")}
                    disabled={isLoading}
                  />
                </div>
                {errors.username && (
                  <p className="text-[#d46a7e] text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
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
                    {...register("password")}
                    disabled={isLoading}
                  />
                </div>
                {errors.password && (
                  <p className="text-[#d46a7e] text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* ERROR MESSAGE */}
              {authError && (
                <div className="text-[#d46a7e] text-sm mb-3 bg-[#fde7ec] border border-[#f3b5c2] rounded-md p-2">
                  {authError}
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full 
                  bg-light-brown-medium text-white 
                  py-3 rounded-lg shadow-md
                  text-light-white font-semibold
                  transition-all duration-300
                  hover:bg-light-brown hover:scale-105 hover:shadow-xl
                  active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                "
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

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
