const API_URL = "http://localhost:8080/";

export async function register(email: string, password: string) {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function login(email: string, password: string) {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}
