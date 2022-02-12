import React, { useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { SOCKETIO } from "../backend";
import { io } from "socket.io-client";
import ChatBox from "../component/chatBox/ChatBox";
import MsgBox from "../component/msgBox/MsgBox";
import { getConv, getUser } from "./helper/homeHelper";
import { SET_CONVERSATION, SET_USERS } from "../context/actions.types";
import { useHistory } from "react-router-dom";
import "../index.css";

const socket = io.connect(SOCKETIO);

const Home = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const msgRef = useRef("");
  const videoRef = useRef("");

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    var user = localStorage.getItem("user");
    if (user !== null) {
      const { userId } = JSON.parse(user);
      getConv(userId).then((data) => {
        dispatch({
          type: SET_CONVERSATION,
          payload: data,
        });
      });
      socket.emit("addUser", userId);
    } else {
      history.push("/signin");
    }
  }, []);

  useEffect(() => {
    socket.on("activeUsers", (users) => {
      dispatch({
        type: SET_USERS,
        payload: users,
      });
    });
  }, []);

  return (
    <div className="container-2xl h-screen bg-primary p-4 ">
      <div className="relative sm:flex w-full h-full">
        <div className="w-full sm:w-1/4 z-0 sm:mr-3">
          <ChatBox msgRef={msgRef} socket={socket} />
        </div>
        <div ref={msgRef} className="w-full h-full z-10 sm:w-3/4 msg">
          <MsgBox msgRef={msgRef} socket={socket} videoRef={videoRef} />
        </div>
      </div>
    </div>
  );
};

export default Home;
