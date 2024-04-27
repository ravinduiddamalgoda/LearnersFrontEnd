import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import instance from '../api';

const AddQuizPackages = () => {
    const [packageName, setPackageName] = useState('');
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuizzes, setSelectedQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuizzes();
    }, [quizzes]);

    const fetchQuizzes = async () => {
        try {
            const response = await instance.get('/quiz/getAllQuizes');
            // console.log(response.data)
            setQuizzes(response.data);
            console.log(quizzes)
            // if(response?.data && response.ok){
            //     setQuizzes(response.data);
            //     console.log(quizzes)
            // }
            
           
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    const handlePackageCreation = async () => {
        try {
            const response = await instance.post('/quizPackages/add', { quizPackage: packageName, quizzes: selectedQuizzes });
            alert('Package created successfully');
            navigate('/'); // Navigate to package listing or dashboard
        } catch (error) {
            console.error('Error creating quiz package:', error);
        }
    };

    const handleQuizSelection = (quizId) => {
        setSelectedQuizzes(prev => [...prev, quizId]);
    };

    return (
        <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl font-bold text-center mb-6">Create New Quiz Package</h1>
        <div className="mb-4">
            <input
                type="text"
                placeholder="Enter package name"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
        </div>
        <div className="mb-6 text-center">
            <button onClick={handlePackageCreation} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                Create Package
            </button>
        </div>
        <div className="overflow-y-auto h-96 border-t border-b border-gray-300">
            {quizzes.map((quiz) => (
                <div key={quiz._id} className="p-4 hover:bg-gray-50">
                    <p className="text-lg font-medium">{quiz.quiz}</p>
                    <button onClick={() => handleQuizSelection(quiz._id)} className="mt-2 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Add to Package
                    </button>
                </div>
            ))}
        </div>
    </div>
    
    );
};

export default AddQuizPackages;
