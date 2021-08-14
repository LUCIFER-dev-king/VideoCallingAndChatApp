import React, { useEffect, useState, useRef } from "react";
const MsgBoxCard = ({ msg }) => {
  const { userId } = JSON.parse(localStorage.getItem("user"));
  const { senderId, message, createdAt, data } = msg;
  const image = useRef("");
  useEffect(() => {
    if (data !== null) {
      var arrayBuffer = data.data;
      var bytes = new Uint8Array(arrayBuffer);
      var blob = new Blob([bytes.buffer]);
      var reader = new FileReader();
      reader.onload = function (e) {
        image.current.src = e.target.result;
      };
      reader.readAsDataURL(blob);
    }
  }, []);

  return senderId == userId ? (
    <div className='flex justify-end'>
      {data ? (
        <div>
          <img ref={image} src='' alt='' />
        </div>
      ) : (
        <div className='px-5 py-2 bg-gray-200 rounded'>
          {message} <br /> <span className='text-white'>{createdAt}</span>
        </div>
      )}
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
