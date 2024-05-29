import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FadeInFromBottom = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <AnimatePresence >
      <div >
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }}
            exit={{ opacity: 0, x: "100%" }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default FadeInFromBottom;