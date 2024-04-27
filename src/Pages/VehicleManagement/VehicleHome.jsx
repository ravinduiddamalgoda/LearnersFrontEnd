import React, { useEffect, useState } from "react";
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

        //console.log(vehicles);
}, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Vehicles</h1>
        <Link to="/vehicles/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2 ">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">Vehicle Id</th>
              <th className="border border-slate-600 rounded-md">Vehicle No</th>
              <th className="border border-slate-600 rounded-md ">
                Vehicle Type
              </th>
              <th className="border border-slate-600 rounded-md ">
                Transmission Type
              </th>
              <th className="border border-slate-600 rounded-md ">Fuel Type</th>
              <th className="border border-slate-600 rounded-md ">
                Availability
              </th>
              <th className="border border-slate-600 rounded-md ">
                Student Capacity
              </th>
              <th className="border border-slate-600 rounded-md ">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {vehicle.vehicleNO}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {vehicle.vehicleType}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {vehicle.transmissionType}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {vehicle.fuelType}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {vehicle.availability.toString()}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {vehicle.studentCnt}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
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
