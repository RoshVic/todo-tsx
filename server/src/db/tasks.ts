import mongoose from "mongoose";

interface Task {
    task: string;
    completed: boolean;
}

interface TaskList {
    taskList: Array<Task>;
    description: string;
}

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, default: "Folder" },
    description: { type: String, required: true, default: "Description" },
    taskList: { type: Array<TaskList>, required: true, default: [] },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export const TaskModel = mongoose.model("Task", taskSchema);
