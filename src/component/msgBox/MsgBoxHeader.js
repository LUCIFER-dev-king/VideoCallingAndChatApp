import React from "react";
import { FaVideo, FaUser, FaBackward, FaArrowLeft } from "react-icons/fa";

const MsgBoxHeader = ({ isReceiverActive, msgRef }) => {
  console.log(isReceiverActive);
  return (
    <div className=" flex flex-row justify-start items-center px-4 py-1 border-b-2 border-primary w-full">
      <div class="p-3 rounded-full bg-primary mr-3 block sm:hidden">
        <FaArrowLeft
          className="text-xl"
          onClick={() => (msgRef.current.style.width = "0")}
        />
      </div>
      <div class="p-3 rounded-full bg-primary">
        <FaUser className="text-2xl" />
      </div>
      <div class="w-full flex justify-between items-center">
        <div class="flex flex-col ml-4">
          <div className="my-auto text-lg font-bold">
            {isReceiverActive.username}
          </div>
          {isReceiverActive.active ? (
            <div className="text-lg font">Online</div>
          ) : (
            <div className="text-lg font">Offline</div>
          )}
        </div>
        <div class="p-3 rounded-full hover:bg-primary mr-3 cursor-pointer">
          <FaVideo className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default MsgBoxHeader;
