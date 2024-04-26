import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ViewTrainings = () => {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const response = await axios.get('/api/trainings');
            setTrainings(response.data);
        } catch (error) {
            console.error('Error fetching trainings:', error);
        }
    };

    const handleDelete = async (sessionId) => {
        try {
            await axios.delete(`/api/trainings/${sessionId}`);
            setTrainings(currentTrainings => currentTrainings.filter(training => training.sessionID !== sessionId));
            alert('Training deleted successfully');
        } catch (error) {
            console.error('Failed to delete training:', error);
            alert('Error deleting training');
        }
    };

    return (
        <div>
            {trainings.map(training => (
                <div key={training.sessionID} className="p-4 mb-4 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-semibold">{`Training on ${new Date(training.date).toLocaleDateString()} at ${training.time}`}</h3>
                    <p>Location: {training.location}</p>
                    <p>Instructor ID: {training.instructorID}</p>
                    <p>Vehicle ID: {training.vehicleID}</p>
                    <p>Max Participants: {training.maxCount}</p>
                    <p>Current Count: {training.currentCount}</p>
                    <p>Status: {training.status}</p>
                    <button onClick={() => handleDelete(training.sessionID)} className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700">
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ViewTrainings;
