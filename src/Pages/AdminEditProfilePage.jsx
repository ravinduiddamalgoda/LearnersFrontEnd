import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Button, Modal, Alert, TextInput } from 'flowbite-react';
import { HiOutlineExclamation } from 'react-icons/hi';
import { 
  updateStart, 
  updateSuccess, 
  updateFailure, 
  deleteUserStart, 
  deleteUserSuccess, 
  deleteUserFailure 
} from '../redux/user/userSlice';


export default function Profile() {

  const dispatch = useDispatch(); 
  // const fileRef = useRef(null);
  const { currentUser, error } = useSelector((state) => state.user);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(false);
  // const [image, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  // const onInputChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //   }
  // };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/auth/delete/${currentUser._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // useEffect(() => {
  //   if (image) {
  //     uploadImage();
  //   }
  // }, [image]);

  // const uploadImage = async () => {
  //   console.log('uploading image...');
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/auth/admin-update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok){
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess('Profile updated successfully');
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Edit Profile</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* <input type='file' ref={fileRef} id="image" accept='image/*' className='border p-3 rounded-lg' onChange={onInputChange} hidden/>
        <img
          onClick={() => fileRef.current.click()}
          src={image ? URL.createObjectURL(image) : (currentUser.image ? `/path/to/images/${currentUser.image}` : '/path/to/default_image.png')}
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        /> */}
        
        <TextInput type='text' placeholder='adminID' id='adminID' readOnly defaultValue={currentUser.adminID} />
        <TextInput type='text' placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' placeholder='email' id='email' defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' placeholder='password' id='password' onChange={handleChange} />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>UPDATE</button>
      </form>

      <div className='flex mt-5'>
        <span onClick={() => setShowModal(true)} className='text-red-700 cursor-pointer'>Delete account</span>
      </div>

      {error && ( 
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}

      {updateUserSuccess && ( 
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}

      <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body className='text-center'>
          <HiOutlineExclamation className='h-14 w-14 text-gray-400 mb-4 mx-auto dark:text-gray-200' />
          <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
            Are you sure you want to delete your account?
          </h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDeleteUser}>
              Yes, I'm Sure
            </Button>
            <Button color='gray' onClick={() => setShowModal(false)}>
              No, Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
