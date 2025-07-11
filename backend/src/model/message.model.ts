import {
  DataType,
  Table,
  Column,
  Model,
  ForeignKey,
  CreatedAt,
  BelongsTo,
} from "sequelize-typescript";
import { IMessage, IMessageCreate } from "../interface/message.interface";
import { User } from "./user.model";

@Table({
  tableName: "messages",
  timestamps: true,
})
export class Message
  extends Model<IMessage, IMessageCreate>
  implements IMessage
{
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.ENUM("text", "image", "file", "system"),
    defaultValue: "text",
  })
  type!: "text" | "image" | "file" | "system";

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  senderId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  receiverId!: string;

  @BelongsTo(() => User, "senderId")
  sender!: User;

  @BelongsTo(() => User, "receiverId")
  receiver!: User;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isRead!: boolean;

  @CreatedAt
  createdAt!: Date;
}
