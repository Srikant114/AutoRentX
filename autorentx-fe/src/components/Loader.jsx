import React from "react";

const Loader = () => {
  return (
    // Full-screen flex container to center the loader
    <div className="flex justify-center items-center h-[80vh] bg-light">
      {/* Animated spinner with theme-based primary color and light border */}
      <div
        className="animate-spin rounded-full h-14 w-14 border-4 
                   border-borderColor border-t-primary"
      ></div>
    </div>
  );
};

export default Loader;
