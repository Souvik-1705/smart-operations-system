import ActivityLog from "../models/ActivityLog.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email")
      .populate("task", "title");

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};