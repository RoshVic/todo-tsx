import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import TaskService from "../services/TaskService";
import type { TaskType } from "../interfaces/tasks";

interface PropTypes {
    tasks: TaskType[];
    setTasks: Dispatch<SetStateAction<TaskType[]>>;
}

export default function TaskForm({ tasks, setTasks }: PropTypes) {
    const [newTaskText, setNewTaskText] = useState<string>("");

    const handleAddTask = () => {
        if (newTaskText.trim() !== "") {
            const newTask = TaskService.addTask(tasks, newTaskText);
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskText("");
        }
    };

    return (
        <div className="space-x-2">
            <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                autoFocus={true}
                placeholder="Add a Task"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}
