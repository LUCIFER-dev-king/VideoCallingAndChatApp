import React, { useState, useEffect, useContext } from "react";
import { FaAddressCard } from "react-icons/fa";
import { getMsg, getUser } from "../../pages/helper/homeHelper";
import { UserContext } from "../../context/UserContext";
import { SET_MSG } from "../../context/actions.types";

const ChatCard = ({ currrentConv }) => {
  const [user, setUser] = useState({});
  const { dispatch } = useContext(UserContext);
  const { userId } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // console.log(currrentConv);
    if (userId == currrentConv.receiverId) {
      getUser(currrentConv.UserId).then((data) => setUser(data));
    } else {
      getUser(currrentConv.receiverId).then((data) => setUser(data));
    }
  }, []);

  const onClickConv = () => {
    getMsg(currrentConv.id).then((data) => {
      dispatch({
        type: SET_MSG,
        payload: data,
      });
    });
  };
  return (
    <div
      className='p-3 bg-white flex flex-row justify-start hover:bg-gray-50'
      onClick={onClickConv}
    >
      <FaAddressCard className='h-10 p-2 w-10 rounded-full bg-gray-100'>
        Profile
      </FaAddressCard>
      <div className='flex flex-col justify-start px-2'>
        <div>{user.username}</div>
        <div>text2</div>
      </div>
    </div>
  );
};

export default ChatCard;
