import bcrypt from "bcryptjs"
import { UserModel } from "../users/user.model.js";
import pool from "../../config/db.js";

const seedUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await UserModel.create({
      name: "Admin",
      email: "admin@gmaill.com",
      password: hashedPassword,
      role: "ADMIN",
    });

    await UserModel.create({
      name: "Member One",
      email: "member1@gmail.com",
      password: hashedPassword,
      role: "MEMBER",
    });

    await UserModel.create({
      name: "Member Two",
      email: "member2@gmail.com",
      password: hashedPassword,
      role: "MEMBER",
    });

    console.log("Users seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers()
