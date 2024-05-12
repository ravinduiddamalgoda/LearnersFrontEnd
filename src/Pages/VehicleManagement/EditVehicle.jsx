import React, { useState, useEffect } from 'react';

import Spinner from '../../Components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditVehicle = () => {
  const [vehicleNO, setVehicleNO] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [availability, setAvailability] = useState('');
  const [studentCnt, setStudentCnt] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalidVehicleNO, setInvalidVehicleNO] = useState(false); // State for invalid vehicle number
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/vehicle/get/${id}`)
      .then((response) => {
        const vehicleData = response.data.vehicle;
        setVehicleNO(vehicleData.vehicleNO);
        setVehicleType(vehicleData.vehicleType);
        setTransmissionType(vehicleData.transmissionType);
        setFuelType(vehicleData.fuelType);
        setAvailability(vehicleData.availability);
        setStudentCnt(vehicleData.studentCnt);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const validateVehicleNO = (value) => {
    const regex = /^[A-Za-z]{2,3}\d{4}$/;
    return regex.test(value);
  };

  const handleVehicleNOChange = (value) => {
    setVehicleNO(value);
    // Check if the entered vehicle number is invalid and set the state accordingly
    setInvalidVehicleNO(!validateVehicleNO(value));
  };
  
  const handleEditVehicle = () => {
    if (!vehicleNO || !vehicleType || !transmissionType || !fuelType || !studentCnt) {
      Swal.fire({
        icon: 'error',
        title: 'All fields are required',
      });
      return;
    }

    if (!validateVehicleNO(vehicleNO)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Vehicle Number',
      });
      return;
    }
    
    const data = {
      vehicleNO,
      vehicleType,
      transmissionType,
      fuelType,
      availability,
      studentCnt,
    };
    setLoading(true);
    axios.put(`http://localhost:3000/vehicle/update/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/vehicles/home');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 400 && error.response.data.error === 'Vehicle number already exists') {
          // Display SweetAlert if the vehicle number already exists in the database
          Swal.fire({
            icon: 'error',
            title: 'Vehicle number already exists',
          });
        } else {
          // Display generic error alert
          Swal.fire({
            icon: 'error',
            title: 'An error occurred',
            text: 'Please check the console for details.',
          });
        }
        console.error(error);
      });
  };

  return (
    <div className='p-4'>
     
      <h1 className='text-6xl my-4 font-bold text-black-700 flex justify-center'>Edit Vehicle</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Vehicle NO</label>
          <input
            type='text'
            value={vehicleNO}
            onChange={(e) => handleVehicleNOChange(e.target.value)}
            className={`border-2 ${invalidVehicleNO ? 'border-red-500' : 'border-gray-500'} px-4 py-2 w-full`}
          />
          {invalidVehicleNO && (
            <p className="text-red-500">Invalid vehicle number format. Please enter a valid vehicle number.</p>
          )}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Vehicle Type</label>
          <input
            type='text'
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Transmission Type</label>
          <select
            value={transmissionType}
            onChange={(e) => setTransmissionType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value=''>Select Transmission Type</option>
            <option value='Auto'>Auto</option>
            <option value='Manual'>Manual</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Fuel Type</label>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value=''>Select Fuel Type</option>
            <option value='Petrol'>Petrol</option>
            <option value='Diesel'>Diesel</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Availability</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value === 'true')}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500 font-bold'>Student Capacity</label>
          <input
            type='number'
            value={studentCnt}
            onChange={(e) => setStudentCnt(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <p className="text-red-500">*All fields are required</p>
        <button className='p-2 bg-blue-950 text-black hover:bg-blue-900 hover:text-white m-10' onClick={handleEditVehicle}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditVehicle;
