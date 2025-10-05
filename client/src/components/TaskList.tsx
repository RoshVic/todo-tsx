import { useState } from "react";
import type TaskTypes from "../task";
import TaskService from "../TaskService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TaskForm from "./TaskForm";

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskTypes[]>(TaskService.getTasks());
    const [editedTaskId, setEditedTaskId] = useState<number | null>(null);
    const [editedTaskText, setEditedTaskText] = useState<string>("");

    const handleEditStart = (id: number, Text: string) => {
        setEditedTaskId(id);
        setEditedTaskText(Text);
    };

    const handleEditCancel = () => {
        setEditedTaskId(null);
        setEditedTaskText("");
    };

    const handleEditSave = (id: number) => {
        if (editedTaskText.trim() !== "") {
            const updatedTask = TaskService.updateTask({
                id,
                text: editedTaskText,
                completed: false,
            });

            const updatedTaskObj = Array.isArray(updatedTask)
                ? updatedTask.find((task) => task.id === id)
                : updatedTask;
            if (updatedTaskObj) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === id ? updatedTaskObj : task
                    )
                );
            }
            setEditedTaskId(null);
            setEditedTaskText("");
        }
    };

    const handleDeleteTask = (id: number) => {
        TaskService.deleteTask(id);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div className="taskContainer">
            <div>
                <TaskForm setTasks={setTasks} />
            </div>

            {tasks.map((task) => (
                <div className="items" key={task.id}>
                    {editedTaskId === task.id ? (
                        <div className="editedText">
                            <input
                                type="text"
                                value={editedTaskText}
                                onChange={(e) =>
                                    setEditedTaskText(e.target.value)
                                }
                                autoFocus={true}
                            />
                            <button onClick={() => handleEditSave(task.id)}>
                                <FaCheck />
                            </button>
                            <button
                                className="cancelBtn"
                                onClick={handleEditCancel}
                            >
                                <GiCancel />
                            </button>
                        </div>
                    ) : (
                        <div className="editBtn">
                            <span>{task.text}</span>
                            <button
                                onClick={() =>
                                    handleEditStart(task.id, task.text)
                                }
                            >
                                <FaEdit />
                            </button>
                        </div>
                    )}

                    <button onClick={() => handleDeleteTask(task.id)}>
                        <RiDeleteBin5Fill />
                    </button>
                </div>
            ))}
        </div>
    );
}
