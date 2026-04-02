import * as React from "react";

interface NavbarProps {
  setIsRegisterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setIsRegisterOpen }) => {
  return (
    <nav className="flex items-center justify-between bg-white px-3 py-3.5">
      <div className="flex items-center justify-start">
        <button
          onClick={() => setIsRegisterOpen((prev) => !prev)}
          className="cursor-pointer bg-Green100 text-black px-4 py-2 rounded"
        >
          Register/Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
