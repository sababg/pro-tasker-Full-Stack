import mongoose from "mongoose";

export interface IPopulatedUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
}

export interface IProject extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId | IPopulatedUser;
  collaborators: (mongoose.Types.ObjectId | IPopulatedUser)[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema: mongoose.Schema<IProject> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
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

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
