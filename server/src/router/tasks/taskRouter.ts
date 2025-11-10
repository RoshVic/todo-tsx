import express from "express";
import BasicMiddle from "../../middlewares";
import FolderMiddle from "../../middlewares/tasks/taskFolderMiddleware";
import ListMiddle from "../../middlewares/tasks/taskListMiddleware";
import TaskMiddle from "../../middlewares/tasks/taskMiddleware";
import TaskControl from "../../controllers/tasks/taskController";

export default (router: express.Router) => {
    router.get("/tasks/:folderId/:listId", BasicMiddle.isAuthenticated, FolderMiddle.isValid, ListMiddle.isValid, TaskControl.getAllTasks);

    router.post("/tasks/:folderId/:listId", BasicMiddle.isAuthenticated, FolderMiddle.isValid, ListMiddle.isValid, TaskControl.createTask);

    router.patch(
        "/tasks/:folderId/:listId/:taskId",
        BasicMiddle.isAuthenticated,
        FolderMiddle.isValid,
        ListMiddle.isValid,
        TaskMiddle.isValid,
        TaskControl.updateTask
    );

    router.delete(
        "/tasks/:folderId/:listId/:taskId",
        BasicMiddle.isAuthenticated,
        FolderMiddle.isValid,
        ListMiddle.isValid,
        TaskMiddle.isValid,
        TaskControl.deleteTask
    );
};
