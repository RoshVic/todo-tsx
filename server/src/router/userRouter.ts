import express from "express";
import BasicMiddle from "../middlewares";
import UserMiddle from "../middlewares/userMiddleware";
import UserControl from "../controllers/userController";

export default (router: express.Router) => {
    router.get("/users", BasicMiddle.isAuthenticated, BasicMiddle.isAdmin, UserControl.getAllUsers);

    router.patch("/users/:userId", BasicMiddle.isAuthenticated, UserMiddle.isOwner, UserControl.updateUser);

    router.delete("/users/:userId", BasicMiddle.isAuthenticated, UserMiddle.isOwner, UserControl.deleteUser);
};
