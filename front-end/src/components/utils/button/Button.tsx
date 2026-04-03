import * as React from "react";

interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export const GreenContainedButton: React.FC<ButtonProps> = ({
  text,
  type,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      className={`border sm:text-[16px] text-[8px] border-solid border-Green400 rounded-[20px] bg-Green100 py-2 px-6 cursor-pointer hover:bg-Green200 text-black hover:shadow-[0_8px_16px_rgba(26,219,0,0.5)] transition-all duration-300 ease-in-out ${className || ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const GreenOutlinedButton: React.FC<ButtonProps> = ({
  text,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      className="border sm:text-[16px] text-[8px] border-solid border-Green400 rounded-[20px] bg-transparent py-2 px-6 cursor-pointer  hover:bg-Green200 text-black hover:shadow-[0_8px_16px_rgba(26,219,0,0.5)] transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const RedContainedButton: React.FC<ButtonProps> = ({
  text,
  type,
  onClick,
  className,
}) => {
  return (
    <button
      type={type}
      className={`border sm:text-[16px] text-[8px] border-solid border-Red400 rounded-[20px] bg-Red100 py-2 px-6 cursor-pointer hover:bg-Red200 text-black hover:shadow-[0_8px_16px_rgba(219,0,0,0.5)] transition-all duration-300 ease-in-out ${className || ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
