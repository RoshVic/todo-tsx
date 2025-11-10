import { useState } from "react";
import type { TaskListType, TaskType } from "../interfaces/tasks";
import TaskForm from "./TaskForm";
import Task from "./Task";

export default function TaskList(taskList: TaskListType) {
    const [tasks, setTasks] = useState<TaskType[]>(taskList.tasks);

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
                    <div key={task._id}>
                        <Task tasks={tasks} setTasks={setTasks} task={task} index={index} />
                    </div>
                ))}
            </div>
        </div>
    );
}
