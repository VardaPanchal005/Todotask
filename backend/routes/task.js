const router = require("express").Router();
const Task = require("../Model/task");
const User = require("../Model/user");
const authenticateToken = require("./auth");

router.post("/create-task", authenticateToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        const { id } = req.headers;

        const newTask = new Task({ title, description });
        const saveTask = await newTask.save();

        await User.findByIdAndUpdate(id, { $push: { tasks: saveTask._id } });

        res.status(200).json({ message: "Task Created" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.get("/get-all-tasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: 'tasks',
            options: { sort: { createdAt: -1 } }
        });
        res.status(200).json({ data: userData });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id; 
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.put("/update-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body; 
        await Task.findByIdAndUpdate(id, { title, description });
        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const taskData = await Task.findById(id);
        const completeTask = taskData.complete;
        await Task.findByIdAndUpdate(id, { complete: !completeTask });
        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.get("/get-complete-task/", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).populate({
            path: "tasks",
            match: { complete: true },
            options: { sort: { createdAt: -1 } }
        });
        const completeTaskData = data.tasks;
        res.status(200).json({ data: completeTaskData });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Internal server error" });
    }
});

router.get("/get-incomplete-task/", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).populate({
            path: "tasks",
            match: { complete: false },
            options: { sort: { createdAt: -1 } }
        });
        const incompleteTaskData = data.tasks;
        res.status(200).json({ data: incompleteTaskData });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Internal server error" });
    }
});

module.exports = router;
