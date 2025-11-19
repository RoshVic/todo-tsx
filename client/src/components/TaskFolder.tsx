import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

import type { TaskFolderType } from "../interfaces/tasks";
import FolderAPI from "../api/taskFolderAPI";
import TaskListForm from "./TaskListForm";
import TaskList from "./TaskList";

interface PropTypes {
    taskFolders: TaskFolderType[];
    setTaskFolders: Dispatch<SetStateAction<TaskFolderType[]>>;
    currFolder: TaskFolderType;
    setCurrFolder: Dispatch<SetStateAction<TaskFolderType>>;
}

export default function TaskFolder({ taskFolders, setTaskFolders, currFolder, setCurrFolder }: PropTypes) {
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
            const updatedFolder = await FolderAPI.updateFolder(currFolder._id, editedTitle, currFolder.description);

            const updateCurrFolder = currFolder;
            updateCurrFolder.title = updatedFolder.title;
            updateCurrFolder.description = updatedFolder.description;

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
            const updatedFolder = await FolderAPI.updateFolder(currFolder._id, currFolder.title, editedDescription);

            const updateCurrFolder = currFolder;
            updateCurrFolder.title = updatedFolder.title;
            updateCurrFolder.description = updatedFolder.description;

            setCurrFolder(updateCurrFolder);
            setTaskFolders(taskFolders.map((folder) => (folder._id === currFolder._id ? updateCurrFolder : folder)));

            setIsEditingDescription(false);
            setEditedDescription("");
        }
    };

    return (
        <div className="col-span-3">
            <div className="text-white">
                <div>
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
                            <h1>{currFolder.title}</h1>
                            {currFolder._id && (
                                <button onClick={() => handleEditTitleStart(currFolder.title)}>
                                    <FaEdit />
                                </button>
                            )}
                        </div>
                    )}
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
                            <h2>{currFolder.description}</h2>
                            {currFolder._id && (
                                <button onClick={() => handleEditDescriptionStart(currFolder.description)}>
                                    <FaEdit />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="gap-4 grid grid-cols-3">
                {currFolder.taskLists.map((taskList, index) => (
                    <div key={taskList._id}>
                        <TaskList
                            taskFolders={taskFolders}
                            setTaskFolders={setTaskFolders}
                            currFolder={currFolder}
                            setCurrFolder={setCurrFolder}
                            taskList={taskList}
                            taskListIndex={index}
                        />
                    </div>
                ))}
                {currFolder._id && (
                    <TaskListForm
                        taskFolders={taskFolders}
                        setTaskFolders={setTaskFolders}
                        currFolder={currFolder}
                        setCurrFolder={setCurrFolder}
                    />
                )}
            </div>
        </div>
    );
}
