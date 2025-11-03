import express from "express";
import Lists from "../controllers/taskListController";
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) => {
    router.get("/tasks/:folderId", isAuthenticated, Lists.getAllLists);

    router.post("/tasks/:folderId", isAuthenticated, Lists.createList);

    router.patch("/tasks/:folderId/:listId", isAuthenticated, Lists.updateList);

    router.delete("/tasks/:folderId/:listId", isAuthenticated, Lists.deleteList);
};
