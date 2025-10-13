import type TaskTypes from "../interfaces/task";

const LOCAL_STORAGE_KEY = "tasks";

const TaskService = {
    getTasks: (): TaskTypes[] => {
        const tasksStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return tasksStr ? JSON.parse(tasksStr) : [];
    },

    addTask: (text: string): TaskTypes => {
        const tasks = TaskService.getTasks();
        const newTask: TaskTypes = {
            id: tasks.length + 1,
            text,
            completed: false,
        };
        const updatedTasks = [...tasks, newTask];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
        return newTask;
    },

    updateTask: (task: TaskTypes): TaskTypes => {
        const tasks = TaskService.getTasks();
        const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
        return task;
    },

    deleteTask: (id: number): void => {
        const tasks = TaskService.getTasks();
        const updatedTasks = tasks.filter((task) => task.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
    },
};

export default TaskService;
