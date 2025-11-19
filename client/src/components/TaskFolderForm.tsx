import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { TaskFolderType } from "../interfaces/tasks";
import FolderAPI from "../api/taskFolderAPI";

interface PropTypes {
    taskFolders: TaskFolderType[];
    setTaskFolders: Dispatch<SetStateAction<TaskFolderType[]>>;
}

export default function TaskFolderForm({ taskFolders, setTaskFolders }: PropTypes) {
    const [newFolderTitle, setNewFolderTitle] = useState<string>("");

    const handleAddFolder = async () => {
        if (newFolderTitle.trim() !== "") {
            const newFolder = await FolderAPI.createFolder(newFolderTitle, `Folder Description ${taskFolders.length + 1}`);
            newFolder.taskLists = [];

            setTaskFolders([...taskFolders, newFolder]);
        }
    };

    return (
        <div className="text-white bg-green-800 rounded-t-lg flex p-2 justify-between items-center">
            <input type="text" value={newFolderTitle} onChange={(e) => setNewFolderTitle(e.target.value)} placeholder="Add Title" />
            <button type="button" className="bg-gray-500 rounded" onClick={handleAddFolder}>
                Add Folder
            </button>
        </div>
    );
}
