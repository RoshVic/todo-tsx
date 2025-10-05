import TaskList from "./components/TaskList";

import { FaPen, FaClipboardList } from "react-icons/fa";

function App() {
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

export default App;
