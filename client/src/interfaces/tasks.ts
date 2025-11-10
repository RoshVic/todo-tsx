export interface TaskType {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

export interface TaskListType {
    _id: string;
    title: string;
    description: string;
    tasks: Array<TaskType>;
}

export interface TaskFolderType {
    _id: string;
    title: string;
    description: string;
    taskLists: Array<TaskListType>;
}
