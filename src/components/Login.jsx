import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const Login = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            navigate('/timer');
            console.log(user);
        } catch (error) {
            console.log("error: ", error.message)
            setErrorMessage(error.message)
        }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden w-1/2">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">Your Pomodoro Timer</h1>
                <h1 className="text-xl font-semibold text-center text-purple-700 m-5">
                    Sign in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(event) => setLoginEmail(event.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(event) => setLoginPassword(event.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                    <h1 className="text-center text-red-400">{errorMessage}</h1>
                </form>
            </div>
        </div>
    )
}

export default Login