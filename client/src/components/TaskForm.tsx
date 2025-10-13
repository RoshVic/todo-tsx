import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import TaskService from "../services/TaskService";
import type TaskTypes from "../interfaces/task";

interface PropTypes {
    setTasks: Dispatch<SetStateAction<TaskTypes[]>>;
}

const TaskForm: React.FC<PropTypes> = ({ setTasks }) => {
    const [newTaskText, setNewTaskText] = useState<string>("");

    const handleAddTask = () => {
        if (newTaskText.trim() !== "") {
            const newTask = TaskService.addTask(newTaskText);
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskText("");
        }
    };
    return (
        <div className="inputForm">
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
};

export default TaskForm;
