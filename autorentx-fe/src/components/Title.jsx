import React from "react";

const Title = ({ title, subTitle, align }) => {
  return (
    <div
      // Layout control: center or left-align based on `align` prop
      className={`flex flex-col justify-center text-center ${
        align === "left" ? "md:items-start md:text-left" : "items-center"
      }`}
    >
      {/* Main title text */}
      <h1 className="font-semibold text-4xl md:text-[40px] text-text-primary">
        {title}
      </h1>

      {/* Subheading / Description text */}
      <p className="text-sm md:text-base text-text-secondary mt-2 max-w-156">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
