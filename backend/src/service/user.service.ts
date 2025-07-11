import { User } from "../model/user.model";
import { IUser, IUserCreate, IUserUpdate } from "../interface/user.interface";
import { EncryptionUtil } from "../utils/encryption.utils";

export class UserService {
  async findUserById(id: string): Promise<IUser | null> {
    return await User.findByPk(id);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async findAllUsers(): Promise<IUser[]> {
    return await User.findAll();
  }

  async createUser(userData: IUserCreate): Promise<IUser> {}
}
