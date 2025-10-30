import { get } from "lodash";
import { TaskFolderDB, TaskListDB, TaskDB } from "../db/tasks";
import express from "express";

// Task Folders
export const TaskFolderControl = {
    getAllFolders: async (req: express.Request, res: express.Response) => {
        try {
            const userId = get(req, "identity._id") as string;
            const taskFolders = await TaskFolderDB.getFoldersByUserId(userId);
            return res.status(200).json(taskFolders).end();
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },

    createFolder: async (req: express.Request, res: express.Response) => {
        try {
            const userId = get(req, "identity._id") as string;

            const { title, description, lists } = req.body;
            if (!title || !description) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" })
                    .end();
            }

            const newFolder = await TaskFolderDB.createNewFolder({
                title,
                description,
                lists,
                userId: userId,
            });

            return res.status(201).json(newFolder).end();
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },

    updateFolder: async (req: express.Request, res: express.Response) => {
        try {
            const { folderId } = req.params;

            const { title, description, lists } = req.body;
            if (!title || !description) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" })
                    .end();
            }

            const updatedFolder = await TaskFolderDB.updateFolderById(
                folderId,
                {
                    title,
                    description,
                    lists,
                }
            );

            return res.status(200).json(updatedFolder);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },

    deleteFolder: async (req: express.Request, res: express.Response) => {
        try {
            const { folderId } = req.params;
            const deletedFolder = await TaskFolderDB.deleteFolderById(folderId);

            return res.status(200).json(deletedFolder);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },
};

// Task Lists
export const TaskListControl = {
    getAllLists: async (req: express.Request, res: express.Response) => {
        try {
            const { folderId } = req.params;
            const lists = await TaskListDB.getListsByFolderId(folderId);

            return res.status(200).json(lists).end();
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },

    createList: async (req: express.Request, res: express.Response) => {
        try {
            const { folderId } = req.params;

            const { title, description, tasks } = req.body;
            if (!title || !description) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" })
                    .end();
            }

            const newList = await TaskListDB.createNewList({
                title,
                description,
                tasks,
                folderId: folderId,
            });

            return res.status(201).json(newList).end();
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },

    updateList: async (req: express.Request, res: express.Response) => {
        try {
            const { listId } = req.params;

            const { title, description, tasks } = req.body;
            if (!title || !description) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" })
                    .end();
            }

            const updatedList = await TaskListDB.updateListById(listId, {
                title,
                description,
                tasks,
            });

            return res.status(200).json(updatedList);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },

    deleteList: async (req: express.Request, res: express.Response) => {
        try {
            const { listId } = req.params;
            const deletedTaskFolder = await TaskListDB.deleteListById(listId);

            return res.status(200).json(deletedTaskFolder);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },
};

// Tasks
export const TaskControl = {
    getAllTasks: async (req: express.Request, res: express.Response) => {
        try {
            const { listId } = req.params;
            const tasks = await TaskDB.getTasksByListId(listId);

            return res.status(200).json(tasks).end();
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },

    createTask: async (req: express.Request, res: express.Response) => {
        try {
            const { listId } = req.params;

            const { title, description } = req.body;
            if (!title || !description) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" })
                    .end();
            }

            const newTask = await TaskDB.createNewTask({
                title,
                description,
                listId: listId,
            });

            return res.status(201).json(newTask).end();
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },

    updateTask: async (req: express.Request, res: express.Response) => {
        try {
            const { taskId } = req.params;

            const { title, description } = req.body;
            if (!title || !description) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" })
                    .end();
            }

            const updatedTask = await TaskDB.updateTaskById(taskId, {
                title,
                description,
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
            const deletedFolder = await TaskDB.deleteTaskById(taskId);

            return res.status(200).json(deletedFolder);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    },
};
