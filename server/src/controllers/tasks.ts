import { get } from "lodash";
import {
    createNewTaskFolder,
    deleteTaskFolderById,
    getTaskFoldersByUserId,
    updateTaskFolderById,
} from "../db/tasks";
import express from "express";

export const getAllTaskFolders = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, "identity._id") as string;
        const taskFolders = await getTaskFoldersByUserId(userId);
        return res.status(200).json(taskFolders).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const createTaskFolder = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = get(req, "identity._id") as string;

        const { title, description, taskList } = req.body;
        if (!title || !description || !taskList) {
            return res
                .status(400)
                .json({ message: "Missing required fields" })
                .end();
        }

        const newTaskFolder = await createNewTaskFolder({
            title,
            description,
            taskList,
            userId: userId,
        });

        return res.status(201).json(newTaskFolder).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteTaskFolder = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const deletedTaskFolder = await deleteTaskFolderById(id);

        return res.json(deletedTaskFolder);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateTaskFolder = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;

        const { title, description, taskList } = req.body;
        if (!title || !description || !taskList) {
            return res
                .status(400)
                .json({ message: "Missing required fields" })
                .end();
        }

        const updatedTaskFolder = await updateTaskFolderById(id, {
            title,
            description,
            taskList,
        });

        return res.json(updatedTaskFolder);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
