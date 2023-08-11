// src/Timer.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {
    signOut,
} from "firebase/auth";

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [countingUp, setCountingUp] = useState(true);
    const [displayMessage, setDisplayMessage] = useState("Time to Study");

    // adjust the values according to your need
    const stopAfterSeconds = 120; // 120seconds = 2 mins
    const reverseAfterSeconds = 30; // 30 seconds break
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    }

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + (countingUp ? 1 : - 1));
            }, 1000);
        } else {
            clearInterval(interval);
        }

        if (countingUp && seconds >= stopAfterSeconds) {
            setDisplayMessage("Take Rest")
            setSeconds(reverseAfterSeconds)
            setCountingUp(false);
        }
        if (!countingUp && seconds <= 0) {
            setDisplayMessage("Time to Study")
            setIsRunning(false);
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning, seconds, countingUp]);

    const handleStartStopClick = () => {
        if (seconds <= 0) {
            setCountingUp(true);
        }
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    return (
        <div className="flex flex-col justify-center items-center w-2/6 h-2/6 bg-violet-100  rounded-xl">
            <h1 className='text-4xl m-4 font-semibold	text-center'>{displayMessage}</h1>
            <div className="text-4xl mb-4">
                {Math.floor(seconds / 60).toString().padStart(2, '0')}:
                {(seconds % 60).toString().padStart(2, '0')}
            </div>
            <div className='w-11/12 flex justify-around items-center gap-5 m-3 flex-col'>
                <button
                    className={`px-4 py-2 rounded w-full ${isRunning ? 'bg-red-500' : 'bg-green-500'
                        } text-white`}
                    onClick={handleStartStopClick}
                >
                    {isRunning ? 'Stop' : 'Start'}
                </button>
                <button
                    className={`px-4 py-2 w-full rounded bg-yellow-500`}
                    onClick={() => {
                        setIsRunning(false);
                        setSeconds(0);
                    }}
                >Rest</button>
            </div>
            <button className="w-full px-4 py-2 w-1/4 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Timer;
