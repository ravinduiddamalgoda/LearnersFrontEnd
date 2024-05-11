import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Spinner from "../../Components/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // Filter payments based on search term
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
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getStringUnitWidth('Sarasavi Driving School') * doc.internal.getFontSize() / doc.internal.scaleFactor;

    // Add title
    doc.setFontSize(18);
    // Calculate center position for the text
    const textX = (pageWidth - textWidth) / 2;
    doc.text('Sarasavi Driving School', textX, 50);
    // Add Revenue Report title
    doc.text('Revenue Report', textX, 80);
    
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
      startY: 120, // Adjusted startY to leave space below the title
      head: tableHeaders,
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 }
    });
  
    // Add total revenue
    doc.setFontSize(12);
    doc.text(`Total Revenue: Rs.${totalRevenue.toFixed(2)}`, textX, doc.autoTable.previous.finalY + 20); // Adjusted Y position for total revenue
    // Save PDF
    doc.save('monthly_revenue_report.pdf');
};

  
  // Define notify function outside of sendEmail function
  const notify = () => toast.success('Email sent successfully!');

  const sendEmail = () => {
    const emailData = {
      to: 'divyanipiyathilaka15@gmail.com', // Admin email
      subject: 'Revenue Report', // Email subject
      html: `
      <h1>Sarasavi Driving School</h1>
      <h2>Revenue Report</h2>
     
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Payment ID</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Payment Type</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Date</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Student Name</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Remarks</th>
            <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${filteredByDate.map(payment => `
            <tr>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${payment.paymentID}</td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${payment.paymentType}</td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${new Date(payment.dateTime).toLocaleDateString()}</td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${payment.studentName}</td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${payment.remarks}</td>
              <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${payment.Amount}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <p>Total Revenue: Rs ${totalRevenue.toFixed(2)}</p>
      `
    };

    axios.post('http://localhost:3000/revenue/send-email', emailData)
      .then(response => {
        console.log(response.data.message);
        notify(); // Call the notify function here
        // Optionally, show a success message to the user
      })
      .catch(error => {
        console.error('Error sending email:', error);
        // Optionally, show an error message to the user
      });
  };

  return (
    <div className='p-4'>
      
      <h1 className='text-7xl my-10 font-bold text-black-700'>Revenue</h1>

      
      {loading ? <Spinner /> : ''}
      <div className='my-4 flex'>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 mb-4 mr-4'
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
          <tr className="bg-gray-200">
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
      
      <div className='my-4 flex justify-between'>
        <div>
        <button onClick={generatePDF} className='bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded mr-4' >
            Download Revenue Report (PDF)
          </button>
          <button onClick={sendEmail} className='bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded '>
            Send Mail
          </button>
          <ToastContainer />
        </div>
        <div className='flex justify-end'>
        <p className="text-xl font-bold text-red-500">Total Revenue: Rs {totalRevenue.toFixed(2)}</p>
      </div>
      </div>

    </div>
  );
};

export default RevenuePage;
