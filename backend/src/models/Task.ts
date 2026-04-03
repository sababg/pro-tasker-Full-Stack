import mongoose from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  date: Date;
  project: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  status: "To Do" | "In Progress" | "Done" | "overdue";
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: mongoose.Schema<ITask> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      trim: true,
      default: new Date(),
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done", "overdue"],
      default: "To Do",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
