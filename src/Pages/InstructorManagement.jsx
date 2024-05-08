import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Modal } from 'flowbite-react';
import { HiOutlineExclamation } from 'react-icons/hi';

export default function InstructorManagement() {
  const { currentUser } = useSelector((state) => state.user);
  const [instructors, setInstructors] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [instructorIdToDelete, setInstructorIdToDelete] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch(`/api/auth/getInstructors`);
        const data = await res.json();
        if (res.ok) {
          setInstructors(data.instructors);
          if(data.instructors.length < 9){
            setShowMore(false);
          }

        } else {
          throw new Error('Failed to fetch instructors');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchInstructors();
    }
  }, [currentUser._id, currentUser.isAdmin]);

    const handleShowMore = async () => {
      const startIndex = instructors.length;
      try {
        const res = await fetch(`api/auth/getInstructors?startIndex=${startIndex}`);
        const data = await res.json();
        if (res.ok) {
          setInstructors((prev) => [...prev, ...data.instructors]);
          if (data.instructors.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error){
        console.log(error.message);
      }
    };
    
    const handleDeleteInstructor = async () => {
      setShowModal(false);
      try {
        const res = await fetch(
          `/api/auth/delete/${instructorIdToDelete}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setInstructors((prev) => 
            prev.filter((user) => user._id !== instructorIdToDelete)
          );
        }

      } catch (error) {
        console.log(error.message);
      }

    };

    const onChange = (e) => {
      setSearchTerm(e.target.value);
    }

    const filteredInstructors = instructors.filter(user =>
      user.InstructorID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.InstructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.InstructorLocation.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 p-9 '>
      {currentUser.isAdmin && instructors.length > 0 ? (
        <>
          <div className='p-3'>
            <input
              type='search'
              placeholder='Search...'
              className='bg-transparent focus:outline-none w-24 sm:w-64'
              value={searchTerm}
              onChange={onChange}
            />
          </div>

          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Instructor Id</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Experience</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            
            <Table.Body className='divide-y'>
              {filteredInstructors.map((user) => (
                <Table.Row key={user._id} className='bg-white '>
                  <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className='font-medium text-gray-900'>{user.InstructorID}</Table.Cell>
                  <Table.Cell className='font-medium text-gray-900'>{user.InstructorName}</Table.Cell>
                  <Table.Cell className='font-medium text-gray-900'>{user.email}</Table.Cell>
                  <Table.Cell className='font-medium text-gray-900'>{user.InstructorExperience}</Table.Cell>
                  <Table.Cell className='font-medium text-gray-900'>{user.InstructorLocation}</Table.Cell>
                  
                  <Table.Cell>
                    <span 
                      onClick={() => {
                        setShowModal(true);
                        setInstructorIdToDelete(user._id);
                      }} 
                      className='font-medium text-red-500 hover:underline cursor-pointer'> 
                      Delete 
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {
            showMore && (
              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                Show more
              </button>
            )
          }
        </>

      ) : (
        <p>You have not added any instructors yet!</p>
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
            Are you sure you want to delete this instructor account?
          </h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDeleteInstructor} >
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
