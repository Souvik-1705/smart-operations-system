import Task from "../models/Task.js";

//CREATE TASK
export const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo } = req.body;

        const task = await Task.create({
            title,
            description,
            assignedTo,
            createdBy: req.user._id,
        });
        //Log Activity
        await logActivity("Task Created", req.user._id, task._id);

        res.status(201).json({ message: "Task created", task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//GET ALL TASKS
export const getTasks = async (req, res) => {
    try {
        let tasks;
        if (req.user.role === "admin") {
            tasks = await Task.find().populate("assignedTo", "name email");
        }
        else if (req.user.role === "manager") {
            tasks = await Task.find({ createdBy: req.user._id });
        } else {
            tasks = await Task.find({ assignedTo: req.user._id });
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//UPDATE TASK
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Tssk not found" })
        }

        //PERMISSION CHECK
        if (req.user.role === "user" && task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not Allowed" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        //Log Activity
        await logActivity("Task Updated", req.user._id, task._id);

        res.json({ message: "Task Updated", updateTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}