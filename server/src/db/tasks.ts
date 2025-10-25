import mongoose from "mongoose";

interface Task {
    description: string;
    completed: boolean;
}

interface TaskList {
    title: string;
    description: string;
    tasks: Array<Task>;
}

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    taskLists: { type: Array<TaskList>, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        select: false,
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
export const deleteTaskFolderById = (id: string) => {
    return TaskModel.findByIdAndDelete({ _id: id });
};
export const updateTaskFolderById = (
    id: string,
    values: Record<string, any>
) => {
    return TaskModel.findByIdAndUpdate(id, values);
};
