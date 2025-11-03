import mongoose from "mongoose";

const taskListSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            select: false,
        },
        folderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Folder",
            required: true,
        },
    },
    { timestamps: true }
);

taskListSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "listId",
});

taskListSchema.set("toJSON", { virtuals: true });

const TaskListModel = mongoose.model("TaskList", taskListSchema);

const TaskListDB = {
    getListsByFolderId: (folderId: string, userId: string) => {
        const lists = TaskListModel.find({
            folderId,
            userId,
        }).populate("tasks");

        return lists;
    },

    createNewList: async (values: Record<string, any>) => {
        const newList = await new TaskListModel(values).save();

        return newList.toObject();
    },

    updateListById: (_id: string, userId: string, values: Record<string, any>) => {
        const updatedList = TaskListModel.findOneAndUpdate({ _id, userId }, values, {
            new: true,
        });

        return updatedList;
    },

    deleteListById: (_id: string, userId: string) => {
        const deletedList = TaskListModel.findOneAndDelete({
            _id,
            userId,
        });

        return deletedList;
    },
};

export default TaskListDB;
