import React, { useState } from 'react';
import BackButton from '../../Components/BackButton';
import Spinner from '../../Components/Spinner';
import axios from 'axios';
import { useNavigate , useParams} from 'react-router-dom';

const DeleteVehicle = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteVehicle = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/vehicle/delete/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/vehicles/home');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }
  return (
    <div className = 'p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Vehicle</h1> 
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this vehicle?</h3>

        <button
        className='p-4 bg-red-600 text-white m-8 w-full'
        onClick={handleDeleteVehicle}
        >
          Yes, Delete it
        </button>
      </div>
      </div> 
  )
}

export default DeleteVehicle