import { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

import "../css/style.css";

import { useAuth } from "../hooks/useAuth";

import type { TaskFolderType } from "../interfaces/tasks";
import FolderAPI from "../api/taskFolderAPI";
import FolderForm from "../components/TaskFolderForm";
import Folder from "../components/TaskFolder";

export default function TasksPage() {
    const [taskFolders, setTaskFolders] = useState<TaskFolderType[]>([]);
    const [currFolder, setCurrFolder] = useState<TaskFolderType>(
        taskFolders[0] || {
            _id: "",
            title: "",
            description: "",
            taskLists: [],
        }
    );
    const [activeButtonId, setActiveButtonId] = useState<string>("");

    const { logout } = useAuth();

    useEffect(() => {
        FolderAPI.getAllFolders()
            .then((res) => {
                if (!res) throw new Error("No response from server");
                if (res.status === 401) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => {
                setTaskFolders(data);
            })
            .catch((e) => {
                console.log(e);
                alert("Session has expired, login again!");
                logout();
            });
    }, []);

    const handleDeleteFolderButton = async (folderId: string) => {
        await FolderAPI.deleteFolder(folderId);

        setTaskFolders(taskFolders.filter((folder) => folder._id !== folderId));
        setCurrFolder({
            _id: "",
            title: "",
            description: "",
            taskLists: [],
        });
    };

    const handleFolderButtonClick = (folder: TaskFolderType, id: string) => {
        const prevElem = document.getElementById(activeButtonId);
        if (prevElem) {
            prevElem.style.backgroundColor = "#4a5565";
        }

        const currElem = document.getElementById(id);
        if (currElem) {
            currElem.style.backgroundColor = "#66123bff";
        }

        setActiveButtonId(id);
        setCurrFolder(folder);
    };

    return (
        <div className="min-h-screen bg-gray-700 divide-y-1 divide-gray-200">
            <div className="flex items-center p-4">
                <button
                    type="button"
                    onClick={() => logout()}
                    className="justify-start bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Logout
                </button>
                <h1 className="text-2xl text-white font-bold justify-center flex w-full">My tasks</h1>
            </div>

            <div className="p-8 gap-8 grid grid-cols-4">
                <div className="col-span-1 shadow-md grid col-auto rounded-lg divide-y-1 divide-gray-200 bg-gray-600">
                    <FolderForm taskFolders={taskFolders} setTaskFolders={setTaskFolders} />

                    {taskFolders.map((taskFolder, index) => (
                        <div
                            id={"TaskFolderButton" + index}
                            key={taskFolder._id}
                            onClick={() => {
                                handleFolderButtonClick(taskFolder, "TaskFolderButton" + index);
                            }}
                            // {index === taskFolders.length - 1 ? "rounded-b-lg" : ""}
                            className="text-white text-left py-2 px-4 hover:bg-gray-500 flex justify-between"
                        >
                            <h1>{taskFolder.title}</h1>

                            <button
                                type="button"
                                key={taskFolder._id + "delete"}
                                onClick={() => {
                                    handleDeleteFolderButton(taskFolder._id);
                                }}
                                className="text-white text-left py-2 px-4 hover:bg-blue-700"
                            >
                                <RiDeleteBin5Fill />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="col-span-3 gap-4 grid grid-cols-3">
                    {taskFolders.length != 0 ? (
                        <Folder
                            taskFolders={taskFolders}
                            setTaskFolders={setTaskFolders}
                            currFolder={currFolder}
                            setCurrFolder={setCurrFolder}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}
