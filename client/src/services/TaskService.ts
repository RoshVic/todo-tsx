import type { TaskType } from "../interfaces/tasks";

// const LOCAL_STORAGE_KEY = "tasks";

const TaskService = {
    addTask: (tasks: TaskType[], description: string): TaskType => {
        const newTask: TaskType = {
            description,
            completed: false,
        };
        const updatedTasks = [...tasks, newTask];
        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
        return newTask;
    },

    updateTask: (tasks: TaskType[], task: TaskType, id: number): TaskType => {
        const updatedTasks = tasks.map((t, index) => (index === id ? task : t));
        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
        return task;
    },

    deleteTask: (tasks: TaskType[], id: number): void => {
        const updatedTasks = tasks.filter((_task, index) => index !== id);
        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
    },
};

export default TaskService;
