import React from "react";
const MsgBoxCard = ({ msg }) => {
  const { userId } = JSON.parse(localStorage.getItem("user"));
  const { senderId, message, createdAt } = msg;
  return senderId == userId ? (
    <div className='flex justify-end'>
      <div className='px-5 py-2 bg-gray-200 rounded'>
        {message} <br /> <span className='text-white'>{createdAt}</span>
      </div>
    </div>
  ) : (
    <div className='flex justify-start'>
      <div className='px-5 py-2 bg-gray-200 rounded'>
        {message} <br /> <span className='text-white'>{createdAt}</span>
      </div>
    </div>
  );
};

export default MsgBoxCard;
