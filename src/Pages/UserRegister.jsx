import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {
    const [uname, setuname] = useState('');
    const [pswrd, setpswrd] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [address, setaddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/user/registerUser', {
                username: "thilankanew1",
                password: "thilankanew1",
                email: "thilankanew1@gmail.com",
                phoneNumber: "94765942820",
                address: "Kurunegala",
                gender: "Male",
                firstName: "Thilanka",
                lastName: "Wijesingha"
            });

            localStorage.setItem('user', JSON.stringify(response.data));

            const user = JSON.parse(localStorage.getItem('user'));

            console.log("User registered successfully:", user);

            navigate('/')

        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div>
            <div className='font-poppins'>
                <div className='text-[30px] font-[500] mb-[30px]'>Sign up</div>
                <div>
                    <div className='flex flex-col justify-center items-center gap-[20px]'>
                        <input
                            type='text'
                            placeholder='Username'
                            onChange={(e) => { setuname(e.target.value); }}
                            className='w-[500px] py-[10px] rounded-full bg-transparent outline-none' />
                        <input
                            type='password'
                            placeholder='Password'
                            onChange={(e) => { setpswrd(e.target.value); }}
                            className='w-[500px] py-[10px] rounded-full bg-transparent outline-none' />
                        <input
                            type='email'
                            placeholder='Email'
                            onChange={(e) => { setemail(e.target.value); }}
                            className='w-[500px] py-[10px] rounded-full bg-transparent outline-none' />
                        <input
                            type='tel'
                            placeholder='Phone Number'
                            onChange={(e) => { setphone(e.target.value); }}
                            className='w-[500px] py-[10px] rounded-full bg-transparent outline-none' />
                        <input
                            type='text'
                            placeholder='Address'
                            onChange={(e) => { setaddress(e.target.value); }}
                            className='w-[500px] py-[10px] rounded-full bg-transparent outline-none' />
                        <input
                            type='text'
                            placeholder='First Name'
                            onChange={(e) => { setFirstName(e.target.value); }}
                            className='w-[500px] py-[10px] rounded-full bg-transparent outline-none' />
                        <input
                            type='text'
                            placeholder='Last name'
                            onChange={(e) => { setLastName(e.target.value); }}
                            className='w-[500px] py-[10px] rounded-full bg-transparent outline-none' />
                        <select
                            onChange={(e) => { setGender(e.target.value); }}
                            className='w-[500px] py-[10px] rounded-full bg-transparent outline-none'>
                            <option value='' disabled>Select Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </select>
                        <input
                            type='button'
                            value='Submit'
                            onClick={handleSubmit}
                            className='w-[500px] py-[10px] cursor-pointer mt-[10px] text-white text-center bg-[#000000] rounded-full bg-transparent outline-none' />
                    </div>
                </div>
            </div>
        </div>
    );
}
