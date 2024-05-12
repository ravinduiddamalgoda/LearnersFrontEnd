import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import TrainingSide from "../Components/TrainingSide";
import instance from "../api";

const InstructorSalary = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [data, setData] = useState([]);
//   const [instructorInfo, setInstructorInfo] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const insID = currentUser?.InstructorID || "";

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, insID]);

  const fetchData = async () => {
    try {
      const response = await instance.get(`/salary/get/${insID}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

//   const fetchInstructorDetails = async () => {
//     try {
//       const response = await instance.get(`/instructor/details/${insID}`);
//       setInstructorInfo(response.data);
//     } catch (error) {
//       console.error("Error fetching instructor details:", error);
//     }
//   };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const baseFontSize = 12;
    const titleFontSize = 18;
    const lineSpacing = 10;
    const marginTop = 20;
    const marginLeft = 14;
    const pageWidth = doc.internal.pageSize.width;
  
    doc.setFontSize(titleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("Instructor Salary Report", marginLeft, marginTop);
  
    doc.setFontSize(baseFontSize);
    doc.setFont("helvetica", "normal");
  
    let yPos = marginTop + lineSpacing * 2;
  
    // Adding Instructor Details with horizontal line
    const details = [
      `Instructor: ${currentUser.InstructorName}`,
      `Email: ${currentUser.email}`,
      `Location: ${currentUser.InstructorLocation}`,
      `Experience: ${currentUser.InstructorExperience} years`,
      `Report Period: ${startDate} to ${endDate}`
    ];
  
    details.forEach(detail => {
      doc.text(detail, marginLeft, yPos);
      yPos += lineSpacing;
    });
  
    yPos += lineSpacing; // Extra space before salary details
    doc.setDrawColor(0); // Set draw color to black
    doc.setLineWidth(0.5); // Line width
    doc.line(marginLeft, yPos, pageWidth - marginLeft, yPos); // Draw line
    yPos += lineSpacing;
  
    // Salary Details Header
    doc.setFont("helvetica", "bold");
    doc.text("Salary Details", marginLeft, yPos);
    yPos += lineSpacing;
  
    // Draw header for salary details
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Date", marginLeft, yPos);
    doc.text("Salary", pageWidth / 2, yPos);
    yPos += lineSpacing / 2;
    doc.line(marginLeft, yPos, pageWidth - marginLeft, yPos); // Underline headers
    yPos += lineSpacing / 2;
  
    // Salary details in a table-like format
    doc.setFont("helvetica", "normal");
    data.forEach((item, index) => {
      const date = new Date(item.Date).toLocaleDateString();
      doc.text(date, marginLeft, yPos);
      doc.text(`Rs.${item.Salary}`, pageWidth / 2, yPos);
      yPos += lineSpacing;
    });
  
    // Check if we need a new page
    if (yPos > doc.internal.pageSize.height - 20) {
      doc.addPage();
      yPos = marginTop; // Reset Y position to top of new page
    }
  
    doc.save("salary-report.pdf");
  };
  
  

  return (
    <div className="flex flex-row">
      <TrainingSide />
      <div className="flex-grow p-8">
        <h2 className="text-center text-2xl font-semibold my-6">Instructor Salary Details</h2>
        <div className="max-w-md mx-auto bg-white shadow-lg p-4 rounded-lg">
          <div className="mb-6">
            <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-2">Start Date:</label>
            <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} className="form-input w-full border-gray-300 rounded-md shadow-sm"/>
          </div>
          <div className="mb-6">
            <label htmlFor="endDate" className="block text-gray-700 font-semibold mb-2">End Date:</label>
            <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} className="form-input w-full border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg mt-6 overflow-auto">
          {data.length > 0 ? data.map((item, index) => (
            <div key={index} className="my-2 p-2 border-b last:border-b-0">
              <p className="text-gray-600">Date: {new Date(item.Date).toLocaleDateString()}</p>
              <p className="text-gray-900 font-semibold">Salary: Rs.{item.Salary}</p>
            </div>
          )) : (
            <p className="text-center text-gray-500">No data available for selected dates.</p>
          )}
        </div>
        <div className="text-center mt-8">
          <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg">Generate PDF Report</button>
        </div>
      </div>
    </div>
  );
};

export default InstructorSalary;
