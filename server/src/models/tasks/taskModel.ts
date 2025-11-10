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
    getTasksByListId: (listId: string) => {
        const tasks = TaskModel.find({ listId });

        return tasks;
    },

    getTaskById: (id: string) => {
        const task = TaskModel.findById(id);

        return task;
    },

    createNewTask: async (values: Record<string, any>) => {
        const newTask = await new TaskModel(values).save();

        return newTask.toObject();
    },

    updateTaskById: (id: string, values: Record<string, any>) => {
        const updatedTask = TaskModel.findByIdAndUpdate(id, values, {
            new: true,
        });

        return updatedTask;
    },

    deleteTaskById: (id: string) => {
        const deletedTask = TaskModel.findByIdAndDelete(id);

        return deletedTask;
    },

    deleteTasksByListId: (listId: string) => {
        const deletedTasksCount = TaskModel.deleteMany({ listId });

        return deletedTasksCount;
    },
};

export default TaskDB;
