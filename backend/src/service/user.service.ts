import { User } from "../model/user.model";
import { IUser, IUserCreate, IUserUpdate } from "../interface/user.interface";
import { EncryptionUtil } from "../utils/encryption.utils";

export class UserService {
  async findUserById(id: string): Promise<IUser | null> {
    if (!id) {
      throw new Error("Invalid user ID.");
    }
    return await User.findByPk(id);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    if (!email) {
      throw new Error("Invalid email.");
    }
    const hashedEmail = await EncryptionUtil.hashEmail(
      email.toLowerCase().trim()
    );
    return await User.findOne({
      where: {
        email: hashedEmail,
      },
    });
  }

  async findAllUsers(): Promise<IUser[]> {
    return await User.findAll();
  }

  async createUser(userData: IUserCreate): Promise<IUser> {
    // 检查用户是否存在
    const existingUser = await this.findUserByEmail(
      await EncryptionUtil.hashEmail(userData.email.toLowerCase().trim())
    );
    if (existingUser) {
      throw new Error("User already exists.");
    }
    // 密码加密
    const hashedPassword = await EncryptionUtil.hashPassword(userData.password);
    // 邮箱哈希
    const hashedEmail = await EncryptionUtil.hashEmail(userData.email);
    // 创建用户
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
      email: hashedEmail,
    });

    return newUser;
  }

  async updateUser(id: string, userData: IUserUpdate): Promise<IUser> {
    if (!id) {
      throw new Error("Invalid user ID");
    }
    const user = (await User.findByPk(id)) as User;
    if (!user) {
      throw new Error("User not found");
    }
    if (userData.password) {
      userData.password = await EncryptionUtil.hashPassword(userData.password);
    }
    if (userData.email) {
      userData.email = await EncryptionUtil.hashEmail(userData.email);
    }
    return await user.update(userData);
  }

  async deleteUser(id: string): Promise<void> {
    if (!id) {
      throw new Error("Invalid user ID");
    }
    const user = (await User.findByPk(id)) as User;
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
  }

  async isUserExists(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);
    return !!user;
  }

  async findUserByUsername(username: string): Promise<IUser | null> {
    if (!username) {
      throw new Error("Invalid username");
    }
    return await User.findOne({
      where: {
        username: username,
      },
    });
  }

  async validateUserCredentials(
    email: string,
    password: string
  ): Promise<IUser | null> {
    if (!email || !password) {
      throw new Error("Invalid email or password");
    }
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isValidPassword = await EncryptionUtil.comparePassword(
      password,
      user.password
    );
    return isValidPassword ? user : null;
  }

  async deleteUserByIds(ids: string[]): Promise<number> {
    if (!ids || ids.length === 0) {
      throw new Error("Invalid user IDs");
    }
    const result = await User.destroy({
      where: {
        id: ids,
      },
    });
    return result;
  }

  async findUserByPagination(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    users: IUser[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      users: rows,
      total: count,
      page: page,
      totalPages: Math.ceil(count / limit),
    };
  }
}
