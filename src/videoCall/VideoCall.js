import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";

const VideoCall = ({ socket, isReceiverActive }) => {
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
    <div className="relative bg-gray-200 w-full h-full overflow-hidden">
      <div className="w-full h-full">
        <video
          ref={receiverVideo}
          playsInline
          autoPlay
          muted
          className="w-full h-full"
          style={{
            objectFit: "cover",
          }}
        ></video>
      </div>
      <div className="absolute right-8 bottom-8 w-48 h-32 bg-red">
        <video
          playsInline
          autoPlay
          muted
          ref={userVideo}
          className="w-full h-full"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="absolute inset-x-1/3 sm:inset-x-2/4 bottom-4 ">
        <div className="flex">
          <button
            className="px-4 bg-green py-2 mx-2 rounded text-white "
            onClick={() => {
              callUser(isReceiverActive.id);
            }}
          >
            Call
          </button>
          <div>
            {currentCall.isCallingComing && (
              <button
                className="px-4 bg-green py-2 mx-2 rounded text-white whitespace-nowrap"
                onClick={answerCall}
              >
                Answer Call
              </button>
            )}
          </div>
          <button className="px-4 py-2 mx-2 bg-red rounded text-white whitespace-nowrap">
            End Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
