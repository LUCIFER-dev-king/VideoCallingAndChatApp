import React, { useState, useEffect, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { createConv, getMsg, getUser } from "../../pages/helper/homeHelper";
import { UserContext } from "../../context/UserContext";
import {
  SET_CONVERSATION,
  SET_CURRENT_CONVERSATION,
  SET_MSG,
} from "../../context/actions.types";
import { getUserFromStorage } from "../../auth/helper/authHelper";

const ChatCard = ({ currentConv, msgRef, availableUsers }) => {
  const [user, setUser] = useState({});
  const {
    state: { conv },
    dispatch,
  } = useContext(UserContext);
  const { userId } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (currentConv !== undefined) {
      if (userId == currentConv.receiverId) {
        getUser(currentConv.UserId).then((data) => setUser(data));
      } else {
        getUser(currentConv.receiverId).then((data) => setUser(data));
      }
    } else {
      setUser(availableUsers);
    }
  }, []);

  const onClickConv = () => {
    if (currentConv !== undefined) {
      const { userId, username } = getUserFromStorage();

      getMsg(currentConv.id).then((data) => {
        dispatch({
          type: SET_MSG,
          payload: data,
        });
        msgRef.current.style.width = "100%";
      });
      dispatch({
        type: SET_CURRENT_CONVERSATION,
        payload: {
          sender: { userId, username },
          currentConv,
          receiver: user,
        },
      });
    } else {
      var coversationLinkId = Number(userId + user.id);
      if (!conv.some((c) => c.coversationLinkId === coversationLinkId)) {
        createConv({ userId, receiverId: user.id, coversationLinkId }).then(
          (data) => {
            dispatch({
              type: SET_CONVERSATION,
              payload: [...conv, data.conv],
            });
          }
        );
      }
    }
  };
  return (
    <div
      className="p-3 bg-white hover:bg-primary cursor-pointer flex flex-row justify-start items-center hover:bg-gray-50 rounded-xl"
      onClick={onClickConv}
    >
      <div className="p-3 rounded-full bg-primary">
        <FaUser className="text-2xl" />
      </div>
      <div className="flex flex-col justify-start mx-4 border-b-2 border-primary w-full ">
        <h4 className="font-semibold text-lg">{user.username}</h4>
        <h5>Hi...</h5>
      </div>
    </div>
  );
};

export default ChatCard;
