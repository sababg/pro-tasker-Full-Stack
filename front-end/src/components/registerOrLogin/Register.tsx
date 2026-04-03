import * as React from "react";
import LoginPic from "../../assets/login.png";
import RegisterPic from "../../assets/register.png";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface RegisterProps {
  handleClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ handleClose }) => {
  const [isLogin, setIsLogin] = React.useState<boolean>(true);

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 w-full h-full min-h-120">
      <div className="w-full h-full relative">
        <div
          className={`w-full h-full transition-all duration-900 ease-in-out flex absolute  inset-0 sm:top-0 
          ${
            isLogin
              ? "translate-x-full opacity-0 z-0"
              : "translate-x-0 opacity-100 left-0 z-10"
          }`}
        >
          <RegisterForm handleClose={handleClose} />
        </div>
        <div
          className={`w-full h-full transition-all duration-900 ease-in-out absolute inset-0 top-0 flex items-start justify-end
          ${
            isLogin
              ? "sm:translate-x-full translate-x-0 opacity-100 sm:right-0 z-10"
              : "translate-x-0  opacity-0 z-0"
          }`}
        >
          <LoginForm handleClose={handleClose} />
        </div>
      </div>

      <div
        className={`w-full sm:h-full h-auto flex flex-col sm:items-center items-start justify-start mt-4 sm:justify-center sm:bg-Green200 bg-transparent py-3 transition-all duration-900 ease-in-out 
            ${isLogin ? "sm:-translate-x-full translate-x-0" : "translate-x-0"}`}
      >
        <div className="sm:flex hidden relative w-full h-full overflow-hidden items-center justify-center">
          <div
            className={`
                       sm:absolute relative inset-0 flex items-center justify-center h-full w-full
                        transition-transform duration-900 ease-in-out
                        ${isLogin ? "sm:-translate-x-full translate-x-0 opacity-0" : "translate-x-0 opacity-100"}
                      `}
          >
            <img src={RegisterPic} alt="Register" className="w-100 h-auto" />
          </div>

          <div
            className={`
                        sm:absolute relative inset-0 flex items-center justify-center h-full w-full
                        transition-transform duration-900 ease-in-out
                        ${isLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                      `}
          >
            <img src={LoginPic} alt="Login" className="w-100 h-auto" />
          </div>
        </div>
        <button
          className="bg-Green300 rounded-2xl px-4 py-2 cursor-pointer absolute bottom-5 left-1/2 transform -translate-x-1/2 sm:static sm:translate-x-0"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Register;
