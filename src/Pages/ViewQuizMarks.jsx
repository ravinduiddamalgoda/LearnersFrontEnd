import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import UserSideBar from '../Components/UserSideBar';
import instance from '../api';

const ViewQuizMarks = () => {
    const [quizMarks, setQuizMarks] = useState([]);
    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchQuizMarks = async () => {
            try {
                const response = await instance.get(`/quizMarks/get/${userData.userID}`);
                setQuizMarks(response.data);
            } catch (error) {
                console.error('Failed to fetch quiz marks:', error);
            }
        };

        fetchQuizMarks();
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('Quiz Marks Report', pageWidth / 2, 20, null, null, 'center');

        const tableColumn = ["Quiz Package ID", "User ID", "Marks"];
        const tableRows = [];

        quizMarks.forEach(mark => {
            const quizRow = [
                mark.quizPackageID,
                mark.userID,
                mark.marks.toString(),
            ];
            tableRows.push(quizRow);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        
        doc.save('quiz-marks-report.pdf');
    };

    return (
        <div className='flex flex-row'>
            <UserSideBar />
            <div className="p-4">
                <h1 className="text-center text-3xl font-bold mb-4">Quiz Marks</h1>
                <div>
                    {quizMarks.map((mark, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded my-2">
                            <p>Quiz Package ID: {mark.quizPackageID}</p>
                            <p>User ID: {mark.userID}</p>
                            <p>Marks: {mark.marks}</p>
                        </div>
                    ))}
                </div>
                <button onClick={generatePDF} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Generate Report
                </button>
            </div>
        </div>
    );
};

export default ViewQuizMarks;
