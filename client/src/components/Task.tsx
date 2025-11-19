import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";

import type { TaskFolderType, TaskListType, TaskType } from "../interfaces/tasks";
import TaskAPI from "../api/taskAPI";

interface PropTypes {
    taskFolders: TaskFolderType[];
    setTaskFolders: Dispatch<SetStateAction<TaskFolderType[]>>;
    currFolder: TaskFolderType;
    setCurrFolder: Dispatch<SetStateAction<TaskFolderType>>;
    taskList: TaskListType;
    taskListIndex: number;
    task: TaskType;
    taskIndex: number;
}

export default function Task({
    taskFolders,
    setTaskFolders,
    currFolder,
    setCurrFolder,
    taskList,
    taskListIndex,
    task,
    taskIndex,
}: PropTypes) {
    const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
    const [editedDescription, setEditedDescription] = useState<string>("");

    const handleEditDescriptionStart = (description: string) => {
        setIsEditingDescription(true);
        setEditedDescription(description);
    };

    const handleEditDescriptionCancel = () => {
        setIsEditingDescription(false);
        setEditedDescription("");
    };

    const handleEditDescriptionSave = async () => {
        if (editedDescription.trim() !== "") {
            const updatedTask = await TaskAPI.updateTask(currFolder._id, taskList._id, task._id, task.title, editedDescription);

            const updateCurrFolder = currFolder;
            updateCurrFolder.taskLists[taskListIndex].tasks[taskIndex].description = updatedTask.description;

            setCurrFolder(updateCurrFolder);
            setTaskFolders(taskFolders.map((folder) => (folder._id === currFolder._id ? updateCurrFolder : folder)));

            setIsEditingDescription(false);
            setEditedDescription("");
        }
    };

    const handleDeleteTaskButton = async () => {
        await TaskAPI.deleteTask(currFolder._id, taskList._id, task._id);

        const updateCurrFolder = currFolder;
        updateCurrFolder.taskLists[taskListIndex].tasks = updateCurrFolder.taskLists[taskListIndex].tasks.filter((t) => t._id !== task._id);

        setCurrFolder(updateCurrFolder);
        setTaskFolders(taskFolders.map((folder) => (folder._id === currFolder._id ? updateCurrFolder : folder)));
    };

    return (
        <div className="flex justify-between">
            {isEditingDescription ? (
                <div className="flex space-x-2">
                    <input type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} autoFocus={true} />
                    <button onClick={() => handleEditDescriptionSave()}>
                        <FaCheck />
                    </button>
                    <button onClick={() => handleEditDescriptionCancel()}>
                        <GiCancel />
                    </button>
                </div>
            ) : (
                <div className="flex space-x-2">
                    <h4 className="font-semibold mb-2">{task.description}</h4>
                    {taskList._id && (
                        <button onClick={() => handleEditDescriptionStart(task.description)}>
                            <FaEdit />
                        </button>
                    )}
                </div>
            )}
            <button
                type="button"
                key={task._id + "delete"}
                onClick={() => {
                    handleDeleteTaskButton();
                }}
                className="text-white text-left py-2 px-4 hover:bg-blue-700"
            >
                <RiDeleteBin5Fill />
            </button>
        </div>
    );
}
