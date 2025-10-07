import { FaPen, FaClipboardList } from "react-icons/fa";
import TaskList from "../components/TaskList";

export default function Tasks() {
    return (
        <div className="App">
            <div className="header">
                <div className="logoside">
                    <FaPen />
                    <h1>Task List</h1>
                    <FaClipboardList />
                </div>
            </div>
            <TaskList />
        </div>
    );
}
