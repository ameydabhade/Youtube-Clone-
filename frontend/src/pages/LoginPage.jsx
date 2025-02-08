import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../utils/URLs";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/slices/configsSlice";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const response = await res.json();

      if (response.token) {
        dispatch(setAuth(response));
        localStorage.setItem("auth", JSON.stringify(response));
        navigate("/");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[448px] p-12 rounded-lg">
        <div className="text-center mb-8">
          {/* YouTube Logo */}
          <svg height="24" viewBox="0 0 90 20" className="mx-auto mb-4">
            <path
              d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
              fill="#FF0000"
            />
            <path
              d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
              fill="white"
            />
          </svg>
          <h1 className="text-2xl font-normal mb-2">Sign in</h1>
          <p className="text-base text-gray-600">to continue to YouTube</p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-red-500 bg-red-50 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-base"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-base"
              placeholder="Password"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <Link
              to="/register"
              className="text-blue-600 font-medium text-sm hover:text-blue-800"
            >
              Create account
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-8 text-sm text-gray-600">
          <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
        </div>
      </div>
    </div>
  );
};
