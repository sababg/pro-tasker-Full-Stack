import * as React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { api } from "../../clients/api";
import { useUser } from "../../context/UserContext";

type Inputs = {
  email: string;
  password: string;
};

interface LoginFormProps {
  handleClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleClose }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
  });
  const [message, setMessage] = React.useState<string | null>(null);
  const { setUser } = useUser();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setMessage(null);
    try {
      const { data } = await api.post("/login", formData);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      setUser(data.user);
      setMessage("Login successful");
      handleClose();
      navigate("/projects");
    } catch (err) {
      setMessage("Network error");
      console.error(err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-start gap-5 w-[95%]"
      >
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            placeholder="Enter your email"
            type="email"
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none ${errors.email ? "border-Red400" : ""}`}
          />
          {errors.email && (
            <span className="inline-block text-Red400">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Enter your password"
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none ${errors.password ? "border-Red400" : ""}`}
          />
          {errors.password && (
            <span className="inline-block text-Red400">
              {errors.password.message}
            </span>
          )}
        </div>

        <input
          type="submit"
          className="border border-Green400 px-3 py-2 rounded-2xl cursor-pointer"
        />
        {message && <div className="mt-2 text-sm">{message}</div>}
      </form>
    </>
  );
};

export default LoginForm;
