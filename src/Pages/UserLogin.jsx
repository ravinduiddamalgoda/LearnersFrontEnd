import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {

    const [uname, setuname] = useState('')
    const [pswrd, setpswrd] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const username = uname;
            const password = pswrd; 

            const response = await axios.post('http://localhost:3000/user/login', { username, password });
            
            localStorage.setItem('user', JSON.stringify(response.data.user));
            alert("Login successful")
            navigate('/');
            //const user = JSON.parse(localStorage.getItem('user'));

            //console.log("User registered successfully:", user);

        } catch (error) {
            console.error("Login failed:", error.response.data.message);
        }
    };
    

  return (
    <div>
      <div className='font-poppins'>
        <div className='text-[30px] font-[500] mb-[30px]'>Sign in</div>
        <div>
            <div className='flex flex-col justify-center items-center gap-[20px]'>
                <input 
                    type='text' 
                    placeholder='Email' 
                    onChange={(e) => {setuname(e.target.value);}}
                    className='w-[500px] py-[10px] rounded-full bg-transparent outline-none'/>
                <input 
                    type='text' 
                    placeholder='Password' 
                    onChange={(e) => {setpswrd(e.target.value);}}
                    className='w-[500px] py-[10px] rounded-full bg-transparent outline-none'/>
                <input 
                    type='text' 
                    value='Submit'
                    onClick={handleSubmit}
                    className='w-[500px] py-[10px] cursor-pointer mt-[10px] text-white text-center bg-black rounded-full bg-transparent outline-none' />
            </div>
        </div>
      </div>
    </div>
  );
}
