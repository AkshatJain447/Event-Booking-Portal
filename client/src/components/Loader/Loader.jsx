import { MagnifyingGlass } from "react-loader-spinner";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.p
      className="my-8 flex flex-wrap justify-center items-center text-4xl font-bold"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: "backIn",
      }}
    >
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
      Finding <span className="text-accent3 mx-1">Best</span> Deals for You
    </motion.p>
  );
};

export default Loader;
