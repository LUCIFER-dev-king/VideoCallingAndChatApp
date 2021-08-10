import React, { useState, useEffect, useContext } from "react";
import MsgBoxCard from "./MsgBoxCard";
import MsgBoxHeader from "./MsgBoxHeader";
import { UserContext } from "../../context/UserContext";
import { createMsg } from "../../pages/helper/homeHelper";
import { SET_MSG } from "../../context/actions.types";

const MsgBox = ({ socket }) => {
  const { state, dispatch } = useContext(UserContext);
  const { message, activeUsers } = state;
  const [msg, setMsg] = useState("");
  const [isUserActive, setIsUserActive] = useState({});
  const { userId } = JSON.parse(localStorage.getItem("user"));
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    if (message.length > 0) {
      var user = activeUsers.find((user) => {
        if (user.userId == message[0].receiverId) {
          return user;
        }
      });
      if (user) {
        setIsUserActive(user);
      } else {
        setIsUserActive({});
      }
      //TODO: what happens if we send the message without early msgs. SOL: set receiverid to context.
      if (userId == message[0].senderId) {
        setReceiverId(message[0].receiverId);
      } else {
        setReceiverId(message[0].senderId);
      }
    }
  }, [message, activeUsers]);

  const onSubmit = () => {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    // var ampm = hours>= 12 ? 'PM' : 'AM'
    var date =
      (hours > 12 ? hours - 12 : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes);
    console.log(date);
    var newMessage = {
      senderId: userId,
      receiverId: receiverId,
      message: msg,
      ConversationId: message[0].id,
      createdAt: date,
    };
    dispatch({
      type: SET_MSG,
      payload: [...message, newMessage],
    });
    socket.emit("sendMsg", [...message, newMessage]);
  };

  useEffect(() => {
    socket.on("getMsg", (msg) => {
      dispatch({
        type: SET_MSG,
        payload: msg,
      });
    });
    console.log(message);
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
