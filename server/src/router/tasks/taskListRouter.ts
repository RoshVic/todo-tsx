import express from "express";
import BasicMiddle from "../../middlewares";
import FolderMiddle from "../../middlewares/tasks/taskFolderMiddleware";
import ListMiddle from "../../middlewares/tasks/taskListMiddleware";
import ListControl from "../../controllers/tasks/taskListController";

export default (router: express.Router) => {
    router.get("/tasks/:folderId", BasicMiddle.isAuthenticated, FolderMiddle.isValid, ListControl.getAllLists);

    router.post("/tasks/:folderId", BasicMiddle.isAuthenticated, FolderMiddle.isValid, ListControl.createList);

    router.patch("/tasks/:folderId/:listId", BasicMiddle.isAuthenticated, FolderMiddle.isValid, ListMiddle.isValid, ListControl.updateList);

    router.delete(
        "/tasks/:folderId/:listId",
        BasicMiddle.isAuthenticated,
        FolderMiddle.isValid,
        ListMiddle.isValid,
        ListControl.deleteList
    );
};
