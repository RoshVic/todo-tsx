import express from "express";
import auth from "./authRouter";
import users from "./userRouter";
import taskFolders from "./taskFolderRouter";
import taskLists from "./taskListRouter";
import tasks from "./taskRouter";

const router = express.Router();

export default (): express.Router => {
    auth(router);
    users(router);
    taskFolders(router);
    taskLists(router);
    tasks(router);

    return router;
};
