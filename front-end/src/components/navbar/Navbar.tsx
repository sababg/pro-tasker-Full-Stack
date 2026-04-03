import * as React from "react";
import { NavLink } from "react-router";
import { useUser } from "../../context/UserContext";
import DropDown from "../utils/dropDown/DropDown";

interface NavbarProps {
  setIsRegisterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setIsRegisterOpen }) => {
  const { user, logout } = useUser();

  return (
    <nav className="flex items-center justify-between bg-white px-3 py-3.5 h-[8%] w-full z-20">
      <div>LOGO</div>
      {user && (
        <div className="sm:flex hidden items-baseline justify-center gap-10">
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "font-bold border-b-2 border-solid border-b-Green400 pb-2"
                : ""
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/create-project"
            className={({ isActive }) =>
              isActive
                ? "font-bold border-b-2 border-solid border-b-Green400 pb-2"
                : ""
            }
          >
            Create Project
          </NavLink>
        </div>
      )}

      {user ? (
        <>
          <DropDown
            title={user.username || ""}
            menuItems={[
              { label: "Create Project", href: "/create-project" },
              { label: "Projects", href: "/projects" },
              { label: "Logout", onClick: () => logout() },
            ]}
          />
        </>
      ) : (
        <div className="flex items-center justify-start">
          <button
            onClick={() => setIsRegisterOpen((prev) => !prev)}
            className="cursor-pointer bg-Green100 text-black px-4 py-2 rounded"
          >
            Register/Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
