import express from "express";
import { get } from "lodash";
import Folders from "../models/taskFolderModel";

const TaskFolderControl = {
    getAllFolders: async (req: express.Request, res: express.Response) => {
        try {
            const userId = get(req, "identity._id") as string;

            const allFolders = await Folders.getFoldersByUserId(userId).select("title description taskLists");

            return res.status(200).json(allFolders);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    createFolder: async (req: express.Request, res: express.Response) => {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const userId = get(req, "identity._id") as string;

            const newFolder = await Folders.createNewFolder({
                title,
                description,
                userId: userId,
            });

            const safeFolder = {
                _id: newFolder._id,
                title: newFolder.title,
                description: newFolder.description,
            };

            return res.status(201).json(safeFolder);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    updateFolder: async (req: express.Request, res: express.Response) => {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const { folderId } = req.params;
            const userId = get(req, "identity._id") as string;

            const updatedFolder = await Folders.updateFolderById(folderId, userId, {
                title,
                description,
            });

            return res.status(200).json(updatedFolder);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    deleteFolder: async (req: express.Request, res: express.Response) => {
        try {
            const { folderId } = req.params;
            const userId = get(req, "identity._id") as string;

            const deletedFolder = await Folders.deleteFolderById(folderId, userId);

            return res.status(200).json(deletedFolder);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },
};

export default TaskFolderControl;
