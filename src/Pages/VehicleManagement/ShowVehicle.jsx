import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
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
      <BackButton />
      <h1 className='text-3xl my-4'>Show Vehicle</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Vehicle Id</span>
            <span>{vehicle._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Vehicle No</span>
            <span>{vehicle.vehicleNO}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Vehicle Type</span>
            <span>{vehicle.vehicleType}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Transmission Type</span>
            <span>{vehicle.transmissionType}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Fuel Type</span>
            <span>{vehicle.fuelType}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Availability</span>
            <span>{availabilityString}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Student Capacity</span>
            <span>{vehicle.studentCnt}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowVehicle;
