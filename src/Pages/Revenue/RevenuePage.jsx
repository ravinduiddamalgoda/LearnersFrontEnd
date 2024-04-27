import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import BackButton from "../../Components/BackButton";
import Spinner from "../../Components/Spinner";



const RevenuePage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    setLoading(true);
    // Fetch payments data from the server
    axios.get('http://localhost:3000/revenue/payments')
      .then(response => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching payments:', error);
        setLoading(false);
      });
  }, []);

  const filteredPayments = payments.filter(payment =>
    payment.paymentID.includes(searchTerm) ||
    payment.paymentType.includes(searchTerm) ||
    payment.studentName.includes(searchTerm) ||
    payment.remarks.includes(searchTerm)
  );

  const filteredByDate = filteredPayments.filter(payment => {
    if (startDate && endDate) {
      const paymentDate = new Date(payment.dateTime);
      return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
    }
    return true;
  });

  // Calculate total revenue
  const totalRevenue = filteredByDate.reduce((acc, curr) => acc + curr.Amount, 0);

  const generatePDF = () => {
    // Generate PDF content
    const doc = new jsPDF('p', 'pt', 'letter');
    
    // Add title
    doc.setFontSize(18);
    doc.text('Monthly Revenue Report', 40, 50);
    
    // Add total revenue
    doc.setFontSize(12);
    doc.text(`Total Revenue: Rs.${totalRevenue.toFixed(2)}`, 40, 80);
  
    // Add table headers
    const tableHeaders = [['Payment ID', 'Payment Type', 'Date', 'Student Name', 'Remarks', 'Amount']];
  
    // Add table data
    const tableData = filteredByDate.map(payment => [
      payment.paymentID,
      payment.paymentType,
      new Date(payment.dateTime).toLocaleDateString(),
      payment.studentName,
      payment.remarks,
      payment.Amount.toFixed(2)
    ]);
  
    // Add table
    doc.autoTable({
      startY: 100,
      head: tableHeaders,
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 }
    });
  
    // Save PDF
    doc.save('monthly_revenue_report.pdf');
  };
  

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Revenue</h1>
      {loading ? <Spinner /> : ''}
      <div className='my-4'>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 mb-4'
        />
        <div>
          <label className='mr-4'>Start Date:</label>
          <input
            type='date'
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2'
          />
          <label className='ml-4 mr-2'>End Date:</label>
          <input
            type='date'
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2'
          />
        </div>
      </div>

      <table className='border-collapse border border-gray-500 w-full'>
      <thead>
          <tr>
            <th className='border border-gray-500 px-4 py-2'>Payment ID</th>
            <th className='border border-gray-500 px-4 py-2'>Payment Type</th>
            <th className='border border-gray-500 px-4 py-2'>Date</th>
            <th className='border border-gray-500 px-4 py-2'>Student Name</th>
            <th className='border border-gray-500 px-4 py-2'>Remarks</th>
            <th className='border border-gray-500 px-4 py-2'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredByDate.map(payment => (
            <tr key={payment.paymentID}>
            <td className='border border-gray-500 px-4 py-2'>{payment.paymentID}</td>
            <td className='border border-gray-500 px-4 py-2'>{payment.paymentType}</td>
            <td className='border border-gray-500 px-4 py-2'>{new Date(payment.dateTime).toLocaleDateString()}</td>
            <td className='border border-gray-500 px-4 py-2'>{payment.studentName}</td>
            <td className='border border-gray-500 px-4 py-2'>{payment.remarks}</td>
            <td className='border border-gray-500 px-4 py-2'>{payment.Amount}</td>
          </tr>

          ))}
        </tbody>
      </table>
      
      <div className='my-4'>
        <p>Total Revenue: Rs {totalRevenue.toFixed(2)}</p>
      </div>

      <div className='mt-4'>
        <button onClick={generatePDF} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Download Revenue Report (PDF)
        </button>
      </div>
    </div>
  );
};

export default RevenuePage;
