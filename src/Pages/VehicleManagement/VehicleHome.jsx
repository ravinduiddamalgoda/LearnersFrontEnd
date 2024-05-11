import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const VehicleHome = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
        .get("http://localhost:3000/vehicle")
        .then((response) => {
            setVehicles(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
}, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className='text-7xl my-6 font-bold text-black-700 flex justify-center'>Vehicles</h1>
        <Link to="/vehicles/create">
        <button className="flex items-center bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" >
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
            <span className="ml-2">Add Vehicle</span>
          </button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-500 px-4 py-2">Vehicle Id</th>
              <th className="border border-gray-500 px-4 py-2">Vehicle No</th>
              <th className="border border-gray-500 px-4 py-2">Vehicle Type</th>
              <th className="border border-gray-500 px-4 py-2">Transmission Type</th>
              <th className="border border-gray-500 px-4 py-2">Fuel Type</th>
              <th className="border border-gray-500 px-4 py-2">Availability</th>
              <th className="border border-gray-500 px-4 py-2">Student Capacity</th>
              <th className="border border-gray-500 px-4 py-2">Operations</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle._id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border border-gray-500 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-500 px-4 py-2">{vehicle.vehicleNO}</td>
                <td className="border border-gray-500 px-4 py-2">{vehicle.vehicleType}</td>
                <td className="border border-gray-500 px-4 py-2">{vehicle.transmissionType}</td>
                <td className="border border-gray-500 px-4 py-2">{vehicle.fuelType}</td>
                <td className="border border-gray-500 px-4 py-2">{vehicle.availability.toString()}</td>
                <td className="border border-gray-500 px-4 py-2">{vehicle.studentCnt}</td>
                <td className="border border-gray-500 px-4 py-2">
                  <div className="flex justify-center gap-x-4">
                    <Link to={'/vehicles/details/' + vehicle._id}>
                      <BsInfoCircle className='text-green-800 text-2xl'/>
                    </Link>
                    <Link to = {'/vehicles/edit/' + vehicle._id}>
                      <AiOutlineEdit className="text-yellow-600 text-2xl" />
                    </Link>
                    <Link to={'/vehicles/delete/' + vehicle._id}>
                      <MdOutlineDelete className='text-red-600 text-2xl' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VehicleHome;
