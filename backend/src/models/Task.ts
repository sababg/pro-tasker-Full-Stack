import mongoose from "mongoose";

export interface ITask extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  collaborators: mongoose.Types.ObjectId[];
  status: "pending" | "in-Progress" | "completed" | "overdue";
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: mongoose.Schema<ITask> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Task name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-Progress", "completed", "overdue"],
      default: "pending",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
