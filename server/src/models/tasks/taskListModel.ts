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
    getListsByFolderId: (folderId: string) => {
        const lists = TaskListModel.find({
            folderId,
        }).populate("tasks");

        return lists;
    },

    getListById: (id: string) => {
        const list = TaskListModel.findById(id);

        return list;
    },

    createNewList: async (values: Record<string, any>) => {
        const newList = await new TaskListModel(values).save();

        return newList.toObject();
    },

    updateListById: (id: string, values: Record<string, any>) => {
        const updatedList = TaskListModel.findByIdAndUpdate(id, values, {
            new: true,
        });

        return updatedList;
    },

    deleteListById: (id: string) => {
        const deletedList = TaskListModel.findByIdAndDelete(id);

        return deletedList;
    },

    deleteListsByFolderId: (folderId: string) => {
        const deletedListsCount = TaskListModel.deleteMany({ folderId });

        return deletedListsCount;
    },
};

export default TaskListDB;
