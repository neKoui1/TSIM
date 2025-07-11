export interface IMessage {
  id: string;
  content: string;
  type: "text" | "image" | "file" | "system";
  senderId: string;
  receiverId: string;
  isRead: boolean;
  createdAt: Date;
}

export interface IMessageCreate {
  content: string;
  type?: "text" | "image" | "file" | "system";
  senderId: string;
  receiverId: string;
}

export interface IMessageUpdate {
  content?: string;
  isRead?: boolean;
}
