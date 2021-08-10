import React from "react";
import ChatCard from "./ChatCard";

const ChatBox = ({ conv }) => {
  return (
    <div className='bg-gray-100 shadow-md h-full flex flex-col justify-start content-center'>
      <div className='p-5 text-2xl font-bold'>Chat</div>
      <hr />
      {conv.map((c, i) => (
        <ChatCard key={i} currrentConv={c} />
      ))}
    </div>
  );
};

export default ChatBox;
