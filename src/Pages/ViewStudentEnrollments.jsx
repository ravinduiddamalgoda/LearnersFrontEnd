import React, { useEffect, useState } from 'react';
import TrainingSide from '../Components/TrainingSide';
import instance from '../api';

const ViewStudentEnrollment = () => {
    const [trainings, setTrainings] = useState([]);
    const [filteredTrainings, setFilteredTrainings] = useState([]);
    const [selectedPTSID, setSelectedPTSID] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [enrollments, setEnrollments] = useState([]);
    const [studentNames, setStudentNames] = useState({});

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await instance.get(`/pts`);
                setTrainings(response.data);
                setFilteredTrainings(response.data);
            } catch (error) {
                console.error("Error fetching trainings:", error);
            }
        };
        fetchTrainings();
    }, []);

    useEffect(() => {
        if (searchDate) {
            const filtered = trainings.filter(training =>
                new Date(training.date).toLocaleDateString() === new Date(searchDate).toLocaleDateString()
            );
            setFilteredTrainings(filtered);
        } else {
            setFilteredTrainings(trainings);
        }
    }, [searchDate, trainings]);

    useEffect(() => {
        const fetchEnrollments = async () => {
            if (selectedPTSID) {
                try {
                    const response = await instance.get(`/enrollPTS/${selectedPTSID}`);
                    // Ensure that the data is in array format
                    setEnrollments(Array.isArray(response.data) ? response.data : []);
                    fetchStudentNames(Array.isArray(response.data) ? response.data : []);
                } catch (error) {
                    console.error("Error fetching enrollments:", error);
                    setEnrollments([]); // Ensure enrollments is always an array
                }
            }
        };
        fetchEnrollments();
    }, [selectedPTSID]);
    

    const fetchStudentNames = async (enrollments) => {
        const names = {};
        for (let enroll of enrollments) {
            try {
                const response = await instance.get(`/user/profile/${enroll.userID}`);
                names[enroll.userID] = response.data.name || 'Name not available';  // Assuming response.data.name holds the name
            } catch (error) {
                console.error("Error fetching student data for userID:", enroll.userID, error);
                names[enroll.userID] = 'Unknown'; // Default name if fetch fails
            }
        }
        setStudentNames(names);
    };
    

    const handleDeleteEnrollment = async (enrollmentId) => {
        if (window.confirm("Are you sure you want to delete this enrollment?")) {
            try {
                await instance.delete(`/enrollPTS/${enrollmentId}`);
                setEnrollments(enrollments.filter(enroll => enroll._id !== enrollmentId));
                alert("Enrollment deleted successfully!");
            } catch (error) {
                console.error("Error deleting enrollment:", error);
                alert("Failed to delete enrollment.");
            }
        }
    };
    

    return (
        <div className="flex flex-row">
            <TrainingSide />
            <div className="flex-grow p-4">
                <div className="mb-6">
                    <input 
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        placeholder="Filter by Date"
                    />
                </div>
                <div className="flex overflow-x-auto space-x-4">
                    {filteredTrainings.map((training) => (
                        <div
                            key={training.sessionID}
                            className="min-w-max bg-white p-4 rounded-lg shadow-lg cursor-pointer"
                            onClick={() => setSelectedPTSID(training.sessionID)}
                        >
                            <h3 className="text-lg font-semibold">{`Training on ${new Date(training.date).toLocaleDateString()} at ${training.time}`}</h3>
                            <p>Location: {training.location}</p>
                            <p>Instructor ID: {training.instructorID}</p>
                            <p>Vehicle ID: {training.vehicleID}</p>
                            <p>Max Participants: {training.maxCount}</p>
                            <p>Current Count: {training.currentCount}</p>
                            <p>Status: {training.status}</p>
                        </div>
                    ))}
                </div>
                {selectedPTSID && (
                    <div className="mt-4">
                        <h2 className="font-semibold text-xl">Enrolled Students</h2>
                        {enrollments.map(enroll => (
                            <div key={enroll._id} className="bg-gray-100 p-3 rounded shadow my-2">
                                <p>Student Name: {studentNames[enroll.userID] || 'Loading...'}</p>
                                <p>Status: {enroll.status}</p>
                                <button 
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDeleteEnrollment(enroll.userID)}
                                >
                                    Delete Enrollment
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewStudentEnrollment;
