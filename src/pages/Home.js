import React, { useState, useEffect } from "react";
import ChatBox from "../component/chatBox/ChatBox";
import MsgBox from "../component/msgBox/MsgBox";
import Sidebar from "../component/sidebar/Sidebar";
import Header from "../layout/Header";
import { getConv } from "./helper/homeHelper";

const Home = () => {
  var { userId } = JSON.parse(localStorage.getItem("user"));
  const [conv, setConv] = useState([]);
  useEffect(() => {
    getConv("1").then((data) => {
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
          <MsgBox />
        </div>
      </div>
    </div>
  );
};

export default Home;
