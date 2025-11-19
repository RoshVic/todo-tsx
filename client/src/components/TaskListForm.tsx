import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { TaskFolderType } from "../interfaces/tasks";
import ListAPI from "../api/taskListAPI";

interface PropTypes {
    taskFolders: TaskFolderType[];
    setTaskFolders: Dispatch<SetStateAction<TaskFolderType[]>>;
    currFolder: TaskFolderType;
    setCurrFolder: Dispatch<SetStateAction<TaskFolderType>>;
}

export default function TaskListForm({ taskFolders, setTaskFolders, currFolder, setCurrFolder }: PropTypes) {
    const [newListTitle, setNewListTitle] = useState<string>("");
    const [newListDescription, setNewListDescription] = useState<string>("");

    const handleAddList = async () => {
        if (newListTitle.trim() !== "" && newListDescription.trim() !== "") {
            const newList = await ListAPI.createList(currFolder._id, newListTitle, newListDescription);
            newList.tasks = [];

            const updateCurrFolder = currFolder;
            updateCurrFolder.taskLists.push(newList);

            setCurrFolder(updateCurrFolder);
            setTaskFolders(taskFolders.map((folder) => (folder._id === currFolder._id ? updateCurrFolder : folder)));
        }
    };

    return (
        <div className="text-white p-4 shadow-md bg-gray-800 rounded-lg space-x-2">
            <input type="text" value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} placeholder="Add Title" />
            <input
                type="text"
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
                placeholder="Add Description"
            />
            <button className="bg-gray-500 rounded" onClick={handleAddList}>
                Add List
            </button>
        </div>
    );
}
