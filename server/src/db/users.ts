import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

export const UserModel = mongoose.model("User", userSchema);

export const getUsers = () => {
    return UserModel.find();
};
export const getUserByEmail = (email: string) => {
    return UserModel.findOne({ email });
};
export const getUserBySessionToken = (sessionToken: string) => {
    return UserModel.findOne({ "authentication.sessionToken": sessionToken });
};
export const getUserById = (id: string) => {
    return UserModel.findById(id);
};
export const createUser = async (values: Record<string, any>) => {
    const user = await new UserModel(values).save();
    return user.toObject();
};
export const deleteUserById = (id: string) => {
    return UserModel.findByIdAndDelete(id);
};
export const updateUserById = (id: string, values: Record<string, any>) => {
    return UserModel.findByIdAndUpdate(id, values);
};
