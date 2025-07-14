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

  // service层中仅保存用户数据，因此未对userData中的敏感数据如password, email等进行加密
  async createUser(userData: IUserCreate): Promise<IUser> {
    return await User.create(userData);
  }
}
