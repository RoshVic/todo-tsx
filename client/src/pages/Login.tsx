import { useState } from "react";
import { login } from "../api/auth";
import { Link } from "react-router-dom";
import "../css/style.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await login(email, password);
            localStorage.setItem("token", data.authentication.sessionToken);
            alert("Login is successful!");
            window.location.href = "/";
        } catch (err) {
            setError("Wrong email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <nav>
                <Link to="/register">Register</Link>
            </nav>
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-md rounded-xl p-8 w-80"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && (
                    <p className="text-red-500 mb-4 text-center">{error}</p>
                )}

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

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
                >
                    {loading ? "Entering..." : "Enter"}
                </button>
            </form>
        </div>
    );
}
