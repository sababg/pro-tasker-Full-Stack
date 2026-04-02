export interface IProjects {
  name: string;
  description: string;
  owner: IOwner[];
  collaborators: ICollaborator[];
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOwner {
  _id: string;
  username: string;
  email: string;
}

export interface ICollaborator {
  _id: string;
  username: string;
  email: string;
}
