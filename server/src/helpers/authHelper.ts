import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const AuthHelper = {
    random: () => crypto.randomBytes(16).toString("base64"),

    authentication: (salt: string, password: string) => {
        return crypto.createHmac("sha256", [salt, password].join("/")).update(process.env.AUTH_SECRET_KEY).digest("hex");
    },
};

export default AuthHelper;
