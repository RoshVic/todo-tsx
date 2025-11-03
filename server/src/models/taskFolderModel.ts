import mongoose from "mongoose";

const taskFolderSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            select: false,
        },
    },
    { timestamps: true }
);

taskFolderSchema.virtual("taskLists", {
    ref: "TaskList",
    localField: "_id",
    foreignField: "folderId",
});

taskFolderSchema.set("toJSON", { virtuals: true });

const TaskFolderModel = mongoose.model("TaskFolder", taskFolderSchema);

const TaskFolderDB = {
    getFoldersByUserId: (userId: string) => {
        const folders = TaskFolderModel.find({ userId }).populate({
            path: "taskLists",
            populate: { path: "tasks" },
        });

        return folders;
    },

    createNewFolder: async (values: Record<string, any>) => {
        const newFolder = await new TaskFolderModel(values).save();

        return newFolder.toObject();
    },

    updateFolderById: (_id: string, userId: string, values: Record<string, any>) => {
        const updatedFolder = TaskFolderModel.findOneAndUpdate({ _id, userId }, values, {
            new: true,
        });

        return updatedFolder;
    },

    deleteFolderById: (_id: string, userId: string) => {
        const deletedFolder = TaskFolderModel.findOneAndDelete({
            _id,
            userId,
        });

        return deletedFolder;
    },
};

export default TaskFolderDB;
