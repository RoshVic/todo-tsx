import express from "express";
import Folders from "../controllers/taskFolderController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.get("/tasks", isAuthenticated, Folders.getAllFolders);

    router.post("/tasks", isAuthenticated, Folders.createFolder);

    router.patch("/tasks/:folderId", isAuthenticated, Folders.updateFolder);

    router.delete("/tasks/:folderId", isAuthenticated, Folders.deleteFolder);
};
