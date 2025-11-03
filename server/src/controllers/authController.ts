import express from "express";
import Users from "../models/userModel";
import { authentication, random } from "../helpers";

const AuthControl = {
    login: async (req: express.Request, res: express.Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.sendStatus(400);
            }

            const user = await Users.getUserByEmail(email).select("+authentication.salt +authentication.password");
            if (!user) {
                return res.sendStatus(401);
            }

            const expectedHash = authentication(user.authentication.salt, password);
            if (user.authentication.password !== expectedHash) {
                return res.sendStatus(401);
            }

            const salt = random();
            user.authentication.sessionToken = authentication(salt, user._id.toString());
            await user.save();

            const safeUser = {
                email: user.email,
                username: user.username,
                token: user.authentication.sessionToken,
            };

            console.log(user._id);
            return res.status(200).json(safeUser);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },

    register: async (req: express.Request, res: express.Response) => {
        try {
            const { email, password, username } = req.body;
            if (!email || !password || !username) {
                return res.sendStatus(400);
            }

            const existingUser = await Users.getUserByEmail(email);
            if (existingUser) {
                return res.sendStatus(400);
            }

            const salt = random();
            const user = await Users.createUser({
                email,
                username,
                authentication: {
                    salt,
                    password: authentication(salt, password),
                },
            });

            const safeUser = {
                email: user.email,
                username: user.username,
            };

            console.log(user._id);
            return res.status(201).json(safeUser);
        } catch (error) {
            console.log(error);

            return res.sendStatus(400);
        }
    },
};

export default AuthControl;
