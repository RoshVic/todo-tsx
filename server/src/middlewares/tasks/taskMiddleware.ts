import express from "express";
import Tasks from "../../models/tasks/taskModel";

const TaskMiddleware = {
    isValid: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const currentTaskId = req.params.taskId;
            const currentTask = await Tasks.getTaskById(currentTaskId).select("+userId");

            const currentListId = req.params.listId;
            const listIdFromTask = currentTask.listId;

            if (currentListId.toString() != listIdFromTask.toString()) {
                return res.sendStatus(400);
            }

            next();
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },
};

export default TaskMiddleware;
