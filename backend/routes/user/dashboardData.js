import express from 'express';
import auth from '../../middlewares/auth.js';
import { getUserDashboardData } from "../../utils/getDashboardData.js";


const router = express.Router();
router.get('/', auth, async (req, res) => {
  const userId = req.userId

  try {
    const data = await getUserDashboardData(userId);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
})
export default router;
