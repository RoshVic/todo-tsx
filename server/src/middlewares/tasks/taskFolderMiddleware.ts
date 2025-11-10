import express from "express";
import { get } from "lodash";
import Folders from "../../models/tasks/taskFolderModel";

const FolderMiddleware = {
    isValid: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const currentUserId = get(req, "identity._id") as string;
            if (!currentUserId) {
                return res.sendStatus(400);
            }

            const currentFolderId = req.params.folderId;

            const currentFolder = await Folders.getFolderById(currentFolderId).select("+userId");

            const folderUserId = currentFolder.userId;
            if (currentUserId != folderUserId.toString()) {
                return res.sendStatus(401);
            }

            next();
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },
};

export default FolderMiddleware;
