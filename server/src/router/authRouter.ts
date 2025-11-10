import express from "express";
import AuthControl from "../controllers/authController";

export default (router: express.Router) => {
    router.post("/auth/register", AuthControl.register);

    router.post("/auth/login", AuthControl.login);
};
