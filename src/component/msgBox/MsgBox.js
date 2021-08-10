import React, { useState, useEffect, useContext } from "react";
import MsgBoxCard from "./MsgBoxCard";
import MsgBoxHeader from "./MsgBoxHeader";
import { UserContext } from "../../context/UserContext";
import { createMsg } from "../../pages/helper/homeHelper";

const MsgBox = ({ socket }) => {
  const { state } = useContext(UserContext);
  const { message, activeUsers } = state;
  const [msg, setMsg] = useState("");
  const [isUserActive, setIsUserActive] = useState({});
  const { userId } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (message.length > 0) {
      activeUsers.find((user) => {
        if (user.userId == message[0].receiverId) {
          setIsUserActive(user);
        }
      });
    }
  }, [message, activeUsers]);

  const onSubmit = () => {
    // createMsg({
    //   conversationId: message[0].id,
    //   message: msg,
    //   senderId: userId,
    // });
    socket.emit("sendMsg", {
      message: msg,
      receiverSocketId: isUserActive.socketId,
    });
  };

  useEffect(() => {
    socket.on("getMsg", (msg) => console.log(msg));
  }, []);

  return (
    <div className='bg-gray-50 h-full'>
      <MsgBoxHeader isUserActive={isUserActive} />
      <hr />
      <div className='flex flex-col justify-end p-12'>
        {message.map((msg, i) => (
          <MsgBoxCard msg={msg} key={i} />
        ))}

        <hr />
      </div>

      <div className='p-12 flex justify-between'>
        <input
          type='text'
          placeholder='message'
          className='p-2 w-full rounded border-2 mr-2'
          onChange={(e) => setMsg(e.target.value)}
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
