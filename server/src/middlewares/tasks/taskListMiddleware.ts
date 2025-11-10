import express from "express";
import Lists from "../../models/tasks/taskListModel";

const ListMiddleware = {
    isValid: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const currentListId = req.params.listId;
            const currentList = await Lists.getListById(currentListId).select("+userId");

            const currentFolderId = req.params.folderId;
            const folderIdFromList = currentList.folderId;

            if (currentFolderId.toString() != folderIdFromList.toString()) {
                return res.sendStatus(400);
            }

            next();
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },
};

export default ListMiddleware;
