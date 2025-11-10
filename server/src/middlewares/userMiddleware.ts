import express from "express";
import { get } from "lodash";

const UserMiddleware = {
    isOwner: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const currentUserId = get(req, "identity._id") as string;
            if (!currentUserId) {
                return res.sendStatus(400);
            }

            const { userId } = req.params;
            if (currentUserId != userId) {
                return res.sendStatus(401);
            }

            next();
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },
};

export default UserMiddleware;
