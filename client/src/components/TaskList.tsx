import { useState } from "react";
import type { TaskListType, TaskType } from "../interfaces/tasks";
import TaskForm from "./TaskForm";
import TaskService from "../services/TaskService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function TaskList(taskList: TaskListType) {
    const [tasks, setTasks] = useState<TaskType[]>(taskList.tasks);
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
                    description: editedTaskText,
                    completed: false,
                },
                editedTaskId
            );

            const updatedTaskObj = Array.isArray(updatedTask)
                ? updatedTask.find((_task, index) => index === id)
                : updatedTask;
            if (updatedTaskObj) {
                setTasks((prevTasks) =>
                    prevTasks.map((task, index) =>
                        index === id ? updatedTaskObj : task
                    )
                );
            }
            setEditedTaskId(-1);
            setEditedTaskText("");
        }
    };

    const handleDeleteTask = (id: number) => {
        TaskService.deleteTask(tasks, id);
        setTasks((prevTasks) =>
            prevTasks.filter((_task, index) => index !== id)
        );
    };

    return (
        <div className="text-white">
            <div>
                <h2 className="text-xl font-semibold mb-2">{taskList.title}</h2>
            </div>

            <div>
                <TaskForm tasks={tasks} setTasks={setTasks} />
            </div>

            <div className="mt-4 space-y-2">
                {tasks.map((task, index) => (
                    <div key={"TaskKey" + index}>
                        {editedTaskId === index ? (
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={editedTaskText}
                                    onChange={(e) =>
                                        setEditedTaskText(e.target.value)
                                    }
                                    autoFocus={true}
                                />
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
                                <button
                                    onClick={() =>
                                        handleEditStart(index, task.description)
                                    }
                                >
                                    <FaEdit />
                                </button>{" "}
                                <button onClick={() => handleDeleteTask(index)}>
                                    <RiDeleteBin5Fill />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
