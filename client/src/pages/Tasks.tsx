import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../api/auth";
import "../css/style.css";

interface Task {
    id: number;
    title: string;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

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
            .catch(() => {
                alert("Session has expired, login again!");
                localStorage.removeItem("token");
                window.location.href = "/";
            });
    }, []);

    return (
        <div className="p-6">
            <button
                type="button"
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
            >
                Logout
            </button>
            <TaskList />
            <h1 className="text-2xl font-bold mb-4">My tasks</h1>
            {/* <ul>
                {tasks.map((t) => (
                    <li key={t.id} className="mb-2 border-b pb-1">
                        {t.title}
                    </li>
                ))}
            </ul> */}
        </div>
    );
}
