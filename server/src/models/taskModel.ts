import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        completed: { type: Boolean, default: false },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            select: false,
        },
        listId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TaskList",
            required: true,
        },
    },
    { timestamps: true }
);

const TaskModel = mongoose.model("Task", taskSchema);

const TaskDB = {
    getTasksByListId: (listId: string, userId: string) => {
        const tasks = TaskModel.find({ listId, userId });

        return tasks;
    },

    createNewTask: async (values: Record<string, any>) => {
        const newTask = await new TaskModel(values).save();

        return newTask.toObject();
    },

    updateTaskById: (_id: string, userId: string, values: Record<string, any>) => {
        const updatedTask = TaskModel.findOneAndUpdate({ _id, userId }, values, {
            new: true,
        });

        return updatedTask;
    },

    deleteTaskById: (_id: string, userId: string) => {
        const deletedTask = TaskModel.findOneAndDelete({ _id, userId });

        return deletedTask;
    },
};

export default TaskDB;
