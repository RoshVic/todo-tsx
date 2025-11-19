import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";

import type { TaskFolderType, TaskListType } from "../interfaces/tasks";
import ListAPI from "../api/taskListAPI";
import TaskForm from "./TaskForm";
import Task from "./Task";

interface PropTypes {
    taskFolders: TaskFolderType[];
    setTaskFolders: Dispatch<SetStateAction<TaskFolderType[]>>;
    currFolder: TaskFolderType;
    setCurrFolder: Dispatch<SetStateAction<TaskFolderType>>;
    taskList: TaskListType;
    taskListIndex: number;
}

export default function TaskList({ taskFolders, setTaskFolders, currFolder, setCurrFolder, taskList, taskListIndex }: PropTypes) {
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>("");
    const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
    const [editedDescription, setEditedDescription] = useState<string>("");

    const handleEditTitleStart = (title: string) => {
        setIsEditingTitle(true);
        setEditedTitle(title);
    };

    const handleEditTitleCancel = () => {
        setIsEditingTitle(false);
        setEditedTitle("");
    };

    const handleEditTitleSave = async () => {
        if (editedTitle.trim() !== "") {
            const updatedList = await ListAPI.updateList(currFolder._id, taskList._id, editedTitle, taskList.description);

            const updateCurrFolder = currFolder;
            updateCurrFolder.taskLists[taskListIndex].title = updatedList.title;

            setCurrFolder(updateCurrFolder);
            setTaskFolders(taskFolders.map((folder) => (folder._id === currFolder._id ? updateCurrFolder : folder)));

            setIsEditingTitle(false);
            setEditedTitle("");
        }
    };

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
            const updatedList = await ListAPI.updateList(currFolder._id, taskList._id, taskList.title, editedDescription);

            const updateCurrFolder = currFolder;
            updateCurrFolder.taskLists[taskListIndex].description = updatedList.description;

            setCurrFolder(updateCurrFolder);
            setTaskFolders(taskFolders.map((folder) => (folder._id === currFolder._id ? updateCurrFolder : folder)));

            setIsEditingDescription(false);
            setEditedDescription("");
        }
    };

    const handleDeleteListButton = async (folderId: string, listId: string) => {
        await ListAPI.deleteList(folderId, listId);

        const updateCurrFolder = currFolder;
        updateCurrFolder.taskLists = updateCurrFolder.taskLists.filter((list) => list._id !== listId);

        setCurrFolder(updateCurrFolder);
        setTaskFolders(taskFolders.map((folder) => (folder._id === currFolder._id ? updateCurrFolder : folder)));
    };

    return (
        <div className="text-white p-4 shadow-md bg-gray-800 rounded-lg">
            <div>
                <div className="flex justify-between">
                    {isEditingTitle ? (
                        <div className="flex space-x-2">
                            <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} autoFocus={true} />
                            <button onClick={() => handleEditTitleSave()}>
                                <FaCheck />
                            </button>
                            <button onClick={() => handleEditTitleCancel()}>
                                <GiCancel />
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-2">
                            <h3 className="text-xl font-semibold mb-2">{taskList.title}</h3>
                            {taskList._id && (
                                <button onClick={() => handleEditTitleStart(taskList.title)}>
                                    <FaEdit />
                                </button>
                            )}
                        </div>
                    )}
                    <button
                        type="button"
                        key={taskList._id + "delete"}
                        onClick={() => {
                            handleDeleteListButton(currFolder._id, taskList._id);
                        }}
                        className="text-white text-left py-2 px-4 hover:bg-blue-700"
                    >
                        <RiDeleteBin5Fill />
                    </button>
                </div>

                <div>
                    {isEditingDescription ? (
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                                autoFocus={true}
                            />
                            <button onClick={() => handleEditDescriptionSave()}>
                                <FaCheck />
                            </button>
                            <button onClick={() => handleEditDescriptionCancel()}>
                                <GiCancel />
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-2">
                            <h4 className="font-semibold mb-2">{taskList.description}</h4>
                            {taskList._id && (
                                <button onClick={() => handleEditDescriptionStart(taskList.description)}>
                                    <FaEdit />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <TaskForm
                    taskFolders={taskFolders}
                    setTaskFolders={setTaskFolders}
                    currFolder={currFolder}
                    setCurrFolder={setCurrFolder}
                    taskList={taskList}
                    taskListIndex={taskListIndex}
                />
                {taskList.tasks.map((task, index) => (
                    <div key={task._id}>
                        <Task
                            taskFolders={taskFolders}
                            setTaskFolders={setTaskFolders}
                            currFolder={currFolder}
                            setCurrFolder={setCurrFolder}
                            taskList={taskList}
                            taskListIndex={taskListIndex}
                            task={task}
                            taskIndex={index}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
