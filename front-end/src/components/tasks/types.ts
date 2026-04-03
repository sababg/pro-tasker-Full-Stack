export interface ITasks {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  date: Date;
  project: IProject;
  assignedTo: IAssignedTo;
  status: TaskStatus;
}

export interface IProject {
  _id: string;
}

export interface IAssignedTo {
  _id: string;
  username: string;
  email: string;
}

export type TaskStatus = "To Do" | "In Progress" | "Done" | "overdue";
