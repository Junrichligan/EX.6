import { useEffect, useState } from "react";

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }
        
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);

    function toggleStartStop() {
        setIsRunning(!isRunning);
    }

    function resetClicked() {
        setTime(0);
        setIsRunning(false);
    }

    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-6xl font-mono font-bold text-gray-800 mb-8 text-center">
                    {formatTime(time)}
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={toggleStartStop}
                        className="px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200"
                        style={{ backgroundColor: isRunning ? '#ef4444' : '#10b981' }}
                    >
                        {isRunning ? 'STOP' : 'START'}
                    </button>
                    <button 
                        onClick={resetClicked}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                    >
                        RESET
                    </button>
                </div>
            </div>
        </div>
    );
}