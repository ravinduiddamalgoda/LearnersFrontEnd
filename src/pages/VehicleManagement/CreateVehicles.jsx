import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateVehicles = () => {
  const [vehicleID, setvehicleID] = useState('');
  const [vehicleNO, setVehicleNO] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [transmissionType, setTransmissionType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [availability, setAvailability] = useState(false); 
  const [studentCnt, setStudentCnt] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [invalidVehicleNO, setInvalidVehicleNO] = useState(false); // State for invalid vehicle number

  const validateVehicleNO = (value) => {
    const regex = /^[A-Za-z]{2,3}\d{4}$/;
    return regex.test(value);
  };

  const handleSaveVehicle = async () => {
    // Validate all fields
    if (!vehicleID || !vehicleNO || !vehicleType || !transmissionType || !fuelType || !studentCnt) {
      Swal.fire({
        icon: 'error',
        title: 'All fields are required',
      });
      return;
    }
  
    // Validate vehicle number format
    if (!validateVehicleNO(vehicleNO)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Vehicle Number',
      });
      return;
    }
  
    const data = {
      vehicleID,
      vehicleNO,
      vehicleType,
      transmissionType,
      fuelType,
      availability, 
      studentCnt,
    };
    setLoading(true);
  
    try {
      // Attempt to add the vehicle
      await axios.post('http://localhost:3000/vehicle/add', data);
      setLoading(false);
      // Display success SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Vehicle created successfully',
      }).then((result) => {
        // Navigate to the home page after dismissing the SweetAlert
        if (result.isConfirmed || result.isDismissed) {
          navigate('/');
        }
      });
    } catch (error) {
      setLoading(false);
      // Display error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Vehicle no already exists',
      });
      console.error(error);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Vehicle</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Vehicle Id</label>
          <input
            type='text'
            value={vehicleID}
            onChange={(e) => setvehicleID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className={`my-4 ${invalidVehicleNO ? 'border-red-500' : ''}`}>
          <label className='text-xl mr-4 text-gray-500'>Vehicle NO</label>
          <input
            type='text'
            value={vehicleNO}
            onChange={(e) => {
              setVehicleNO(e.target.value);
              setInvalidVehicleNO(!validateVehicleNO(e.target.value));
            }}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${invalidVehicleNO ? 'border-red-500' : ''}`}
          />
          {invalidVehicleNO && (
            <p className="text-red-500">Invalid vehicle number format. Please enter a valid vehicle number.</p>
          )}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Vehicle Type</label>
          <input
            type='text'
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Transmission Type</label>
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
          <label className='text-xl mr-4 text-gray-500'>Fuel Type</label>
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          >
            <option value=''>Select Fuel Type</option>
            <option value='petrol'>Petrol</option>
            <option value='diesel'>Diesel</option>
          </select>
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Availability</label>
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
          <label className='text-xl mr-4 text-gray-500'>Student Capacity</label>
          <input
            type='number'
            value={studentCnt}
            onChange={(e) => setStudentCnt(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <p className="text-red-500">*All fields are required</p>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveVehicle}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateVehicles;
