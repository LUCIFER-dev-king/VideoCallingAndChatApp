import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import Peer from "simple-peer";

const VideoCall = ({ socket }) => {
  const { state, dispatch } = useContext(UserContext);
  const { activeUsers } = state;
  const userVideo = useRef();
  const receiverVideo = useRef("");
  var { userId } = JSON.parse(localStorage.getItem("user"));
  const [userStream, setUserStream] = useState("");
  const [currentCall, setCurrentCall] = useState({});

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((userStream) => {
        userVideo.current.srcObject = userStream;
        setUserStream(userStream);
      });
    socket.on("callUser", ({ fromId, signal }) => {
      setCurrentCall({ isCallingComing: true, fromId, signal });
      console.log(fromId, signal);
    });
  }, []);

  const answerCall = () => {
    var peer = new Peer({
      initiator: false,
      trickle: false,
      stream: userStream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { toId: currentCall.fromId, signal: data });
    });

    peer.on("stream", (stream) => {
      receiverVideo.current.srcObject = stream;
    });

    peer.signal(currentCall.signal);
  };

  const callUser = (id) => {
    var peer = new Peer({
      initiator: true,
      trickle: false,
      stream: userStream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", { fromId: userId, toId: id, signal: data });
    });

    peer.on("stream", (stream) => {
      receiverVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      peer.signal(signal);
    });
  };

  return (
    <div className='bg-gray-200 h-screen flex flex-col justify-center'>
      <div className='flex justify-center'>
        <video
          playsInline
          autoPlay
          muted
          ref={userVideo}
          className='h-96 w-96 m-4'
        ></video>
        <video
          ref={receiverVideo}
          playsInline
          autoPlay
          muted
          className='h-96 w-96 m-4'
        ></video>
      </div>
      <div className='flex justify-evenly'>
        <button
          className='px-4 bg-black rounded text-white '
          onClick={() => {
            callUser(2);
          }}
        >
          Call
        </button>
        {currentCall.isCallingComing && (
          <button
            className='px-4 bg-black rounded text-white '
            onClick={answerCall}
          >
            Answer Call
          </button>
        )}
        <button className='px-4 bg-black rounded text-white '>End Call</button>
      </div>
    </div>
  );
};

export default VideoCall;
