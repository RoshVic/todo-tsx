import { useEffect, useState } from "react";

import "../css/style.css";
import FolderAPI from "../api/taskFolderAPI";
import { useAuth } from "../hooks/useAuth";
import type { TaskFolderType } from "../interfaces/tasks";
import TaskFolder from "../components/TaskFolder";

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

    const handleAddFolderButton = async () => {
        const newFolder = await FolderAPI.createFolder("New Folder", "Folder Description");
        newFolder.taskLists = [];
        setTaskFolders([...taskFolders, newFolder]);
    };

    const handleFolderButtonClick = (folder: TaskFolderType, id: string) => {
        const prevElem = document.getElementById(activeButtonId);
        if (prevElem) {
            prevElem.style.backgroundColor = "#364153";
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
                <div className="col-span-1 shadow-md grid col-auto rounded-lg divide-y-1 divide-gray-200">
                    <button
                        type="button"
                        onClick={() => {
                            handleAddFolderButton();
                        }}
                        className="text-white text-left py-2 px-4 hover:bg-gray-600"
                    >
                        Add Folder
                    </button>

                    {taskFolders.map((taskFolder, index) => (
                        <button
                            id={"TaskFolderButton" + index}
                            key={taskFolder._id}
                            type="button"
                            onClick={() => {
                                handleFolderButtonClick(taskFolder, "TaskFolderButton" + index);
                            }}
                            className="text-white text-left py-2 px-4 hover:bg-gray-600"
                        >
                            <h1>{taskFolder.title}</h1>
                        </button>
                    ))}
                </div>

                <div className="col-span-3 gap-4 grid grid-cols-3">{taskFolders.length != 0 ? <TaskFolder {...currFolder} /> : <></>}</div>
            </div>
        </div>
    );
}
