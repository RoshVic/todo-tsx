import express from "express";
import auth from "./authRouter";
import users from "./userRouter";
import taskFolders from "./tasks/taskFolderRouter";
import taskLists from "./tasks/taskListRouter";
import tasks from "./tasks/taskRouter";

const router = express.Router();

export default (): express.Router => {
    auth(router);
    users(router);
    taskFolders(router);
    taskLists(router);
    tasks(router);

    return router;
};
