import React from "react";

const MsgBoxCard = () => {
  return (
    <div>
      <div className='flex flex-col justify-end p-12'>
        <div className='flex justify-end'>
          <div className='px-5 py-2 bg-gray-200 rounded'>
            text <br /> <span className='text-white'>time</span>
          </div>
        </div>
        <div className='flex justify-start'>User2 chat</div>
        <div className='flex justify-end'>User1 chat</div>

        <hr />
      </div>
    </div>
  );
};

export default MsgBoxCard;
