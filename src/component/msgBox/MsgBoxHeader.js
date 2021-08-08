import React from "react";
import { FaAddressCard } from "react-icons/fa";

const MsgBoxHeader = () => {
  return (
    <div className=' flex flex-row justify-start p-4'>
      <FaAddressCard className='h-10 p-2 w-10 rounded-full bg-gray-200'>
        Profile
      </FaAddressCard>
      <div className='my-auto px-2 text-xl font-bold'>text</div>
    </div>
  );
};

export default MsgBoxHeader;
