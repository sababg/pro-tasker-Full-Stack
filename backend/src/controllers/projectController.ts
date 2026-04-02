import { Request, Response } from "express";
import Project from "../models/Project";

const createProject = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
    });
    res.status(201).json(project);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.error("Unknown error");
      res.status(400).json({ message: "Something went wrong" });
    }
  }
};

const getProjects = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { collaborators: req.user._id }],
    })
      .sort({ createdAt: -1 })
      .populate("owner", "username email");

    res.json(projects);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ message: error.message });
    } else {
      console.error("Unknown error");
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default {
  createProject,
  getProjects,
};
