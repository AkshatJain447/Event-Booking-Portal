import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthType, setModalState } from "../../store/userAuthSlice";
import { MdCancelPresentation } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import { VscPersonAdd } from "react-icons/vsc";

const Register = () => {
  const dispatch = useDispatch();
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
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-1"
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
      <form className="bg-white border border-gray-200 shadow-md rounded-xl px-4 py-5 space-y-4">
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
