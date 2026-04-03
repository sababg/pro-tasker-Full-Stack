import * as React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { api, apiWithCallback } from "../../clients/api";
import {
  GreenContainedButton,
  RedContainedButton,
} from "../utils/button/Button";
import type { IProjects } from "./types";

type Inputs = {
  name: string;
  description: string;
};

interface CreateProjectProps {
  project?: IProjects;
  onClose?: () => void;
  onSuccess?: () => Promise<void>;
}

const CreateProject: React.FC<CreateProjectProps> = ({
  project,
  onClose,
  onSuccess,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
    },
  });

  const [message, setMessage] = React.useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      if (project) {
        await apiWithCallback(
          () => api.put(`/projects/${project._id}`, formData),
          () => onSuccess?.(),
        );
        setMessage("Project updated successfully");
        onClose?.();
      } else {
        await api.post("/projects", formData);
        setMessage("Project created successfully");
      }
      reset();
    } catch (err) {
      setMessage("Network error");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col items-start justify-start gap-7 ${project ? "w-full" : "sm:w-[50%] w-[90%]"} bg-white rounded-xl sm:p-5 p-0`}
      >
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="Enter project name"
            type="text"
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none ${errors.name ? "border-Red400" : ""}`}
          />
          {errors.name && (
            <span className="inline-block text-Red400">
              This field is required
            </span>
          )}
        </div>

        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description")}
            placeholder="Enter project description"
            rows={10}
            cols={50}
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none ${errors.description ? "border-Red400" : ""}`}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <GreenContainedButton text="Add" type="submit" />
          <RedContainedButton
            text="Cancel"
            type="button"
            onClick={() => (project ? onClose?.() : navigate(-1))}
          />
        </div>
        {message && <div className="mt-2 text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default CreateProject;
