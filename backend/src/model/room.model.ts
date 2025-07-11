import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { IRoom, IRoomCreate } from "../interface/room.interface";
import { User } from "./user.model";
import { RoomUser } from "./roomuser.model";

@Table({
  tableName: "rooms",
  timestamps: true,
})
export class Room extends Model<IRoom, IRoomCreate> implements IRoom {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.ENUM("private", "group"),
    defaultValue: "private",
  })
  type!: "private" | "group";

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  avatar?: string;

  @BelongsToMany(() => User, () => RoomUser)
  users!: User[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
