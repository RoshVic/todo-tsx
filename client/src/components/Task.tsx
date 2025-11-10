import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";

import type { TaskType } from "../interfaces/tasks";
import TaskService from "../services/TaskService";

interface PropTypes {
    tasks: TaskType[];
    setTasks: Dispatch<SetStateAction<TaskType[]>>;
    task: TaskType;
    index: number;
}

export default function Task({ tasks, setTasks, task, index }: PropTypes) {
    const [editedTaskId, setEditedTaskId] = useState<number>(-1);
    const [editedTaskText, setEditedTaskText] = useState<string>("");

    const handleEditStart = (id: number, Text: string) => {
        setEditedTaskId(id);
        setEditedTaskText(Text);
    };

    const handleEditCancel = () => {
        setEditedTaskId(-1);
        setEditedTaskText("");
    };

    const handleEditSave = (id: number) => {
        if (editedTaskText.trim() !== "") {
            const updatedTask = TaskService.updateTask(
                tasks,
                {
                    title,
                    description: editedTaskText,
                },
                editedTaskId
            );

            const updatedTaskObj = Array.isArray(updatedTask) ? updatedTask.find((_task, index) => index === id) : updatedTask;
            if (updatedTaskObj) {
                setTasks((prevTasks) => prevTasks.map((task, index) => (index === id ? updatedTaskObj : task)));
            }
            setEditedTaskId(-1);
            setEditedTaskText("");
        }
    };

    const handleDeleteTask = (id: number) => {
        TaskService.deleteTask(tasks, id);
        setTasks((prevTasks) => prevTasks.filter((_task, index) => index !== id));
    };

    return (
        <div>
            {editedTaskId === index ? (
                <div className="flex space-x-2">
                    <input type="text" value={editedTaskText} onChange={(e) => setEditedTaskText(e.target.value)} autoFocus={true} />
                    <button onClick={() => handleEditSave(index)}>
                        <FaCheck />
                    </button>
                    <button onClick={handleEditCancel}>
                        <GiCancel />
                    </button>
                </div>
            ) : (
                <div className="flex space-x-2">
                    <span>{task.description}</span>
                    <button onClick={() => handleEditStart(index, task.description)}>
                        <FaEdit />
                    </button>{" "}
                    <button onClick={() => handleDeleteTask(index)}>
                        <RiDeleteBin5Fill />
                    </button>
                </div>
            )}
        </div>
    );
}
