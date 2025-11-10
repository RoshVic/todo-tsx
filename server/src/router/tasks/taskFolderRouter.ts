import express from "express";
import BasicMiddle from "../../middlewares";
import FolderMiddle from "../../middlewares/tasks/taskFolderMiddleware";
import FolderControl from "../../controllers/tasks/taskFolderController";

export default (router: express.Router) => {
    router.get("/tasks", BasicMiddle.isAuthenticated, FolderControl.getAllFolders);

    router.post("/tasks", BasicMiddle.isAuthenticated, FolderControl.createFolder);

    router.patch("/tasks/:folderId", BasicMiddle.isAuthenticated, FolderMiddle.isValid, FolderControl.updateFolder);

    router.delete("/tasks/:folderId", BasicMiddle.isAuthenticated, FolderMiddle.isValid, FolderControl.deleteFolder);
};
