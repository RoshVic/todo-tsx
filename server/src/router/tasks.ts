import express from "express";
import { isAuthenticated } from "../middlewares";
import {
    getAllTaskFolders,
    createTaskFolder,
    deleteTaskFolder,
    updateTaskFolder,
} from "../controllers/tasks";

export default (router: express.Router) => {
    router.get("/tasks", isAuthenticated, getAllTaskFolders);
    router.post("/tasks", isAuthenticated, createTaskFolder);
    router.delete("/tasks/:id", isAuthenticated, deleteTaskFolder);
    router.patch("/tasks/:id", isAuthenticated, updateTaskFolder);
};
