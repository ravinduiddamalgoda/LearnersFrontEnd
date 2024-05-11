import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileInput, TextInput } from 'flowbite-react';
import LicensePkges from '../Components/LicensePkges';

export default function AddLicensePkg() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
    setSelectedImage(URL.createObjectURL(e.target.files[0])); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }
      const res = await fetch('/api/auth/addLicense-package', {
        method: 'POST',
        body: formDataWithImage,
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
    <div className='mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-7'>Add License Package</h1>

        <div className='p-3 max-w-lg mx-auto'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <TextInput type="text" placeholder='Package Name' id='packageName' onChange={handleChange} required/>

            <TextInput type="text" placeholder='Description' id='description' onChange={handleChange} required/>

            <TextInput type="number" placeholder='Price' id='price' min="0" onChange={handleChange} required/>

            <div className='flex gap-4 items-center justify-between border-4 border-gray-500 border-dotted p-3'>
              <label htmlFor="photoUpload" className='text-lg font-semibold'>Upload Image:</label>
              <FileInput type="file" id="photoUpload" accept="image/*" onChange={handleFileChange} required />
            </div>

            {selectedImage && (
              <img src={selectedImage} alt="Selected" className="mx-auto mt-4 max-w-xs" />
            )}

            {error && <p className='text-red-500 mt-5'>{error}</p>}

            <button disabled={loading} className='bg-blue-200 text-black p-3 rounded-lg uppercase hover:opacity-80'>
              {loading ? 'Loading...' : 'Add'}
            </button>
          </form>
        </div>

        

      <div> <LicensePkges /> </div>
    </div>
  );
}
