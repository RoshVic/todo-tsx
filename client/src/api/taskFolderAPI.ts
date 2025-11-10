import { API_URL } from "./authAPI";

const TaskFolderAPI = {
    getAllFolders: async () => {
        try {
            const allFolders = await fetch(`${API_URL}/tasks`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });

            return allFolders;
        } catch (error) {
            console.log(error);
        }
    },

    createFolder: async (title: string, description: string) => {
        try {
            const newFolder = await fetch(`${API_URL}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
                body: JSON.stringify({ title, description }),
            });

            return newFolder.json();
        } catch (error) {
            console.log(error);
        }
    },

    updateFolder: async (folderId: string, title: string, description: string) => {
        try {
            const updatedFolder = await fetch(`${API_URL}/tasks/${folderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionStorage.getItem("token")}` },
                body: JSON.stringify({ title, description }),
            });

            return updatedFolder.json();
        } catch (error) {
            console.log(error);
        }
    },

    deleteFolder: async (folderId: string) => {
        try {
            const deletedFolder = await fetch(`${API_URL}/tasks/${folderId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
            });

            return deletedFolder.json();
        } catch (error) {
            console.log(error);
        }
    },
};

export default TaskFolderAPI;
