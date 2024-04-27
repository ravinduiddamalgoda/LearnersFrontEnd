import React, { useState, useEffect } from 'react';
import axios from 'axios';
import instance from '../api';
import { useNavigate } from 'react-router-dom';


const ViewQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
    // Fetch quizzes from the backend
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await instance.get('/quiz/getAllQuizes');
                // setQuizzes(response.data);
                // console.log(response.data);
                if(response?.data){
                    setQuizzes(response.data);
                }
                // setQuizzes(response.data);
                console.log(quizzes);
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
            }
        };

        fetchQuizzes();
    }, [quizzes]);

   

    const handleDelete = async (quizId) => {
        try {
            await instance.delete(`/quiz/deleteQuiz/${quizId}`);
            // Update the UI by filtering out the deleted quiz
            setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
            alert('Quiz deleted successfully');
        } catch (error) {
            console.error('Failed to delete quiz:', error);
        }
    };

    const handleUpdate = (quizId) => {
        // Placeholder for update functionality
        // Usually this would navigate to a different component or open a modal
        navigate(`/updateQuiz/${quizId}`);
    };

    return (
        <div className="p-4 overflow-y-scroll h-screen mt-4 " >
             {quizzes.length != 0 && quizzes.map(quiz => (
                <div key={quiz.id} className="bg-gray-100 p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">{quiz?.quiz}</h3>
                    <ul className="list-disc ml-5">


                        <li>{quiz?.answer1}</li>
                        <li>{quiz?.answer2}</li>
                        <li>{quiz?.answer3}</li>
                        <li>{quiz?.answer4}</li>
                    </ul>
                    <button onClick={() => handleDelete(quiz._id)} className="text-red-500 hover:text-red-700 mr-2">
                        Delete
                    </button>
                    <button onClick={() => handleUpdate(quiz._id)} className="text-blue-500 hover:text-blue-700">
                        Update
                    </button>
                </div>
            ))} 
        </div>
    );
};

export default ViewQuiz;
