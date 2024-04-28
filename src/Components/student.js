import { useState } from "react";
import axios from "axios";
import './student.css'

function Student() {
    const [order, setOrder] = useState({
        fname: "",
        s_email: "",
        regno: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        // Regular expression for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        const emailValid = validateEmail(order.s_email);
        if (!emailValid) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                s_email: "Invalid email address",
            }));
            return;
        }

        // If email is valid, submit the form
        try {
            const response = await axios.post("http://localhost:8020/create_user", order);
            console.log(response);
            alert("Successfully submitted!");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="add-order">
            <h2>Student Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input type="text" id="fname" name="fname" onChange={handleChange} /><br />
                <label>Email:</label>
                <input type="text" id="s_email" name="s_email" onChange={handleChange} />
                {errors.s_email && <span className="error">{errors.s_email}</span>}<br />
                <label>Registration Number:</label>
                <input type="text" id="regno" name="regno" onChange={handleChange} /><br />
                <label>Message:</label>
                <textarea id="message" name="message" onChange={handleChange}></textarea><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Student;
