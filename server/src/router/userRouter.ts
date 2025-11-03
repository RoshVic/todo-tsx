import express from "express";
import Users from "../controllers/userController";
import { isAuthenticated, isOwner, isAdmin } from "../middlewares";

export default (router: express.Router) => {
    router.get("/users", isAuthenticated, isAdmin, Users.getAllUsers);

    router.patch("/users/:userId", isAuthenticated, isOwner, Users.updateUser);

    router.delete("/users/:userId", isAuthenticated, isOwner, Users.deleteUser);
};
