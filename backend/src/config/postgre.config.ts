import { Sequelize } from "sequelize-typescript";
import { User } from "../model/user.model";
import { Room } from "../model/room.model";
import { RoomUser } from "../model/roomuser.model";
import { Message } from "../model/message.model";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USERNAME || "postgres",
  password: process.env.POSTGRES_PASSWORD || "",
  database: process.env.POSTGRES_DATABASE || "tsim_db",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  models: [User, Room, RoomUser, Message],
});

export default sequelize;
