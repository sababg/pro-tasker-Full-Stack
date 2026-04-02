import * as React from "react";
import { type SubmitHandler, useForm, useWatch } from "react-hook-form";
import { api } from "../../clients/api";
import { useUser } from "../../context/UserContext";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface RegisterFormProps {
  handleClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
  });
  const [message, setMessage] = React.useState<string | null>(null);
  const { setUser } = useUser();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setMessage(null);
    try {
      const { data } = await api.post("/register", formData);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("token", data.token);

      setUser(data.user);

      setMessage("Registration successful");
      handleClose();
    } catch (err) {
      setMessage("Network error");
      console.error(err);
    }
  };

  const password = useWatch({
    control,
    name: "password",
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-start gap-5 w-[95%]"
      >
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: true })}
            placeholder="Enter your username"
            type="text"
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none ${errors.username ? "border-Red400" : ""}`}
          />
          {errors.username && (
            <span className="inline-block text-Red400">
              This field is required
            </span>
          )}
        </div>
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
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character",
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
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "confirmed Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
              minLength: {
                value: 6,
                message: "confirmed Password must be at least 6 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                message:
                  "confirmed Password must include uppercase, lowercase, number, and special character",
              },
            })}
            type="password"
            placeholder="Enter your password"
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none ${errors.confirmPassword ? "border-Red400" : ""}`}
          />
          {errors.confirmPassword && (
            <span className="inline-block text-Red400">
              {errors.confirmPassword.message}
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

export default RegisterForm;
