import express from "express";
import auth from "../../middlewares/auth.js";
import prisma from "../../prisma/client.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const isAdmin = req.isAdmin;
  const adminId = req.userId;
  if (!isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (currentPassword === newPassword) {
      return res
        .status(400)
        .json({
          message: "New password cannot be the same as current password",
        });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters long" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        password: hashedNewPassword,
      },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error changing admin password:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
