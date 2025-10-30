import type { TaskType } from "../interfaces/tasks";

const TaskService = {
    addTask: (tasks: TaskType[], description: string): TaskType => {
        const newTask: TaskType = {
            description,
            completed: false,
        };
        tasks = [...tasks, newTask];
        return newTask;
    },

    updateTask: (tasks: TaskType[], task: TaskType, id: number): TaskType => {
        tasks = tasks.map((t, index) => (index === id ? task : t));
        return task;
    },

    deleteTask: (tasks: TaskType[], id: number): void => {
        tasks = tasks.filter((_task, index) => index !== id);
    },
};

export default TaskService;
