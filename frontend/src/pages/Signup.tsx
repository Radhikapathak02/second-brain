import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function signup() {
        setError("");
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;
        if (!username || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            });
            // Auto-login after signup
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch (e: any) {
            setError(e.response?.data?.message || "Signup failed. Try a different username.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-purple-200 to-blue-100 flex justify-center items-center">
            <div className="bg-white shadow-xl rounded-2xl border min-w-80 p-10 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-purple-700 mb-2">Create your account</h2>
                <p className="text-gray-500 mb-6">Sign up to get started with second-brain!</p>
                <div className="w-full flex flex-col gap-4">
                    <Input reference={usernameRef} placeholder="Username" />
                    <Input reference={passwordRef} placeholder="Password" type="password" />
                    <Input reference={confirmPasswordRef} placeholder="Confirm Password" type="password" />
                </div>
                {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
                <div className="flex justify-center pt-6 w-full">
                    <Button onClick={signup} loading={loading} variant="primary" text="Sign Up" fullWidth={true} />
                </div>
                <div className="pt-4 text-sm text-gray-600">Already have an account? <span className="text-purple-600 cursor-pointer underline" onClick={() => navigate('/signin')}>Sign in</span></div>
            </div>
        </div>
    );
}