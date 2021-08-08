import React, { useState, useEffect, useContext } from "react";
import MsgBoxCard from "./MsgBoxCard";
import MsgBoxHeader from "./MsgBoxHeader";
import { UserContext } from "../../context/UserContext";
import { createMsg } from "../../pages/helper/homeHelper";

const MsgBox = () => {
  const { state } = useContext(UserContext);
  const { conversation } = state;
  const [message, setMessage] = useState("");
  const { userId } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(conversation);
  }, [conversation]);

  const onSubmit = () => {
    createMsg({
      conversationId: conversation[0].id,
      message: message,
      senderId: userId,
    });
  };

  return (
    <div className='bg-gray-50 h-full'>
      <MsgBoxHeader />
      <hr />
      <div className='flex flex-col justify-end p-12'>
        {conversation.map((msg, i) => (
          <MsgBoxCard msg={msg} key={i} />
        ))}

        <hr />
      </div>

      <div className='p-12 flex justify-between'>
        <input
          type='text'
          placeholder='message'
          className='p-2 w-full rounded border-2 mr-2'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className='px-4 bg-black rounded text-white block'
          onClick={onSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MsgBox;
