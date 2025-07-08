import React, { useState } from "react";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
  const [contactMsg, setContactMsg] = useState({
    name: "",
    email: "",
    message: "",
    rating: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      contactMsg.name.trim() === "" ||
      contactMsg.email.trim() === "" ||
      contactMsg.message.trim() === "" ||
      contactMsg.rating === ""
    ) {
      toast.error("Please fill all the fields!!");
      return;
    }

    try {
      const response = await fetch(
        "https://event-booking-portal.onrender.com/api/contactUs/",
        // "http://localhost:5000/api/contactUs"
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactMsg),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent! ✅");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Server error while sending message.");
    } finally {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <>
      {window.innerWidth > 480 && (
        <div className="flex my-3 items-center w-[80vw] mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-3 border-2 border-red-400 hover:border-red-600 rounded-xl text-red-400 hover:text-red-600 tracking-wide font-semibold text-lg shadow-md transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Back to Home
          </motion.button>
        </div>
      )}

      <motion.div
        className="my-4 md:mb-8 md:mt-0 mx-auto border border-accent3 rounded-lg shadow-xl w-[95vw] md:w-[80vw] p-4 bg-white"
        initial={{ opacity: 0, translateY: 60 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent3 mb-6 text-center"
          initial={{ opacity: 0, translateX: 60 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "backOut" }}
        >
          We'd Love to Hear From You!
        </motion.h1>

        <form
          className="w-[90%] max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Name Field */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              name="name"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent3"
              placeholder="e.g., Akshat Jain"
              onChange={(e) =>
                setContactMsg((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent3"
              placeholder="e.g., akshatjain@gmail.com"
              onChange={(e) =>
                setContactMsg((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-sm font-semibold text-gray-700 mb-1"
            >
              Your Message
            </label>
            <textarea
              name="message"
              placeholder="We value your feedback..."
              rows="4"
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent3 resize-none"
              onChange={(e) =>
                setContactMsg((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </div>

          {/* Rating Thumbs */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <p className="text-sm font-semibold text-gray-700">
              How do you feel about our site?
            </p>
            <div className="flex gap-6 text-xl text-gray-600">
              <span
                className={`flex items-center gap-1 cursor-pointer hover:text-green-500 ${
                  contactMsg.rating === "Yes" ? "text-green-500" : ""
                } transition-all`}
                onClick={() =>
                  setContactMsg((prev) => ({ ...prev, rating: "Yes" }))
                }
              >
                <FaRegThumbsUp /> Yes
              </span>
              <span
                className={`flex items-center gap-1 cursor-pointer hover:text-red-500 ${
                  contactMsg.rating === "No" ? "text-red-500" : ""
                } transition-all`}
                onClick={() =>
                  setContactMsg((prev) => ({ ...prev, rating: "No" }))
                }
              >
                <FaRegThumbsDown /> No
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "anticipate" }}
            whileHover={{ scale: 1.03 }}
            className="w-full bg-accent3 text-white py-2 px-4 rounded-lg font-semibold hover:bg-accent2 transition duration-300"
          >
            Share Your Thoughts
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};

export default Contact;
