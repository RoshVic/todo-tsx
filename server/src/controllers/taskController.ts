import express from "express";
import { get } from "lodash";
import Tasks from "../models/taskModel";

const TaskControl = {
    getAllTasks: async (req: express.Request, res: express.Response) => {
        try {
            const { listId } = req.params;
            const userId = get(req, "identity._id") as string;

            const allTasks = await Tasks.getTasksByListId(listId, userId).select("title description completed");

            return res.status(200).json(allTasks);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    createTask: async (req: express.Request, res: express.Response) => {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const { listId } = req.params;
            const userId = get(req, "identity._id") as string;

            const newTask = await Tasks.createNewTask({
                title,
                description,
                userId,
                listId,
            });

            const safeTask = {
                _id: newTask._id,
                title: newTask.title,
                description: newTask.description,
                completed: newTask.completed,
                listId: newTask.listId,
            };

            return res.status(201).json(safeTask);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    updateTask: async (req: express.Request, res: express.Response) => {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const { taskId } = req.params;
            const userId = get(req, "identity._id") as string;

            const updatedTask = await Tasks.updateTaskById(taskId, userId, {
                title: title,
                description: description,
            });

            return res.status(200).json(updatedTask);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    deleteTask: async (req: express.Request, res: express.Response) => {
        try {
            const { taskId } = req.params;
            const userId = get(req, "identity._id") as string;

            const deletedTask = await Tasks.deleteTaskById(taskId, userId);

            return res.status(200).json(deletedTask);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },
};

export default TaskControl;
