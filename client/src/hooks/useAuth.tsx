import { useEffect, useState, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
interface ProviderProps {
    isAuthenticated: boolean;
    logining(token: string): void;
    logout(): void;
}
const AuthContext = createContext<ProviderProps>({
    isAuthenticated: false,
    logining: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const logining = (token: string) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/tasks");
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    const value = useMemo(
        () => ({ isAuthenticated, logining, logout }),
        [isAuthenticated]
    );

    if (loading) return <div>Loading...</div>;
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext)!;
}
