export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IUserUpdate {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
  isOnline?: boolean;
}
