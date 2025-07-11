import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthType, setModalState, setUser } from "../../store/userAuthSlice";
import { MdCancelPresentation } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import { VscPersonAdd } from "react-icons/vsc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (
      !userDetails.name.trim() ||
      !userDetails.email.trim() ||
      !userDetails.password.trim() ||
      !userDetails.cnfPassword.trim()
    ) {
      toast.error("Don't leave any field empty!");
      return;
    }
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email);
    if (!validateEmail) {
      toast.error("Hmm, that email doesn’t look right");
      return;
    }
    if (userDetails.password.length < 8) {
      toast.error("Oops! Password needs 8+ characters");
      return;
    }
    if (userDetails.password !== userDetails.cnfPassword) {
      toast.error("Passwords don’t match — try again");
      return;
    }
    try {
      const response = await fetch(
        `https://event-booking-portal.onrender.com/api/users/register`,
        // "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Registration successfully! Please login to proceed");
        navigate("/");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in user registration!!");
    } finally {
      dispatch(setModalState(false));
    }
  };

  return (
    <>
      {/* Header with close icon */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-2xl font-bold text-gray-700">Create Account</h3>
        <button
          onClick={() => dispatch(setModalState(false))}
          className="text-2xl text-gray-500 hover:text-red-600 hover:scale-110 transition-transform duration-150"
          aria-label="Close"
        >
          <MdCancelPresentation />
        </button>
      </div>

      {/* Register Form */}
      <form className="border border-gray-200 shadow-md rounded-xl px-4 py-5 space-y-4">
        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Akshat Jain"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="akshatjain@example.com"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setUserDetails((prev) => ({
                ...prev,
                email: e.target.value.toLowerCase(),
              }))
            }
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter a strong password"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setUserDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setUserDetails((prev) => ({
                ...prev,
                cnfPassword: e.target.value,
              }))
            }
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-1"
          onClick={handleRegisterSubmit}
        >
          <VscPersonAdd className="text-xl" />
          Register
        </button>

        <p className="text-sm text-gray-600 text-center mt-2">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => dispatch(setAuthType("Login"))}
          >
            Login
          </span>
        </p>
      </form>
    </>
  );
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginDetails.email.trim() || !loginDetails.password.trim()) {
      toast.error("Don't leave any field empty!");
      return;
    }

    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginDetails.email);
    if (!validateEmail) {
      toast.error("Hmm, that email doesn’t look right");
      return;
    }

    try {
      const response = await fetch(
        `https://event-booking-portal.onrender.com/api/users/login`,
        // "http://localhost:5000/api/users/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginDetails),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Login successful!");
        dispatch(setUser(data.userData));
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in user login!!");
    } finally {
      dispatch(setModalState(false));
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-2xl font-bold text-gray-700">Welcome Back</h3>
        <button
          onClick={() => dispatch(setModalState(false))}
          className="text-2xl text-gray-500 hover:text-red-600 hover:scale-110 transition-transform duration-150"
          aria-label="Close"
        >
          <MdCancelPresentation />
        </button>
      </div>

      {/* Login Form */}
      <form
        className="bg-white border border-gray-200 shadow-md rounded-xl px-4 py-5 space-y-4"
        onSubmit={handleLoginSubmit}
      >
        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="akshatjain@example.com"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setLoginDetails((prev) => ({
                ...prev,
                email: e.target.value.toLowerCase(),
              }))
            }
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setLoginDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-1"
        >
          <AiOutlineLogin className="text-lg" />
          Login
        </button>

        {/* Optional: Link to Register */}
        <p className="text-sm text-gray-600 text-center mt-2">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => dispatch(setAuthType("Register"))}
          >
            Register
          </span>
        </p>
      </form>
    </>
  );
};

const Modal = ({ children }) => {
  return (
    <div className="z-50 h-[100vh] w-[100vw] bg-[#0000007e] fixed top-0 left-0 flex items-center justify-center">
      <div className="rounded-xl bg-white p-4 w-[95vw] md:w-2/3 lg:w-1/3 shadow-xl">
        {children}
      </div>
    </div>
  );
};

const RegisternLogin = () => {
  const modalState = useSelector((state) => state.user.modalState);
  const authType = useSelector((state) => state.user.authType);

  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalState]);

  return (
    <>
      {modalState && (
        <Modal>{authType === "Register" ? <Register /> : <Login />}</Modal>
      )}
    </>
  );
};

export default RegisternLogin;
