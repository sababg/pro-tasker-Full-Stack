import { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

const getAuthorizedProject = async (
  projectId: string,
  userId: string,
  ownerOnly = false,
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const isOwner = project.owner.toString() === userId.toString();
  const isCollaborator = project.collaborators.some(
    (c) => c.toString() === userId.toString(),
  );

  if (ownerOnly && !isOwner) {
    throw new AppError(
      "Not authorized. Only the project owner can do this.",
      403,
    );
  }

  if (!ownerOnly && !isOwner && !isCollaborator) {
    throw new AppError("Not authorized to access this project", 403);
  }

  return project;
};

const getProjectUsers = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const project = await getAuthorizedProject(req.params.id, req.user._id);

    const populated = await project.populate([
      { path: "owner", select: "username email" },
      { path: "collaborators", select: "username email" },
    ]);

    const users = [populated.owner, ...populated.collaborators];

    res.json({ users });
  } catch (err) {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await getAuthorizedProject(req.params.id, req.user._id, true);

    const { title, description, status, date, assignedTo } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      date,
      assignedTo,
      project: req.params.id,
    });
    res.status(201).json(task);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.error("Unknown error");
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await getAuthorizedProject(req.params.id, req.user._id, false);

    const tasks = await Task.find({ project: req.params.id })
      .sort({
        createdAt: -1,
      })
      .populate("assignedTo", "username email");

    res.json(tasks);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.error("Unknown error");
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await getAuthorizedProject(req.params.id, req.user._id, false);

    const tasks = await Task.findById(req.params.taskId).populate(
      "assignedTo",
      "username email",
    );

    if (!tasks) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.json(tasks);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.error("Unknown error");
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await getAuthorizedProject(req.params.id, req.user._id, true);

    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      project: req.params.id,
    });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.json({ message: "Task removed successfully" });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.error("Unknown error");
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export default {
  createTask,
  getProjectUsers,
  getTasks,
  getTaskById,
  deleteTask,
};
