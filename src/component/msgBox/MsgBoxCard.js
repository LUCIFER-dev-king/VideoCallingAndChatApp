import React, { useEffect } from "react";
const MsgBoxCard = ({ msg }) => {
  //TODO: need to set the user to context to get current user id to determine wheterh msg in left or right.,
  // for now 1 is the user.
  const { userId } = JSON.parse(localStorage.getItem("user"));
  const { senderId, message, createdAt } = msg;
  return senderId === "1" ? (
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
