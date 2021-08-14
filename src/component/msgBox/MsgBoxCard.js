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

  const getTime = (time) => {
    var hours = time.substring(11, 13);
    var minutes = time.substring(14, 16);
    var ampm = hours >= 12 ? "PM" : "AM";
    return (
      (hours > 12 ? hours - 12 : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      " " +
      ampm
    );
  };

  return senderId == userId ? (
    <div className='flex  justify-end'>
      {data !== null ? (
        <div className='m-1 w-60 h-min border-4 rounded bg-gray-200'>
          <img ref={image} className='bg-cover bg-no-repeat bg-center' />
        </div>
      ) : (
        <div className='m-1 px-5 py-2 bg-gray-200 rounded'>
          {message} <br />{" "}
          <span className='text-white'>{getTime(createdAt)}</span>
        </div>
      )}
    </div>
  ) : (
    <div className='flex justify-start'>
      {data !== null ? (
        <div className='m-1 w-60 h-min border-4 rounded bg-gray-200'>
          <img ref={image} className='bg-cover bg-no-repeat bg-center' />
        </div>
      ) : (
        <div className='m-1 px-5 py-2 bg-gray-200 rounded'>
          {message} <br />{" "}
          <span className='text-white'>{getTime(createdAt)}</span>
        </div>
      )}
    </div>
  );
};

export default MsgBoxCard;
