import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './userupdate.css'

function UpdateStudnet(){
    const { id } = useParams();
    const [updateorder,setupdateorder]=useState({
      fname:"",
      lname:"",
      email:"",
      password:"",
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8020/order_user/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setupdateorder(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);



      const handleInputChange = (e) => {
        setupdateorder({
          ...updateorder,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:8020/update_user`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updateorder._id,
              ...updateorder,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            console.log(' updated successfully');
           alert(" updated successfully");

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(
        <div className='order-update'>

<h2> Update Details</h2><br></br>
<lable>Full Name:</lable>
    <input type="text" id="fname" name="fname"     onChange={handleInputChange} value={updateorder?.fname }
 /><br></br>
    <lable>Email :</lable>
    <input type="text" id="s_email" name="s_email"     onChange={handleInputChange} value={updateorder?.s_email }
 /><br></br>
    <lable>Registration Number:</lable>
    <input type="text" id="regno" name="regno"     onChange={handleInputChange} value={updateorder?.regno }
 /><br></br> 
    <lable>Message:</lable>
    <textarea id="message" name="message"    onChange={handleInputChange} value={updateorder?.message }
 ></textarea> <br></br>  <br></br> 
    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 

        </div>
    )
}
export default UpdateStudnet;