import { useState } from "react";
import { register } from "../api/auth";
import { Link } from "react-router-dom";
import "../css/style.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        try {
            await register(email, password, username);
            setMessage("Registration is successful! Now login.");
            window.location.href = "/";
        } catch {
            setMessage("Registration error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <nav>
                <Link to="/">Login</Link>
            </nav>
            <form
                onSubmit={handleRegister}
                className="bg-white shadow-md rounded-xl p-8 w-80"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Registration
                </h2>
                {message && <p className="text-center mb-4">{message}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-lg p-2 w-full mb-3"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-lg p-2 w-full mb-5"
                    required
                />
                <input
                    type="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded-lg p-2 w-full mb-5"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600"
                >
                    {loading ? "Creating..." : "Create an account"}
                </button>
            </form>
        </div>
    );
}
