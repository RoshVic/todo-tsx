import mongoose from "mongoose";
const taskFolderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    lists: [
        { type: mongoose.Schema.Types.ObjectId, ref: "TaskList", default: [] },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        select: false,
    },
});

const taskListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task", default: [] }],
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskFolder",
        required: true,
        select: false,
    },
});

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskList",
        required: true,
        select: false,
    },
});

export const TaskFolderModel = mongoose.model("TaskFolder", taskFolderSchema);
export const TaskListModel = mongoose.model("TaskList", taskListSchema);
export const TaskModel = mongoose.model("Task", taskFolderSchema);

// Task Folders
export const TaskFolderDB = {
    getFoldersByUserId: (userId: string) => {
        return TaskFolderModel.find({ userId });
    },
    createNewFolder: async (values: Record<string, any>) => {
        const taskFolder = await new TaskFolderModel(values).save();
        return taskFolder.toObject();
    },
    updateFolderById: (id: string, values: Record<string, any>) => {
        return TaskFolderModel.findByIdAndUpdate(id, values);
    },
    deleteFolderById: (id: string) => {
        return TaskFolderModel.findByIdAndDelete(id);
    },
};

// Task Lists
export const TaskListDB = {
    getListsByFolderId: (folderId: string) => {
        return TaskListModel.find({ folderId });
    },
    createNewList: async (values: Record<string, any>) => {
        const taskList = await new TaskListModel(values).save();
        return taskList.toObject();
    },
    updateListById: (id: string, values: Record<string, any>) => {
        return TaskListModel.findByIdAndUpdate(id, values);
    },
    deleteListById: (id: string) => {
        return TaskListModel.findByIdAndDelete(id);
    },
};

// Tasks
export const TaskDB = {
    getTasksByListId: (listId: string) => {
        return TaskModel.find({ listId });
    },
    createNewTask: async (values: Record<string, any>) => {
        const task = await new TaskModel(values).save();
        return task.toObject();
    },
    updateTaskById: (id: string, values: Record<string, any>) => {
        return TaskModel.findByIdAndUpdate(id, values);
    },
    deleteTaskById: (id: string) => {
        return TaskModel.findByIdAndDelete(id);
    },
};
