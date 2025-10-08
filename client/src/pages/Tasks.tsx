import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { useAuth } from "../hooks/useAuth";

interface Task {
    id: number;
    title: string;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/tasks", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (res.status === 401) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => setTasks(data.tasks))
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
                onClick={() => useAuth().logout()}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
            ></button>
            <TaskList />
            <h1 className="text-2xl font-bold mb-4">My tasks</h1>
            <ul>
                {tasks.map((t) => (
                    <li key={t.id} className="mb-2 border-b pb-1">
                        {t.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
