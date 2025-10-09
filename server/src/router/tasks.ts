import express from "express";
import { getAllTaskFolders, createTaskFolder } from "../controllers/tasks";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.get("/tasks/:sessionToken", getAllTaskFolders);
    router.post("/tasks/:sessionToken", createTaskFolder);
    // router.delete("/tasks/:sessionToken/:folderId");
    // router.patch("/tasks/:sessionToken/:folderId");
};
