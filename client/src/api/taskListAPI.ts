import { API_URL } from "./authAPI";

const TaskListAPI = {
    getAllLists: async (folderId: string) => {
        try {
            const allLists = await fetch(`${API_URL}/tasks/${folderId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });

            return allLists;
        } catch (error) {
            console.log(error);
        }
    },

    createList: async (folderId: string, title: string, description: string) => {
        try {
            const newList = await fetch(`${API_URL}/tasks/${folderId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
                body: JSON.stringify({ title, description }),
            });

            return newList.json();
        } catch (error) {
            console.log(error);
        }
    },

    updateList: async (folderId: string, listId: string, title: string, description: string) => {
        try {
            const updatedList = await fetch(`${API_URL}/tasks/${folderId}/${listId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
                body: JSON.stringify({ title, description }),
            });

            return updatedList.json();
        } catch (error) {
            console.log(error);
        }
    },

    deleteList: async (folderId: string, listId: string) => {
        try {
            const deletedList = await fetch(`${API_URL}/tasks/${folderId}/${listId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
            });

            return deletedList.json();
        } catch (error) {
            console.log(error);
        }
    },
};

export default TaskListAPI;
