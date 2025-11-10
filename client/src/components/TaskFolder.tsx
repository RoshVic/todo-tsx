import type { TaskFolderType } from "../interfaces/tasks";
import TaskList from "./TaskList";

export default function TaskFolder(taskFolder: TaskFolderType) {
    return (
        <div className="col-span-3 gap-4 grid grid-cols-3">
            {taskFolder.taskLists.map((taskList) => (
                <div key={taskList._id} className="p-4 shadow-md bg-gray-800">
                    <TaskList {...taskList} />
                </div>
            ))}
        </div>
    );
}
