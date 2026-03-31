import * as React from "react";
import LoginPic from "../../assets/login.png";
import RegisterPic from "../../assets/register.png";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Register: React.FC = () => {
  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  return (
    <div className="grid grid-cols-2 w-full h-full min-h-120">
      <div className="w-full h-full relative">
        <div
          className={`w-full h-full transition-all duration-900 ease-in-out flex absolute inset-0 top-0
          ${
            isLogin
              ? "translate-x-full opacity-0"
              : "translate-x-0 opacity-100 left-0"
          }`}
        >
          <RegisterForm />
        </div>
        <div
          className={`w-full h-full transition-all duration-900 ease-in-out absolute inset-0 top-0 flex items-start justify-end  
          ${
            isLogin
              ? "translate-x-full opacity-100 right-0"
              : "translate-x-0  opacity-0"
          }`}
        >
          <LoginForm />
        </div>
      </div>

      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-Green200 py-3 transition-all duration-900 ease-in-out 
            ${isLogin ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            className={`
                       absolute inset-0 flex items-center justify-center h-full w-full
                        transition-transform duration-900 ease-in-out
                        ${isLogin ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}
                      `}
          >
            <img src={RegisterPic} alt="Register" className="w-100 h-auto" />
          </div>

          <div
            className={`
                        absolute inset-0 flex items-center justify-center h-full w-full
                        transition-transform duration-900 ease-in-out
                        ${isLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                      `}
          >
            <img src={LoginPic} alt="Login" className="w-100 h-auto" />
          </div>
        </div>
        <button
          className="bg-Green300 rounded-2xl px-4 py-2 cursor-pointer"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Register;
