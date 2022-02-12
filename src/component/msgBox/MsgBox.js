import React, { useState, useEffect, useContext } from "react";
import MsgBoxCard from "./MsgBoxCard";
import MsgBoxHeader from "./MsgBoxHeader";
import { UserContext } from "../../context/UserContext";
import { createMsg } from "../../pages/helper/homeHelper";
import { SET_MSG } from "../../context/actions.types";
import { MdPhotoCamera, MdSend } from "react-icons/md";
import { getUserFromStorage } from "../../auth/helper/authHelper";
import VideoCall from "../../videoCall/VideoCall";

const MsgBox = ({ socket, msgRef }) => {
  const { state, dispatch } = useContext(UserContext);
  const { message, activeUsers, currentConversation } = state;
  const [msg, setMsg] = useState("");
  const [isReceiverActive, setIsReceiverActive] = useState({});
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [receiverId, setReceiverId] = useState("");
  const [converstaionId, setConversationId] = useState("");
  const [imageFile, setImageFile] = useState("");

  useEffect(() => {
    console.log(Object.keys(currentConversation).length);
    if (Object.keys(currentConversation).length > 0) {
      console.log("cov", currentConversation);
      setIsReceiverActive(currentConversation.receiver);
      setReceiverId(currentConversation.receiver.id);
      setConversationId(currentConversation.currentConv.id);
    }
    if (activeUsers.some((c) => c.userId === receiverId)) {
      setIsReceiverActive({ ...currentConversation.receiver, active: true });
    } else {
      setIsReceiverActive({ ...currentConversation.receiver, active: false });
    }
    if (message.length > 0) {
      console.log(activeUsers);

      // if (user) {
      //   setIsReceiverActive(user);
      // } else {
      //   setIsReceiverActive({});
      // }
      // //TODO: what happens if we send the message without early msgs. SOL: set receiverid to context.
      // if (userId == message[0].senderId) {
      //   setReceiverId(message[0].receiverId);
      // } else {
      //   setReceiverId(message[0].senderId);
      // }
    }
  }, [currentConversation]);

  const getTime = () => {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    return (
      (hours > 12 ? hours - 12 : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ampm
    );
  };

  const onSubmit = () => {
    const { userId } = getUserFromStorage();
    var formData = new FormData();
    formData.set("senderId", userId);
    formData.set("receiverId", receiverId);
    formData.set("ConversationId", converstaionId);
    formData.set("message", msg);
    formData.set("created", getTime());

    if (imageFile) {
      formData.set("photo", imageFile);
    }

    createMsg(formData).then((msg) => {
      if (msg) {
        dispatch({
          type: SET_MSG,
          payload: [...message, msg],
        });

        socket.emit("sendMsg", [...message, msg]);
        setMsg("");
      }
    });
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

  const onImageUpload = () => {
    // fetch(`${API}/createImg`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //   },
    //   body: formData,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
    // createImg(formData);
  };

  return Object.keys(currentConversation).length > 0 ? (
    <div className="bg-white rounded-xl h-full shadow-md flex flex-col justify-between ">
      <MsgBoxHeader
        setIsVideoCall={setIsVideoCall}
        msgRef={msgRef}
        isReceiverActive={isReceiverActive}
      />
      {isVideoCall ? (
        <VideoCall socket={socket} isReceiverActive={isReceiverActive} />
      ) : (
        <ul id="chatScrollbar" className="flex flex-col px-6 overflow-auto">
          {message.map((msg, i) => (
            <MsgBoxCard msgRef={msgRef} msg={msg} key={i} />
          ))}
        </ul>
      )}
      {!isVideoCall && (
        <div>
          {message.length === 0 && (
            <div className="flex justify-center items-center">
              No messages found
            </div>
          )}
          <div className="flex justify-between px-6 py-2">
            <label
              htmlFor="uploadImg"
              className="p-3 mr-2 rounded-full bg-gray text-white cursor-pointer"
            >
              <MdPhotoCamera className="text-2xl" />
            </label>

            <input
              id="uploadImg"
              type="file"
              accept="image/*"
              name="photo"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <input
              type="text"
              placeholder="Type your message..."
              value={msg}
              className="py-2 px-4 w-full mr-2 rounded-full border-2 border-gray focus:border-transparent focus:ring-2 focus:ring-gray focus:outline-none"
              onChange={(e) => setMsg(e.target.value)}
            />

            <div
              onClick={onSubmit}
              className="p-3 rounded-full bg-secondary text-white cursor-pointer"
            >
              <MdSend className="text-2xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="hidden sm:flex sm:h-full items-center justify-center">
      Select a conversation to message
    </div>
  );
};

export default MsgBox;
