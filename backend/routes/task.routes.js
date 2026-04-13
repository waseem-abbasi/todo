import express from 'express';
const router = express.Router();

import createtask from '../models/task.model.js';

// create task
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;

        const newTask = { title, description };

        console.log("newtask", newTask)

        const response = await createtask.createtask(newTask);

        console.log("response", response)

        res.status(201).json({
            success: true,
            message: "Task Created Successfully",
            data: response,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "server error"
        });
    }
});

//fetch task
router.get("/", async (req, res) => {
    try {
        const task = await createtask.getAll()
        console.log("taskes-->>", task)
        res.json(task)
    } catch (err) {
        res.status(500).json({ error: "Server error: " + err.message });
    }

})
//multiple delete
router.delete("/delete-multiple", async (req, res) => {
    try {
        const { ids } = req.body;   // expect: { ids: [1,2,3] }

        console.log("delete ids", ids);

        if (!ids || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No IDs provided"
            });
        }

        const deletedTasks = await createtask.deleteMultipleTasks(ids);

        res.json({
            success: true,
            message: "Multiple tasks deleted successfully",
            data: deletedTasks
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
});
//delete task
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("delete id", id)
    try {
        const deleteTask = await createtask.deleteTask(id)
        console.log("delete task", deleteTask)
        if (!deleteTask) {
            return res.status(404).json({
                success: false,
                message: "Task not Found",
            });
        }
        res.json({
            success: true,
            mask: "Task delete Succefully",
            data: deleteTask
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }

})

//update task by id
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    console.log("id",id)
    console.log("description-->",description)
    console.log()

    try {
        const updatedTaskData = {
            title,
            description,
        };
        const updateTask = createtask.updateTask(id,updatedTaskData )
        if (!updateTask) {
            return res.status(404).json({
                success: false,
                message: "Task not Found",
            });
        }
        console.log("update task",updateTask)
        res.json({
            success: true,
            message: "task update succefully",
            data: updateTask
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "internal server error",err
        })
    }
})
export default router;