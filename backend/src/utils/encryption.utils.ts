import bcrypt from "bcryptjs";

export class EncryptionUtil {
  private static readonly SALT_ROUNDS = 10;

  // 密码加密
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  // 密码验证
  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
