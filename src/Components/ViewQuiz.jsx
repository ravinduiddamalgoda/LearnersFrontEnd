import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);

    // Fetch quizzes from the backend
    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get('http://your-backend-url/api/quizzes');
            setQuizzes(response.data);
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
        }
    };

    const handleDelete = async (quizId) => {
        try {
            await axios.delete(`http://your-backend-url/api/quizzes/${quizId}`);
            // Update the UI by filtering out the deleted quiz
            setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
        } catch (error) {
            console.error('Failed to delete quiz:', error);
        }
    };

    const handleUpdate = (quizId) => {
        // Placeholder for update functionality
        // Usually this would navigate to a different component or open a modal
        console.log('Update:', quizId);
    };

    return (
        <div className="space-y-4 p-4">
            {quizzes.map(quiz => (
                <div key={quiz.id} className="bg-gray-100 p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">{quiz.question}</h3>
                    <ul className="list-disc ml-5">
                        {Object.entries(quiz.answers).map(([key, value]) => (
                            <li key={key}>{value}</li>
                        ))}
                    </ul>
                    <button onClick={() => handleDelete(quiz.id)} className="text-red-500 hover:text-red-700 mr-2">
                        Delete
                    </button>
                    <button onClick={() => handleUpdate(quiz.id)} className="text-blue-500 hover:text-blue-700">
                        Update
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ViewQuiz;
