import express from "express";
import { get, merge } from "lodash";
import Users from "../models/userModel";

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const authHeaders = req.headers.authorization;
        if (!authHeaders) {
            return res.sendStatus(401);
        }

        const sessionToken = authHeaders.split(" ")[1];
        if (!sessionToken) {
            return res.sendStatus(401);
        }

        const existingUser = await Users.getUserBySessionToken(sessionToken);
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

export const isOwner = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const currentUserId = get(req, "identity._id") as string;
        if (!currentUserId) {
            return res.sendStatus(400);
        }

        const { userId } = req.params;
        if (currentUserId.toString() != userId) {
            return res.sendStatus(401);
        }

        next();
    } catch (error) {
        console.log(error);

        return res.sendStatus(400);
    }
};

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const currentUserId = get(req, "identity._id") as string;
        if (!currentUserId) {
            return res.sendStatus(400);
        }

        const currentUser = await Users.getUserById(currentUserId).select("+authentication.isAdmin");
        if (!currentUser.authentication.isAdmin) {
            return res.sendStatus(401);
        }

        next();
    } catch (error) {
        console.log(error);

        return res.sendStatus(400);
    }
};
