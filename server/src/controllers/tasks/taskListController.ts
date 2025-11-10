import express from "express";
import { get } from "lodash";
import Lists from "../../models/tasks/taskListModel";
import Tasks from "../../models/tasks/taskModel";

const TaskListControl = {
    getAllLists: async (req: express.Request, res: express.Response) => {
        try {
            const { folderId } = req.params;

            const allLists = await Lists.getListsByFolderId(folderId);

            return res.status(200).json(allLists);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    createList: async (req: express.Request, res: express.Response) => {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const { folderId } = req.params;
            const userId = get(req, "identity._id") as string;

            const newList = await Lists.createNewList({
                title,
                description,
                userId,
                folderId,
            });

            const safeList = {
                _id: newList._id,
                title: newList.title,
                description: newList.description,
                folderId: newList.folderId,
            };

            return res.status(201).json(safeList);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    updateList: async (req: express.Request, res: express.Response) => {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const { listId } = req.params;

            const updatedList = await Lists.updateListById(listId, {
                title,
                description,
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

            const deletedList = await Lists.deleteListById(listId);

            await Tasks.deleteTasksByListId(listId);

            return res.status(200).json(deletedList);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },
};

export default TaskListControl;
