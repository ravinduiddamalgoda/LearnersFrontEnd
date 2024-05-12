import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner'; // Assuming Spinner component is defined

function UpdateStudent() {
    const { id } = useParams();
    const [updateStudent, setUpdateStudent] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(true); // Introducing loading state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8020/order_user/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setUpdateStudent(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Set loading to false when data fetching completes
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        setUpdateStudent({
            ...updateStudent,
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
                    id: updateStudent._id,
                    ...updateStudent,
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Updated successfully');
                alert("Updated successfully");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h1 className='text-3xl my-4'>Update Details</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Full Name</label>
                    <input
                        type='text'
                        value={updateStudent?.userID}
                        onChange={handleInputChange}
                        className={`border-2 ${loading ? 'border-red-500' : 'border-gray-500'} px-4 py-2 w-full`}
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Email</label>
                    <input
                        type='text'
                        value={updateStudent?.email}
                        onChange={handleInputChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Registration Number</label>
                    <input
                        type='text'
                        value={updateStudent?.regno}
                        onChange={handleInputChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Message</label>
                    <input
                        type='text'
                        value={updateStudent?.message}
                        onChange={handleInputChange}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleUpdate}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default UpdateStudent;
