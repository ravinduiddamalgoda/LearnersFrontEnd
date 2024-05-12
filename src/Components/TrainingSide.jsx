import { React, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { AiOutlineStock } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";

const TrainingSide = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Define the width for expanded and collapsed sidebar
  const expandedWidth = "w-15p";
  const collapsedWidth = "w-5p";

  return (
    <div
      className={`${
        isExpanded ? expandedWidth : collapsedWidth
      } bg-blue-100 h-screen p-5 transition-width duration-300`}
    >
      <div className="flex items-center space-x-4 p-2 mb-5">
        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="text-xl rounded-full p-2 hover:bg-blue-200"
        >
          {isExpanded ? <FiX /> : <FiMenu />}
        </button>
        {/* Logo and title */}
        {isExpanded && (
          <div className="flex-grow">
            <svg
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
            <span className="text-lg text-blue-800 font-semibold">Dashboard</span>
          </div>
        )}
      </div>

      <nav>
        <a
          href="/trainingSesssion"
          class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-200 m-4"
        >
          <svg
            class="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            
          <FaCarAlt size="23" /></svg>
          {!isExpanded ? null : <span class="ml-3">Schedule Training</span>}

        </a>

        <a
          href="/updateTraining"
          class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-200  m-4"
        > 
          <svg
            class="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          > <FaCartArrowDown size ="20"/></svg>

          {!isExpanded ? null : (
            <>
              <span class="ml-3">Update Data</span>
              
            </>
          )}
          {/* <span class="">Orders</span> */}
        </a>
        <a
          href="/viewptsStudent"
          class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-200  m-4"
        >
          <svg
            class="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          ><FaPerson size="20" className="mx-auto my-auto"/> </svg>
          {!isExpanded ? null : <span class="ml-3">View Student Data</span>}
          {/* <span class="ml-3">Suppliers</span> */}
        </a>

        <a
          href="/instructor/salary"
          class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-200  m-4"
        >
          <svg
            class="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          > <FaMoneyCheckAlt size = "23"/> </svg>
          {!isExpanded ? null : <span class="ml-3">Salary 
          {/* <span class="inline-flex justify-center items-center px-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                3
              </span> */}
          </span>}
          {/* <span class="ml-3">Inventory</span> */}
        </a>
      </nav>
      {/* <div class="mt-auto">
        <a
          href="#"
          class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-200  m-4"
        >
          <svg
            class="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          > <MdLogout size="24" color="red"/> </svg>
          {!isExpanded ? null : <span class="ml-3">Logout</span>}
        </a>
      </div> */}
    </div>
  );
};

export default TrainingSide;
