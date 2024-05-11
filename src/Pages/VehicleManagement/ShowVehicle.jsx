import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Spinner from '../../Components/Spinner';

const ShowVehicle = () => {
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/vehicle/get/${id}`)
      .then((response) => {
        console.log(id);
        console.log(response.data);
        setVehicle(response.data.vehicle);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const availabilityString = vehicle.availability ? 'true' : 'false';

  return (
    <div className='p-4'>
      
      <h1 className='text-6xl my-4 font-bold text-black-700'>Show Vehicle</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4 flex'>
            <span className='text-xl text-gray-500 font-bold' style={{ width: '150px' }}>Vehicle Id</span>
            <span className='font-bold'>{vehicle._id}</span>
          </div>
          <div className='my-4 flex'>
            <span className='text-xl text-gray-500 font-bold' style={{ width: '150px' }}>Vehicle No</span>
            <span className='font-bold'>{vehicle.vehicleNO}</span>
          </div>
          <div className='my-4 flex'>
            <span className='text-xl text-gray-500 font-bold' style={{ width: '150px' }}>Vehicle Type</span>
            <span className='font-bold'>{vehicle.vehicleType}</span>
          </div>
          <div className='my-4 flex'>
            <span className='text-xl text-gray-500 font-bold' style={{ width: '150px' }}>Transmission Type</span>
            <span className='font-bold'>{vehicle.transmissionType}</span>
          </div>
          <div className='my-4 flex'>
            <span className='text-xl text-gray-500 font-bold' style={{ width: '150px' }}>Fuel Type</span>
            <span className='font-bold'>{vehicle.fuelType}</span>
          </div>
          <div className='my-4 flex'>
            <span className='text-xl text-gray-500 font-bold' style={{ width: '150px' }}>Availability</span>
            <span className='font-bold'>{availabilityString}</span>
          </div>
          <div className='my-4 flex'>
            <span className='text-xl text-gray-500 font-bold' style={{ width: '150px' }}>Student Capacity  </span>
            <span className='font-bold'>{vehicle.studentCnt}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowVehicle;