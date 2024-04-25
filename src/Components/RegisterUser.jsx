import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function RegisterUser() {
    const Navigate = useNavigate();
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const mobileRegex = /^(94)[0-9]{9}$/;
        if (!values.username) {
            errors.username = 'Username is required!';
        }
        if (!values.email) {
            errors.email = 'Email is required!';
        } else if (!regex.test(values.email)) {
            errors.email = 'This is not a valid email format!';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 4) {
            errors.password = 'Password must be more than 4 characters';
        } else if (values.password.length > 10) {
            errors.password = 'Password cannot exceed more than 10 characters';
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Those passwords didn’t match. Try again.";
        }
        if (!values.mobileNumber) {
            errors.mobileNumber = 'Mobile number is required!';
        } else if (!mobileRegex.test(values.mobileNumber)) {
            errors.mobileNumber = 'Mobile number should start with "94" and be 11 digits long';
        }
        return errors;
    };

    return (
        <div div className="bg-auto bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
                {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">Signed in successfully</span>
                    </div>
                ) : (
                    <p className="text-red-500">Entered Details: {JSON.stringify(formValues)}</p>
                )} */}

                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold mb-4 flex justify-center">Sign Up</h1>
                    <div className="border-b border-gray-300 mb-4"></div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Choose a username"
                                value={formValues.username}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                            <p className="text-red-500">{formErrors.username}</p>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="xxx@gamil.com"
                                value={formValues.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                            <p className="text-red-500">{formErrors.email}</p>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                            <p className="text-red-500">{formErrors.password}</p>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                            <p className="text-red-500">{formErrors.confirmPassword}</p>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Mobile Number</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                placeholder="94XXXXXXXXX"
                                value={formValues.mobileNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                            <p className="text-red-500">{formErrors.mobileNumber}</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Submit</button>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    Already have an account? <span className="text-blue-500" onClick={()=> Navigate("/login")}>Login</span>
                </div>
            </div>
        </div>
    );
}

export default RegisterUser;
