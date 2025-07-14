import { EncryptionUtil } from "../../utils/encryption.utils";

describe("EncryptionUtil", () => {
  describe("hashPassword", () => {
    it("should hash password correctly", async () => {
      const password = "testpassword";
      const hashPassword = await EncryptionUtil.hashPassword(password);

      expect(hashPassword).toBeDefined();
      expect(typeof hashPassword).toBe("string");
      expect(hashPassword.length).toBeGreaterThan(0);
      expect(hashPassword).not.toBe(password);
    });

    it("generate different hashes for same password", async () => {
      const password = "testpassword";
      const hash1 = await EncryptionUtil.hashPassword(password);
      const hash2 = await EncryptionUtil.hashPassword(password);
      console.log("hash1 = ", hash1);
      console.log("hash2 = ", hash2);
      const isMatch1 = await EncryptionUtil.comparePassword(password, hash1);
      const isMatch2 = await EncryptionUtil.comparePassword(password, hash2);
      expect(hash1).not.toBe(hash2);
      expect(isMatch1).toBe(true);
      expect(isMatch2).toBe(true);
    });

    it("compare password correctly", async () => {
      const password = "testpassword";
      const hashPassword = await EncryptionUtil.hashPassword(password);
      const isMatch = await EncryptionUtil.comparePassword(
        password,
        hashPassword
      );

      expect(typeof isMatch).toBe("boolean");
      expect(isMatch).toBe(true);
    });

    it("compare password mismatch", async () => {
      const password = "testpassword";
      const hashPassword2 = await EncryptionUtil.hashPassword("wrongpassword");

      const isMatch = await EncryptionUtil.comparePassword(
        password,
        hashPassword2
      );
      expect(typeof isMatch).toBe("boolean");
      expect(isMatch).toBe(false);
    });
  });
});
