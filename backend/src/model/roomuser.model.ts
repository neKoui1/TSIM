import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { Room } from "./room.model";
import { User } from "./user.model";
import { IRoomUser, IRoomUserCreate } from "../interface/roomuser.interface";

// 群组和用户的关系表
@Table({
  tableName: "room_users",
  timestamps: true,
})
export class RoomUser
  extends Model<IRoomUser, IRoomUserCreate>
  implements IRoomUser
{
  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  roomId!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @Column({
    type: DataType.ENUM("owner", "admin", "member"),
    defaultValue: "member",
  })
  role!: "owner" | "admin" | "member";

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
