import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../api';
import UserSideBar from '../Components/UserSideBar';

const SelectQuizPackage = () => {
    const [quizPackages, setQuizPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizPackages = async () => {
            try {
                const response = await instance.get('/quizPackage/');
                setQuizPackages(response.data);
            } catch (error) {
                console.error('Failed to fetch quiz packages:', error);
            }
        };
        fetchQuizPackages();
    }, []);

    const handleSelectPackage = (quizPackageID) => {
        // Navigate to playQuiz page with the selected quiz package ID
        navigate(`/playQuiz/${quizPackageID}`);
    };

    return (
        <div className='flex flex-row'>
            <UserSideBar />
            <div className='flex-grow p-4'>
                <h1 className='text-xl font-bold mb-4'>Select a Quiz Package</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {quizPackages.map(quizPackage => (
                        <div key={quizPackage.quizPackageID} className='card bg-white shadow-md rounded p-4 cursor-pointer' onClick={() => handleSelectPackage(quizPackage.quizPackageID)}>
                            <h2 className='text-lg font-semibold'>{quizPackage.quizPackage}</h2>
                            <p>{quizPackage.quizzes.length} Quizzes</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectQuizPackage;
