import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../css/style.css";

export default function HomePage() {
    let navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { logout } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-8 w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    To-Do App
                </h2>
                {!isAuthenticated ? (
                    <>
                        <button
                            className="bg-blue-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-gray-600 mt-2"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button
                            className="bg-green-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-gray-600 mt-2"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="bg-[#5AF] text-white text-center py-2 px-4 rounded-lg w-full hover:bg-gray-600 mt-2"
                            onClick={() => navigate("/tasks")}
                        >
                            Tasks
                        </button>
                        <button
                            className="bg-gray-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-gray-600 mt-2"
                            onClick={() => logout()}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
