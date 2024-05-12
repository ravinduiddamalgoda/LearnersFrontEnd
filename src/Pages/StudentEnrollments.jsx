import React, { useState, useEffect } from "react";
import axios from 'axios'; // assuming axios is used for API requests
import instance from "../api";

const StudentEnrollments = () => {
    const [sessions, setSessions] = useState([]);
    const [filteredSessions, setFilteredSessions] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const userData = JSON.parse(localStorage.getItem('user'));
    const userID = userData.userID; // hardcoded user ID

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await instance.get('/pts'); // Adjust this endpoint as needed
            const validSessions = response.data.filter(session => session.currentCount < session.maxCount);
            setSessions(validSessions);
            setFilteredSessions(validSessions);
        } catch (error) {
            console.error("Error fetching sessions:", error);
        }
    };

    useEffect(() => {
        const result = sessions.filter(session => {
            return (!searchDate || new Date(session.date).toLocaleDateString() === new Date(searchDate).toLocaleDateString()) &&
                   (!searchLocation || session.location.toLowerCase().includes(searchLocation.toLowerCase()));
        });
        setFilteredSessions(result);
    }, [searchDate, searchLocation, sessions]);

    const handleEnroll = (sessionID) => {
        if (window.confirm("Do you want to enroll in this training session?")) {
            enrollToSession(sessionID);
        }
    };

    const enrollToSession = async (sessionID) => {
        try {
            const payload = { userID, sessionID, status: "pending" }; // default status can be adjusted
            const response = await instance.post('/enrollPTS/add', payload); // Adjust this endpoint as needed
            alert('Enrollment successful!');
            fetchSessions(); // Re-fetch sessions to update the list
        } catch (error) {
            console.error("Error enrolling in session:", error);
            alert('Failed to enroll in session.');
        }
    };

    return (
        <div>
            <input 
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                placeholder="Filter by Date"
                className="border p-2 mb-2"
            />
            <input 
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Filter by Location"
                className="border p-2 mb-4"
            />
            <div className="grid grid-cols-3 gap-4">
                {filteredSessions.map(session => (
                    <div key={session.sessionID} className="p-4 bg-white shadow rounded">
                        <h3>{`Training on ${new Date(session.date).toLocaleDateString()} at ${session.time}`}</h3>
                        <p>Location: {session.location}</p>
                        <p>Participants: {session.currentCount}/{session.maxCount}</p>
                        <button 
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleEnroll(session.sessionID)}
                            disabled={session.currentCount >= session.maxCount}
                        >
                            Enroll
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentEnrollments;
