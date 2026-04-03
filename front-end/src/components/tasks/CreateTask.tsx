import * as React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { api, apiWithCallback } from "../../clients/api";
import {
  GreenContainedButton,
  RedContainedButton,
} from "../utils/button/Button";
import { dateIsValid } from "../utils/dateIsValid/DateIsValid";
import type { IAssignedTo, ITasks, TaskStatus } from "./types";

type Inputs = {
  title: string;
  assignedTo: string;
  description: string;
  status: TaskStatus;
  date: Date;
};

interface CreateTaskProps {
  task?: ITasks;
  onClose: () => void;
  onSuccess?: () => Promise<void>;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  task,
  onClose,
  onSuccess,
}) => {
  const { id } = useParams();

  const [users, setUsers] = React.useState<IAssignedTo[]>([]);
  const [message, setMessage] = React.useState<string | null>(null);

  const fetchUserData = React.useCallback(async () => {
    try {
      const { data } = await api.get(`/projects/${id}/users`);
      setUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  React.useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
      assignedTo: "",
      date: new Date(),
    },
  });

  React.useEffect(() => {
    if (task && users.length > 0) {
      setValue("title", task.title || "");
      setValue("description", task.description || "");
      setValue("status", task.status || "To Do");
      setValue("assignedTo", task.assignedTo._id?.toString() || "");
      setValue(
        "date",
        task.date
          ? (new Date(task.date).toISOString().split("T")[0] as unknown as Date)
          : new Date(),
      );
    }
  }, [task, users, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      if (task) {
        await apiWithCallback(
          () => api.put(`/projects/${id}/task`, formData),
          () => onSuccess?.(),
        );
        setMessage("Project updated successfully");
        onClose();
      } else {
        await apiWithCallback(
          () =>
            api.post(`/projects/${id}/task`, {
              ...formData,
              status: dateIsValid(formData.date) ? "overdue" : formData.status,
            }),
          () => onSuccess?.(),
        );
        setMessage("Project created successfully");
        onClose();
      }
      reset();
    } catch (err) {
      setMessage("Network error");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-h-[90%] overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex overflow-auto flex-col items-start justify-start gap-7 w-full bg-white rounded-xl sm:p-5 p-0`}
      >
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="title">Title</label>
          <input
            {...register("title", { required: true })}
            placeholder="Enter task title"
            type="text"
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none ${errors.title ? "border-Red400" : ""}`}
          />
          {errors.title && (
            <span className="inline-block text-Red400">
              This field is required
            </span>
          )}
        </div>

        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="assignedTo">Assigned To</label>
          <select
            {...register("assignedTo", { required: true })}
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none bg-white ${errors.assignedTo ? "border-Red400" : ""}`}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username} — {user.email}
              </option>
            ))}
          </select>
          {errors.assignedTo && (
            <span className="inline-block text-Red400">
              Please assign a user
            </span>
          )}
        </div>

        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="date">Deadline</label>
          <input
            {...register("date", { required: true })}
            type="date"
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none ${errors.date ? "border-Red400" : ""}`}
          />
          {errors.date && (
            <span className="inline-block text-Red400">
              Deadline is required
            </span>
          )}
        </div>

        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="status">Status</label>
          <select
            {...register("status", { required: true })}
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none bg-white ${errors.status ? "border-Red400" : ""}`}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            {task && <option value="overdue">Overdue</option>}
          </select>
          {errors.status && (
            <span className="inline-block text-Red400">Status is required</span>
          )}
        </div>
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description")}
            placeholder="Enter task description"
            rows={5}
            className={`w-full border-Green400 border border-solid px-3 py-2 rounded-xl outline-none ${errors.description ? "border-Red400" : ""}`}
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <GreenContainedButton text={task ? "Update" : "Add"} type="submit" />
          <RedContainedButton text="Cancel" type="button" onClick={onClose} />
        </div>

        {message && <div className="mt-2 text-sm">{message}</div>}
      </form>
    </div>
  );
};

export default CreateTask;
