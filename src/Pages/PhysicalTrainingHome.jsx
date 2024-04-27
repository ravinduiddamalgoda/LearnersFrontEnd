import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TrainingSide from "../Components/TrainingSide";
import ViewTrainings from "../Components/ViewTrainings";

// Validation Schema using Yup
const validationSchema = Yup.object({
  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Date cannot be in the past"),
  time: Yup.string().required("Time is required"),
  location: Yup.string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters long"),
  vehicleID: Yup.string().required("Vehicle ID is required"),
  maxParticipants: Yup.number()
    .required("Maximum number of participants is required")
    .min(1, "At least one participant is required")
    .max(100, "Cannot exceed 100 participants"),
});

// useEffect(()=> {
//     const fetchVehicleData = async () => {

//     }

// } , [])

const PhysicalTrainingHome = () => {
    

    // useEffect(()=> {
    //     const fetchSessionData = async () => {

    //     }
    // } , [])


  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
      location: "",
      maxParticipants: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // Implement submission logic here
    },
  });

  return (
    <div className="w-full flex flex-row">
      <TrainingSide />
      <div className="mx-2">
        <div className="bg-gray-100 p-4 mt-6 ">
          <h1 className="font-bold text-gray-800 text-center text-3xl">
            Welcome to Training Sessions
          </h1>
          <div className="flex flex-col">
            <div className="mx-10 w-72">
              <h1>Add a Training Session </h1>
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-6 mx-auto"
              >
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.date}
                  className="border p-1 rounded w-full"
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.date}
                  </div>
                ) : null}

                <label htmlFor="time">Time</label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  onChange={formik.handleChange}
                  value={formik.values.time}
                  className="border p-1 rounded w-full"
                />
                {formik.touched.time && formik.errors.time ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.time}
                  </div>
                ) : null}

                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  className="border p-1 rounded w-full"
                />
                {formik.touched.location && formik.errors.location ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.location}
                  </div>
                ) : null}
                <label htmlFor="vehicleID">Vehicle ID</label>
                <select>
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                </select>
                <br />
                <label htmlFor="maxParticipants">Max Participants</label>
                <input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.maxParticipants}
                  className="border p-1 rounded w-full"
                />
                {formik.touched.maxParticipants &&
                formik.errors.maxParticipants ? (
                  <div className="text-red-500 text-xs">
                    {formik.errors.maxParticipants}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Schedule Session
                </button>
              </form>
            </div>
            <div className="flex ">
                <ViewTrainings/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalTrainingHome;
