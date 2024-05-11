import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../api';

const QuizPlay = () => {
    const { quizPackageID } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const { data } = await instance.get(`/quizPackage/${quizPackageID}`);
                const quizzesData = await Promise.all(data.quizzes.map(quizId => 
                    instance.get(`/quiz/getQuiz/${quizId}`).then(res => res.data)
                ));
                setQuizzes(quizzesData);
            } catch (error) {
                console.error('Failed to load quizzes:', error);
                alert('Failed to load quizzes');
            }
        };
        fetchQuizzes();
    }, [quizPackageID]);

    const handleAnswer = (selectedAnswer) => {
        if (selectedAnswer === quizzes[currentQuizIndex].correctAnswer) {
            setScore(score + 1);
        }
        if (currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
        } else {
            // alert(`Quiz Done. Score is: ${score}`);
            handleSubmitScore();
        }
    };
    
    const handleSubmitScore = async () => {
        try {
            const userID = userData.userID; // Replace with actual user ID if available
            await instance.post('/quizMarks/add', {
                quizPackageID,
                userID,
                marks: score
            });
            alert(`Quiz completed! Your score: ${score}`);
            navigate('/selectQuizPackage'); // Redirect to a result page or back to quiz selection
        } catch (error) {
            console.error('Failed to submit score:', error);
            alert('Error submitting score.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-4">Quiz</h1>
                {quizzes.length > 0 && currentQuizIndex < quizzes.length ? (
                    <div>
                        <h2 className="text-lg font-semibold mb-3">{quizzes[currentQuizIndex].quiz}</h2>
                        {Array.from({ length: 4 }, (_, i) => i + 1).map(number => (
                            <button key={number}
                                onClick={() => handleAnswer(number)}
                                className="block w-full text-left px-4 py-2 mt-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300">
                                {quizzes[currentQuizIndex][`answer${number}`]}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Loading quizzes...</p>
                )}
            </div>
        </div>
    );
};

export default QuizPlay;
