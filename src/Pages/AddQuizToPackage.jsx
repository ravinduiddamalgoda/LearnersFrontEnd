import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddQuizToPackage = () => {
    const [packages, setPackages] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const packagesResponse = await axios.get('/api/packages');
                const quizzesResponse = await axios.get('/api/quizzes');
                setPackages(packagesResponse.data);
                setQuizzes(quizzesResponse.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddQuizToPackage = async () => {
        try {
            const response = await axios.post(`/api/packages/${selectedPackage}/add-quiz`, { quiz: selectedQuiz });
            console.log('Quiz added to package:', response.data);
            // Add any additional UI updates or notifications
        } catch (error) {
            console.error('Error adding quiz to package:', error);
            // Handle error
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Add Quiz to Package</h1>
            <div>
                <h2>Packages</h2>
                <select value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
                    <option value="">Select a package</option>
                    {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                            {pkg.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h2>Quizzes</h2>
                <table>
                    <td>
                        <th>Quiz Name</th>
                        <th>Action</th>
                    </td>
                    {quizzes.map((quiz) => (
                        <tr key={quiz.id}>
                            <td>{quiz.name}</td>
                            <td>
                                <button onClick={() => handleAddQuizToPackage(quiz.id)}>Add to Package</button>
                            </td>
                        </tr>
                    ))}
                </table>
                {/* <select value={selectedQuiz} onChange={(e) => setSelectedQuiz(e.target.value)}>
                    <option value="">Select a quiz</option>
                    {quizzes.map((quiz) => (
                        <option key={quiz.id} value={quiz.id}>
                            {quiz.name}
                        </option>
                    ))}
                </select> */}
            </div>
            <button onClick={handleAddQuizToPackage}>Add Quiz to Package</button>
        </div>
    );
};

export default AddQuizToPackage;
