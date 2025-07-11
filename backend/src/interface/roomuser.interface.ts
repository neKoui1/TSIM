export interface IRoomUser {
  roomId: string;
  userId: string;
  role: "owner" | "admin" | "member";
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoomUserCreate {
  roomId: string;
  userId: string;
  role?: "owner" | "admin" | "member";
}
