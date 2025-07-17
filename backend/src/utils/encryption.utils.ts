import bcrypt from "bcryptjs";
import crypto from "crypto";

export class EncryptionUtil {
  private static readonly SALT_ROUNDS = 10;
  private static readonly EMAIL_SALT = "email-salt";

  // 密码哈希
  // 使用bcryptjs库进行密码加密，每次加密都会生成不同的hash值
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

  // 邮箱哈希
  static async hashEmail(email: string): Promise<string> {
    const normalizedEmail = email.toLowerCase().trim();
    return crypto
      .createHash("sha256")
      .update(normalizedEmail + this.EMAIL_SALT)
      .digest("hex");
  }

  // 邮箱验证
  static async compareEmail(
    email: string,
    hashedEmail: string
  ): Promise<boolean> {
    const hash = await this.hashEmail(email.toLowerCase().trim());
    return hash === hashedEmail;
  }
}
