import React from "react";
import MsgBoxHeader from "./MsgBoxHeader";

const MsgBox = () => {
  return (
    <div className='bg-gray-50 h-full'>
      <MsgBoxHeader />
      <hr />
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

      <div className='p-12 flex justify-between'>
        <input
          type='text'
          placeholder='message'
          className='p-2 w-full rounded border-2 mr-2'
        />
        <button className='px-4 bg-black rounded text-white block'>Send</button>
      </div>
    </div>
  );
};

export default MsgBox;
