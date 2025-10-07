import express from "express";
import { tasks } from "../controllers/tasks";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
    router.get("/tasks", isAuthenticated, isOwner, tasks);
    router.post("/tasks", isAuthenticated, tasks);
    router.delete("/tasks/:id", isAuthenticated, isOwner, tasks);
    router.patch("/tasks/:id", isAuthenticated, isOwner, tasks);
};
