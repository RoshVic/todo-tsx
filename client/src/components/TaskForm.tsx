import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { TaskListType, TaskFolderType } from "../interfaces/tasks";
import TaskAPI from "../api/taskAPI";

interface PropTypes {
    taskFolders: TaskFolderType[];
    setTaskFolders: Dispatch<SetStateAction<TaskFolderType[]>>;
    currFolder: TaskFolderType;
    setCurrFolder: Dispatch<SetStateAction<TaskFolderType>>;
    taskList: TaskListType;
    taskListIndex: number;
}

export default function TaskForm({ taskFolders, setTaskFolders, currFolder, setCurrFolder, taskList, taskListIndex }: PropTypes) {
    const [newTaskText, setNewTaskText] = useState<string>("");

    const handleAddTask = async () => {
        if (newTaskText.trim() !== "") {
            const newTask = await TaskAPI.createTask(currFolder._id, taskList._id, `New Task`, newTaskText);

            const updatedTaskList = currFolder.taskLists[taskListIndex];
            updatedTaskList.tasks.push(newTask);

            const updatedFolder = currFolder;
            updatedFolder.taskLists[taskListIndex] = updatedTaskList;

            setCurrFolder(updatedFolder);
            setTaskFolders(taskFolders.map((folder) => (folder._id === currFolder._id ? updatedFolder : folder)));
        }
    };

    return (
        <div className="space-x-2">
            <input type="text" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} placeholder="Add Task" />
            <button type="button" className="bg-gray-500 rounded" onClick={handleAddTask}>
                Add Task
            </button>
        </div>
    );
}
