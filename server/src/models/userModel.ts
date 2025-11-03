import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        authentication: {
            password: { type: String, required: true, select: false },
            salt: { type: String, select: false },
            sessionToken: { type: String, select: false },
            isAdmin: { type: Boolean, default: false, select: false },
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

const UserDB = {
    getUsers: () => {
        const users = UserModel.find();

        return users;
    },

    getUserByEmail: (email: string) => {
        const user = UserModel.findOne({ email });

        return user;
    },

    getUserBySessionToken: (sessionToken: string) => {
        const user = UserModel.findOne({
            "authentication.sessionToken": sessionToken,
        });

        return user;
    },

    getUserById: (id: string) => {
        const user = UserModel.findById(id);

        return user;
    },

    createUser: async (values: Record<string, any>) => {
        const user = await new UserModel(values).save();

        return user.toObject();
    },

    updateUserById: (id: string, values: Record<string, any>) => {
        const updatedUser = UserModel.findByIdAndUpdate(id, values, {
            new: true,
        });

        return updatedUser;
    },

    deleteUserById: (id: string) => {
        const deletedUser = UserModel.findByIdAndDelete(id);

        return deletedUser;
    },
};

export default UserDB;
