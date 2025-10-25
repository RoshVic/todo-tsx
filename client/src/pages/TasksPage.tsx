import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import type { TaskFolderType } from "../interfaces/tasks";
import TaskList from "../components/TaskList";
import "../css/style.css";

export default function TasksPage() {
    const [taskFolders, setTaskFolders] = useState<TaskFolderType[]>(
        localStorage.getItem("taskFolders")
            ? JSON.parse(localStorage.getItem("taskFolders") || "")
            : []
    );
    const [taskFolder, setTaskFolder] = useState<TaskFolderType>(
        taskFolders[0] || {
            _id: "",
            title: "",
            description: "",
            taskLists: [],
        }
    );
    let { logout, isAuthenticated } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (res.status === 401) throw new Error("Unauthorized");
                return res.json();
            })
            .then((res) => {
                setTaskFolders(res);
                localStorage.setItem("taskFolders", JSON.stringify(res));
            })
            .catch((e) => {
                console.log(e);
                alert("Session has expired, login again!");
                localStorage.removeItem("token");
                isAuthenticated = false;
                navigate("/");
            });
    }, []);

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
                <h1 className="text-2xl text-white font-bold justify-center flex w-full">
                    My tasks
                </h1>
            </div>

            <div className="p-8 gap-8 grid grid-cols-4">
                <div className="col-span-1 shadow-md grid col-auto rounded-lg divide-y-1 divide-gray-200">
                    {taskFolders.map((taskFolder, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => {
                                setTaskFolder(taskFolder);
                            }}
                            className="text-white text-left py-2 px-4 hover:bg-gray-600"
                        >
                            <h1>{taskFolder.title}</h1>
                        </button>
                    ))}
                </div>
                <div className="col-span-3 gap-4 grid grid-cols-3">
                    {taskFolders.length != 0 ? (
                        taskFolder.taskLists.map((taskList, index) => (
                            <div
                                key={index}
                                className="p-4 shadow-md bg-gray-800"
                            >
                                <TaskList {...taskList} />
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
