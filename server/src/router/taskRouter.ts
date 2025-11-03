import express from "express";
import Tasks from "../controllers/taskController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.get("/tasks/:folderId/:listId", isAuthenticated, Tasks.getAllTasks);

    router.post("/tasks/:folderId/:listId", isAuthenticated, Tasks.createTask);

    router.patch("/tasks/:folderId/:listId/:taskId", isAuthenticated, Tasks.updateTask);

    router.delete("/tasks/:folderId/:listId/:taskId", isAuthenticated, Tasks.deleteTask);
};
