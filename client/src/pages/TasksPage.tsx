import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../css/style.css";

interface Task {
    id: number;
    title: string;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { logout } = useAuth();
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
            .catch((e) => {
                console.log(e);
                alert("Session has expired, login again!");
                localStorage.removeItem("token");
                navigate("/");
            });
    }, []);

    return (
        <div className="p-6">
            <button
                type="button"
                onClick={() => logout()}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
            >
                Logout
            </button>

            <h1 className="text-2xl font-bold mb-4">My tasks</h1>
            {/* <ul>
                {tasks.map((t) => (
                    <li key={t.id} className="mb-2 border-b pb-1">
                        {t.title}
                    </li>
                ))}
            </ul> */}
            <TaskList />
        </div>
    );
}
