import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const Footer = () => {
  const controls = useAnimation();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView]);

  return (
    <motion.footer
      className="bg-white text-primaryText py-8"
      ref={footerRef}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      initial="hidden"
      animate={controls}
      transition={{
        duration: 0.5,
        ease: "backIn",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">About Us</h3>
            <p className="text-sm text-justify">
              I am an aspiring software engineer with a strong technical
              background and a passion for solving complex problems. They
              possess proficiency in multiple programming languages and web
              development frameworks, emphasizing teamwork, adaptability, and
              effective collaboration.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Destinations</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <span
                className=" hover:cursor-pointer border p-1 rounded-md hover:text-gray-700 dark:hover:text-gray-500 shadow-md hover:border-gray-600"
                onClick={() =>
                  window.open("https://github.com/AkshatJain447", "_blank")
                }
              >
                <FaGithub className=" hover:scale-110 duration-100 text-xl" />
              </span>
              <span
                className=" hover:cursor-pointer border p-1 rounded-md hover:text-[#0077B5] shadow-md hover:border-[#0077B5]"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/akshat-jain-b016391a6/",
                    "_blank"
                  )
                }
              >
                <FaLinkedin className=" hover:scale-110 duration-100 text-xl" />
              </span>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-sm">Rampur Maniharan, Saharanpur, India</p>
            <p className="text-sm">Email: codingKnights447@gmail.com</p>
            <p className="text-sm">Phone: +91 73007 16447</p>
          </div>
        </div>
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} EventEase. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
