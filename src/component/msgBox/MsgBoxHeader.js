import React from "react";
import { FaVideo, FaUser, FaArrowLeft } from "react-icons/fa";

const MsgBoxHeader = ({ isReceiverActive, msgRef, setIsVideoCall }) => {
  return (
    <div className=" flex flex-row justify-start items-center px-4 py-1 border-b-2 border-primary w-full">
      <div className="p-3 rounded-full bg-primary mr-3 block sm:hidden">
        <FaArrowLeft
          className="text-xl"
          onClick={() => (msgRef.current.style.width = "0")}
        />
      </div>
      <div className="p-3 rounded-full bg-primary">
        <FaUser className="text-2xl" />
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col ml-4">
          <div className="my-auto text-lg font-bold">
            {isReceiverActive.username}
          </div>

          {isReceiverActive.active ? (
            <div className="text-lg font">Online</div>
          ) : (
            <div className="text-lg font">Offline</div>
          )}
        </div>
        <div className="p-3 rounded-full hover:bg-primary mr-3 cursor-pointer">
          <FaVideo className="text-xl" onClick={() => setIsVideoCall(true)} />
        </div>
      </div>
    </div>
  );
};

export default MsgBoxHeader;
