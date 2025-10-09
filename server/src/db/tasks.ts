import mongoose from "mongoose";

interface Task {
    task: string;
    completed: boolean;
}

interface TaskList {
    title: string;
    description: string;
    tasks: Array<Task>;
}

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, default: "Folder" },
    folderId: { type: Number, required: true },
    description: { type: String, required: true, default: "Description" },
    taskList: { type: Array<TaskList>, required: true, default: [] },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export const TaskModel = mongoose.model("Task", taskSchema);

export const getTaskFoldersByUserId = (userId: string) => {
    return TaskModel.find({ userId });
};
export const createNewTaskFolder = async (values: Record<string, any>) => {
    const task = await new TaskModel(values).save();
    return task.toObject();
};
