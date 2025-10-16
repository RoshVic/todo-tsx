import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";

export const isOwner = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { id } = req.params;
        const currendUserId = get(req, "identity._id") as string;
        if (!currendUserId) {
            return res.sendStatus(400);
        }

        if (currendUserId.toString() != id) {
            return res.sendStatus(401);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const authHeaders = req.headers.authorization;
        if (!authHeaders) {
            return res.sendStatus(401);
        }

        const sessionToken = authHeaders.split(" ")[1];
        if (!sessionToken) {
            return res.sendStatus(401);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        if (!existingUser) {
            return res.sendStatus(401);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
