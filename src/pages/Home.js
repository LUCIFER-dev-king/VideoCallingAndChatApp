import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SOCKETIO } from "../backend";
import { io } from "socket.io-client";
import ChatBox from "../component/chatBox/ChatBox";
import MsgBox from "../component/msgBox/MsgBox";
import Sidebar from "../component/sidebar/Sidebar";
import Header from "../layout/Header";
import { getConv } from "./helper/homeHelper";
import { SET_USERS } from "../context/actions.types";
import VideoCall from "../videoCall/VideoCall";
const socket = io.connect(SOCKETIO);

const Home = () => {
  const { dispatch } = useContext(UserContext);
  var { userId } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    socket.emit("addUser", userId);

    socket.on("activeUsers", (users) => {
      dispatch({
        type: SET_USERS,
        payload: users,
      });
    });
  }, []);

  const [conv, setConv] = useState([]);
  useEffect(() => {
    getConv(userId).then((data) => {
      setConv(data);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className='grid grid-cols-12 h-screen'>
        <div className='col-span-0'>
          <Sidebar />
        </div>
        <div className='col-span-3'>
          <ChatBox conv={conv} />
        </div>
        <div className='col-span-8'>
          {/*<MsgBox socket={socket} />*/}
          <VideoCall socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Home;
