import React from "react";
import MsgBoxCard from "./MsgBoxCard";
import MsgBoxHeader from "./MsgBoxHeader";

const MsgBox = () => {
  return (
    <div className='bg-gray-50 h-full'>
      <MsgBoxHeader />
      <hr />
      <MsgBoxCard />

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
