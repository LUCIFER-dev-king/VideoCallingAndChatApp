import React from "react";
import { FaFacebookMessenger, FaUser, FaVideo } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className='bg-gray-100 shadow-inner h-full flex flex-col justify-start content-center p-2'>
      <div className='p-5'>
        <FaFacebookMessenger className='mx-auto text-3xl' />
      </div>
      <div className='p-5'>
        <FaVideo className='mx-auto text-3xl' />
      </div>
    </div>
  );
};

export default Sidebar;
