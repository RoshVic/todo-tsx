import { API_URL } from "./authAPI";

const TaskAPI = {
    getAllTasks: async (folderId: string, listId: string) => {
        try {
            const allTasks = await fetch(`${API_URL}/tasks/${folderId}/${listId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });

            return allTasks;
        } catch (error) {
            console.log(error);
        }
    },

    createTask: async (folderId: string, listId: string, title: string, description: string) => {
        try {
            const newTask = await fetch(`${API_URL}/tasks/${folderId}/${listId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
                body: JSON.stringify({ title, description }),
            });

            return newTask.json();
        } catch (error) {
            console.log(error);
        }
    },

    updateTask: async (folderId: string, listId: string, taskId: string, title: string, description: string) => {
        try {
            const updatedTask = await fetch(`${API_URL}/tasks/${folderId}/${listId}/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
                body: JSON.stringify({ title, description }),
            });

            return updatedTask.json();
        } catch (error) {
            console.log(error);
        }
    },

    deleteTask: async (folderId: string, listId: string, taskId: string) => {
        try {
            const deletedTask = await fetch(`${API_URL}/tasks/${folderId}/${listId}/${taskId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
            });

            return deletedTask.json();
        } catch (error) {
            console.log(error);
        }
    },
};

export default TaskAPI;
