import React, { useState } from 'react';

function EditUserDetail() {
  const [name, setName] = useState('John Doe');
  const [learningType, setLearningType] = useState('React');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLearningTypeChange = (e) => {
    setLearningType(e.target.value);
  };

  const handleDeleteAccount = () => {
    // Implement delete account functionality
    console.log('Account deleted');
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    // Handle saving name
    console.log('Name saved:', name);
  };

  const handleLearningTypeSubmit = (e) => {
    e.preventDefault();
    // Handle saving learning type
    console.log('Learning type saved:', learningType);
  };

  return (
    <div className="edit-user-detail p-4 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Edit User Details</h1>
      <form onSubmit={handleNameSubmit}>
        <label className="block mb-2">
          Name:
          <input type="text" value={name} onChange={handleNameChange} className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500" />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Name</button>
      </form>
      <form onSubmit={handleLearningTypeSubmit} className="mt-4">
        <label className="block mb-2">
          Learning Type:
          <input type="text" value={learningType} onChange={handleLearningTypeChange} className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500" />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Learning Type</button>
      </form>
      <button onClick={handleDeleteAccount} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete My Account</button>
    </div>
  );
}

export default EditUserDetail;
