import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TrainingSide from "../Components/TrainingSide";
import instance from "../api";

const UpdatePTS = () => {
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [selectedPTSID, setSelectedPTSID] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await instance.get(`/pts`);
        setTrainings(response.data);
        setFilteredTrainings(response.data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };
    fetchTrainings();
  }, []);

  useEffect(() => {
    if (searchDate) {
      const filtered = trainings.filter(training =>
        new Date(training.date).toLocaleDateString() === new Date(searchDate).toLocaleDateString()
      );
      setFilteredTrainings(filtered);
    } else {
      setFilteredTrainings(trainings);
    }
  }, [searchDate, trainings]);

  const formik = useFormik({
    initialValues: {
      date: '',
      time: '',
      location: '',
      vehicleID: '',
      maxCount: '',
      status: '',
    },
    validationSchema: Yup.object({
      date: Yup.date().required('Date is required'),
      time: Yup.string().required('Time is required'),
      location: Yup.string().required('Location is required'),
      vehicleID: Yup.string().required('Vehicle ID is required'),
      maxCount: Yup.number().required('Max participants are required').min(1).max(20),
      status: Yup.string().required('Status is required'),
    }),
    onSubmit: values => {
      console.log("Updated Values:", values);
      try {
        const data = instance.put(`/pts/${selectedPTSID}`, values).then(response => {
          alert("Training session updated successfully");
          fetchTrainings();
          setSelectedPTSID("");
          formik.resetForm();
        });
        if (!data) {
          throw new Error("Failed to update training session");
        }
      } catch (error) {
        console.error("Error updating training session:", error);
        alert("Error updating training session");
      }
    },
  });

  return (
    <div className="flex flex-row">
      <TrainingSide /> {/* Assumed sidebar for navigation or training categories */}
      <div className="flex-grow p-4">
        <div className="mb-6">
          <input 
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
            placeholder="Filter by Date"
          />
        </div>
        <div className="flex overflow-x-auto space-x-4">
          {filteredTrainings.map((training) => (
            <div
              key={training.sessionID}
              className="min-w-max bg-white p-4 rounded-lg shadow-lg cursor-pointer"
              onClick={() => {
                setSelectedPTSID(training.sessionID);
                formik.setValues({
                  date: training.date.split('T')[0],  // assuming date comes in ISO format
                  time: training.time,
                  location: training.location,
                  vehicleID: training.vehicleID,
                  maxCount: training.maxCount,
                  status: training.status,
                });
              }}
            >
              <h3 className="text-lg font-semibold">{`Training on ${new Date(training.date).toLocaleDateString()} at ${training.time}`}</h3>
              <p>Location: {training.location}</p>
              <p>Instructor ID: {training.instructorID}</p>
              <p>Vehicle ID: {training.vehicleID}</p>
              <p>Max Participants: {training.maxCount}</p>
              <p>Current Count: {training.currentCount}</p>
              <p>Status: {training.status}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-lg">
          {selectedPTSID ? (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Update Training Session</h2>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
              <input type="date" id="date" className="border border-gray-300 p-2 rounded-lg w-full" {...formik.getFieldProps('date')} />
              {formik.touched.date && formik.errors.date && <p className="text-red-500 text-xs">{formik.errors.date}</p>}
              
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time:</label>
              <input type="time" id="time" className="border border-gray-300 p-2 rounded-lg w-full" {...formik.getFieldProps('time')} />
              {formik.touched.time && formik.errors.time && <p className="text-red-500 text-xs">{formik.errors.time}</p>}
              
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
              <input type="text" id="location" className="border border-gray-300 p-2 rounded-lg w-full" {...formik.getFieldProps('location')} />
              {formik.touched.location && formik.errors.location && <p className="text-red-500 text-xs">{formik.errors.location}</p>}
              
              <label htmlFor="vehicleID" className="block text-sm font-medium text-gray-700">Vehicle ID:</label>
              <input type="text" id="vehicleID" className="border border-gray-300 p-2 rounded-lg w-full" {...formik.getFieldProps('vehicleID')} />
              {formik.touched.vehicleID && formik.errors.vehicleID && <p className="text-red-500 text-xs">{formik.errors.vehicleID}</p>}
              
              <label htmlFor="maxCount" className="block text-sm font-medium text-gray-700">Max Participants:</label>
              <input type="number" id="maxCount" className="border border-gray-300 p-2 rounded-lg w-full" {...formik.getFieldProps('maxCount')} />
              {formik.touched.maxCount && formik.errors.maxCount && <p className="text-red-500 text-xs">{formik.errors.maxCount}</p>}
              
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status:</label>
              <select id="status" className="border border-gray-300 p-2 rounded-lg w-full" {...formik.getFieldProps('status')}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              {formik.touched.status && formik.errors.status && <p className="text-red-500 text-xs">{formik.errors.status}</p>}
              
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Update Session</button>
            </form>
          ) : (
            <p className="text-gray-700">Please select a session to update.</p>
          )}
        </div>
      </div>
    </div>
  );  
};

export default UpdatePTS;
