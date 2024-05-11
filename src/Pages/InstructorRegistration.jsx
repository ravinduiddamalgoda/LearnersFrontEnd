import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorManagement from '../Pages/InstructorManagement';

export default function InstructorRegistration() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'InstructorName') {
      const regex = /[^a-zA-Z\s']/;
      if (regex.test(value)) {
        setError("Instructor name should only contain letters");
      } else {
        setError(null);
      }
    }
    if (id === 'confirmPassword') {
      if (value !== formData.password) {
        setError("Passwords do not match");
      } else {
        setError(null);
      }
    }
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('/api/auth/instructor-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      location.reload();
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className=' mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Instructor Registration</h1>
      <div className='p-3 max-w-lg mx-auto'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="text" placeholder='Instructor Name' className='border p-3 rounded-lg' id='InstructorName' required onChange={handleChange} />
          <input type="text" placeholder='Instructor Location' className='border p-3 rounded-lg' id='InstructorLocation' required onChange={handleChange} />
          <input type="number" placeholder='Instructor Experience In Years' className='border p-3 rounded-lg' id='InstructorExperience' required min="0" onChange={handleChange} />
          <input type="email" placeholder='Instructor Email' className='border p-3 rounded-lg' id='email' required onChange={handleChange} />
          <input type="password" placeholder='Instructor Password' className='border p-3 rounded-lg' id='password'  onChange={handleChange} required />
          <input type="password" placeholder='Confirm Instructor Password' className='border p-3 rounded-lg' id='confirmPassword'  onChange={handleChange} required />
          {error && <p className='text-red-500 mt-5 '>{error}</p>}
          <button disabled={loading} className='bg-blue-200 text-black p-4 rounded-lg uppercase hover:opacity-80'>{loading ? 'Loading...' : 'Add Instructor'}</button>
        </form>
      </div>
      <div><InstructorManagement /></div>
    </div>
  );
}
