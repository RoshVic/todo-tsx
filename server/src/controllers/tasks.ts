import { createNewTaskFolder, getTaskFoldersByUserId } from "../db/tasks";
import { getUserBySessionToken } from "../db/users";
import express from "express";

export const getAllTaskFolders = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { sessionToken } = req.params;

        const user = await getUserBySessionToken(sessionToken);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = user._id.toString();
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
        const { sessionToken } = req.params;

        const user = await getUserBySessionToken(sessionToken);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = user._id.toString();

        const { title, folderId, description, taskList } = req.body;
        if (!title || !folderId || !description || !taskList) {
            return res
                .status(400)
                .json({ message: "Missing required fields" })
                .end();
        }

        const newTaskFolder = await createNewTaskFolder({
            title,
            folderId,
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
