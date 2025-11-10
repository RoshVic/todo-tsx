import express from "express";
import Users from "../models/userModel";
import Folders from "../models/tasks/taskFolderModel";
import Lists from "../models/tasks/taskListModel";
import Tasks from "../models/tasks/taskModel";

const UserControl = {
    getAllUsers: async (req: express.Request, res: express.Response) => {
        try {
            const users = await Users.getUsers();

            return res.status(200).json(users);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    updateUser: async (req: express.Request, res: express.Response) => {
        try {
            const { username } = req.body;
            if (!username) {
                return res.status(400).json({ message: "Username is required" });
            }

            const { userId } = req.params;

            const updatedUser = await Users.updateUserById(userId, { username });

            const safeUser = {
                email: updatedUser.email,
                username: updatedUser.username,
            };

            console.log(updatedUser._id);
            return res.status(200).json(safeUser);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    deleteUser: async (req: express.Request, res: express.Response) => {
        try {
            const { userId } = req.params;

            const deletedUser = await Users.deleteUserById(userId);

            const foldersFromUser = await Folders.getFoldersByUserId(userId);

            foldersFromUser.forEach(async (folder) => {
                const folderId = folder._id.toString();

                await Folders.deleteFolderById(folderId);

                const listsFromFolder = await Lists.getListsByFolderId(folderId);

                listsFromFolder.forEach(async (list) => {
                    const listId = list._id.toString();

                    await Lists.deleteListById(listId);
                    await Tasks.deleteTasksByListId(listId);
                });
            });

            const safeUser = {
                email: deletedUser.email,
                username: deletedUser.username,
            };

            console.log(deletedUser._id);
            return res.status(200).json(safeUser);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },
};

export default UserControl;
