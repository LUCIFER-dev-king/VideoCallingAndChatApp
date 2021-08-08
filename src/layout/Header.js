import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div className='bg-black	p-3 text-white'>
      <div className='flex justify-between'>
        <h3>VideoChatApp</h3>
        <div className='h-6 w-6 rounded-full ring-2 ring-white'>
          <FaUser className='m-auto pt-1'></FaUser>
        </div>
      </div>
    </div>
  );
};

export default Header;
