import React, { useEffect, useState, useRef } from "react";

const MsgBoxCard = ({ msg }) => {
  const { userId } = JSON.parse(localStorage.getItem("user"));
  const { senderId, message, data, created } = msg;
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
    <li className="flex justify-end">
      {data !== null ? (
        <div className="m-1 w-60 h-min border-4 rounded bg-gray-200">
          <img ref={image} className="bg-cover bg-no-repeat bg-center" />
        </div>
      ) : (
        <div className="m-1 px-5 pl-5 pr-10 py-2  rounded-t-3xl rounded-l-3xl bg-primary">
          <p className="">{message} </p>
          <span className="text-gray">{created}</span>
        </div>
      )}
    </li>
  ) : (
    <li className="flex justify-start px-6">
      {data !== null ? (
        <div className="m-1 w-60 h-min border-4 rounded bg-gray-200">
          <img ref={image} className="bg-cover bg-no-repeat bg-center" />
        </div>
      ) : (
        <div className="m-1 pl-5 pr-10 py-2 bg-secondary rounded-t-3xl rounded-r-3xl">
          <p className="text-white">{message} </p>
          <span className="text-gray">{created}</span>
        </div>
      )}
    </li>
  );
};

export default MsgBoxCard;
