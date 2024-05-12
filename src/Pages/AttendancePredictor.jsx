import React, { useState } from 'react';
import axios from 'axios';

const AttendancePredictor = () => {
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [registrations, setRegistrations] = useState('');
  const [predictedRate, setPredictedRate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://15.228.239.32:5000/predict', {
        'Day of the Week': dayOfWeek,
        'Time of Day': timeOfDay,
        'Student Registrations': parseInt(registrations, 10)
      });
      setPredictedRate(response.data.predicted_attendance_rate * 100);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg h-min">
      <h2 className="text-lg font-bold mb-4">Predict Attendance Rate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700">Day of the Week:</label>
          <input
            id="dayOfWeek"
            type="text"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="e.g., Monday"
            required
          />
        </div>
        <div>
          <label htmlFor="timeOfDay" className="block text-sm font-medium text-gray-700">Time of Day:</label>
          <input
            id="timeOfDay"
            type="text"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="e.g., 09:00"
            required
          />
        </div>
        <div>
          <label htmlFor="registrations" className="block text-sm font-medium text-gray-700">Student Registrations:</label>
          <input
            id="registrations"
            type="number"
            value={registrations}
            onChange={(e) => setRegistrations(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button type="submit" className={`mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50' : ''}`} disabled={loading}>
          {loading ? 'Loading...' : 'Predict'}
        </button>
      </form>
      {predictedRate !== null && (
        <div className={`mt-4 p-3 text-center text-lg font-semibold ${predictedRate < 85 ? 'text-red-500' : 'text-green-500'}`}>
          Predicted Attendance Rate: {predictedRate.toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default AttendancePredictor;
