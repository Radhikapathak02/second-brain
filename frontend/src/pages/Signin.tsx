import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function signin() {
        setError("");
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (!username || !password) {
            setError("Both fields are required.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch (e: any) {
            setError(e.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-purple-200 to-blue-100 flex justify-center items-center px-2">
            <div className="bg-white shadow-xl rounded-2xl border w-full max-w-md p-6 sm:p-10 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-purple-700 mb-2 text-center">Sign in to second-brain</h2>
                <p className="text-gray-500 mb-6 text-center">Welcome back! Please enter your details.</p>
                <div className="w-full flex flex-col gap-4">
                    <Input reference={usernameRef} placeholder="Username" />
                    <Input reference={passwordRef} placeholder="Password" type="password" />
                </div>
                {error && <div className="text-red-500 text-sm mt-3 text-center">{error}</div>}
                <div className="flex justify-center pt-6 w-full">
                    <Button onClick={signin} loading={loading} variant="primary" text="Sign In" fullWidth={true} />
                </div>
                <div className="pt-4 text-sm text-gray-600 text-center">Don't have an account? <span className="text-purple-600 cursor-pointer underline" onClick={() => navigate('/signup')}>Sign up</span></div>
            </div>
        </div>
    );
}