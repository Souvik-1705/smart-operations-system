import ActivityLog from "../models/ActivityLog.js";

const logActivity = async (action, userId, taskId) => {
  try {
    await ActivityLog.create({
      action,
      user: userId,
      task: taskId,
    });
  } catch (error) {
    console.error("Log error:", error.message);
  }
};

export default logActivity;