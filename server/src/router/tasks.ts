import express from "express";
import { isAuthenticated } from "../middlewares";
import {
    TaskFolderControl,
    TaskListControl,
    TaskControl,
} from "../controllers/tasks";

export default (router: express.Router) => {
    // Task Folders
    router.get("/tasks", isAuthenticated, TaskFolderControl.getAllFolders);
    router.post("/tasks", isAuthenticated, TaskFolderControl.createFolder);
    router.patch(
        "/tasks/:folderId",
        isAuthenticated,
        TaskFolderControl.updateFolder
    );
    router.delete(
        "/tasks/:folderId",
        isAuthenticated,
        TaskFolderControl.deleteFolder
    );

    // Task Lists
    router.get(
        "/tasks/:folderId",
        isAuthenticated,
        TaskListControl.getAllLists
    );
    router.post(
        "/tasks/:folderId",
        isAuthenticated,
        TaskListControl.createList
    );
    router.patch(
        "/tasks/:folderId/:listId",
        isAuthenticated,
        TaskListControl.updateList
    );
    router.delete(
        "/tasks/:folderId/:listId",
        isAuthenticated,
        TaskListControl.deleteList
    );

    // Tasks
    router.get(
        "/tasks/:folderId/:listId",
        isAuthenticated,
        TaskControl.getAllTasks
    );
    router.post(
        "/tasks/:folderId/:listId",
        isAuthenticated,
        TaskControl.createTask
    );
    router.patch(
        "/tasks/:folderId/:listId/:taskId",
        isAuthenticated,
        TaskControl.updateTask
    );
    router.delete(
        "/tasks/:folderId/:listId/:taskId",
        isAuthenticated,
        TaskControl.deleteTask
    );
};
