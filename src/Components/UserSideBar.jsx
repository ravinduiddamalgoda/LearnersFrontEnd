import { React, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCartArrowDown } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { AiOutlineStock } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

const UserSideBar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const Navigate = useNavigate();

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
            <span className="text-lg text-blue-800 font-semibold">Dashboard</span>
          </div>
        )}
      </div>

      <nav>
        <a
          href="#"
          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-200"
        >
          <AiOutlineDashboard className="w-6 h-6 text-gray-500" />
          {!isExpanded ? null : <span className="ml-3">View Payment</span>}
        </a>

        <a
          href="#"
          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-200"
        >
          <FaCartArrowDown className="w-6 h-6 text-gray-500" />
          {!isExpanded ? null : (
            <>
              <span className="flex-1 ml-3 whitespace-nowrap">View Schedule lession</span>
              <span className="inline-flex justify-center items-center px-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                3
              </span>
            </>
          )}
        </a>

        <a
          href="#"
          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-200"
        >
          <FaPerson className="w-6 h-6 text-gray-500" />
          {!isExpanded ? null : <span className="ml-3">View Lessions</span>}
        </a>

        <a
          href="#"
          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-200"
        >
          <AiOutlineStock className="w-6 h-6 text-gray-500" />
          {!isExpanded ? null : <span className="ml-3">testing</span>}
        </a>

        <a
          // href=""
          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-200"
        >
          <AiOutlineStock className="w-6 h-6 text-gray-500" />
          {!isExpanded ? null : <span className="ml-3" onClick={()=> Navigate("/userdetail")}>User Profile</span>}
        </a>
      </nav>

      <div className="mt-auto">
        <a
          href="#"
          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-red-200"
        >
          <MdLogout className="w-6 h-6 text-red-500" />
          {!isExpanded ? null : <span className="ml-3 text-red-500">Logout</span>}
        </a>
      </div>
    </div>
  );
};

export default UserSideBar;

// InventrySideBar