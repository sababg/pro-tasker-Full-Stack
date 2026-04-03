import { NextFunction, Request, Response } from "express";
import Project, { IPopulatedUser } from "../models/Project";
import User from "../models/User";

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

const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "username email")
      .populate("collaborators", "username email");

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = req.user;

    const isOwner =
      (project.owner as IPopulatedUser)._id.toString() === user._id.toString();
    const isCollaborator = (project.collaborators as IPopulatedUser[]).some(
      (c) => c._id.toString() === user._id.toString(),
    );

    if (!isOwner && !isCollaborator) {
      res.status(403);
      throw new Error("Not authorized to view this project");
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

const addCollaborator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      res
        .status(403)
        .json({ message: "Only the project owner can add collaborators" });
      throw new Error("Only the project owner can add collaborators");
    }

    const { email } = req.body;
    const userToAdd = await User.findOne({ email });

    if (!userToAdd) {
      res.status(404).json({ message: "User with that email not found" });
      throw new Error("User with that email not found");
    }

    if (project.owner.toString() === userToAdd._id.toString()) {
      res
        .status(400)
        .json({ message: "Owner cannot be added as a collaborator" });
      throw new Error("Owner cannot be added as a collaborator");
    }

    if (project.collaborators.includes(userToAdd._id)) {
      res.status(400).json({ message: "User is already a collaborator" });
      throw new Error("User is already a collaborator");
    }

    project.collaborators.push(userToAdd._id);
    await project.save();

    res.json({ message: `${userToAdd.username} added as collaborator` });
  } catch (error) {
    next(error);
  }
};

const removeCollaborator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      res
        .status(403)
        .json({ message: "Only the project owner can add collaborators" });
      throw new Error("Only the project owner can add collaborators");
    }

    const { email } = req.body;
    const userToRemove = await User.findOne({ email });

    if (!userToRemove) {
      res.status(404).json({ message: "User with that email not found" });
      throw new Error("User with that email not found");
    }

    if (project.owner.toString() === userToRemove._id.toString()) {
      res
        .status(400)
        .json({ message: "Owner cannot be removed as a collaborator" });
      throw new Error("Owner cannot be removed as a collaborator");
    }

    if (!project.collaborators.includes(userToRemove._id)) {
      res.status(400).json({ message: "User is not a collaborator" });
      throw new Error("User is not a collaborator");
    }

    project.collaborators = project.collaborators.filter(
      (collaboratorId) =>
        collaboratorId.toString() !== userToRemove._id.toString(),
    );
    await project.save();

    res.json({ message: `${userToRemove.username} removed as collaborator` });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this project");
    }

    project.name = req.body.name || project.name;
    project.description =
      req.body.description !== undefined
        ? req.body.description
        : project.description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export default {
  createProject,
  getProjects,
  getProjectById,
  addCollaborator,
  removeCollaborator,
};
