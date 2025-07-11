export interface IRoom {
  id: string;
  name: string;
  description?: string;
  type: "private" | "group";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoomCreate {
  name: string;
  description?: string;
  type?: "private" | "group";
  avatar?: string;
}

export interface IRoomUpdate {
  name?: string;
  description?: string;
  avatar?: string;
}
