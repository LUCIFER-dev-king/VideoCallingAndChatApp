import React, { useState, useEffect } from "react";
import { FaAddressCard } from "react-icons/fa";
import { getUser } from "../../pages/helper/homeHelper";

const ChatCard = ({ receiverName }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    getUser(receiverName.receiverId).then((data) => setUser(data));
  }, []);
  return (
    <div className='p-3 bg-white flex flex-row justify-start'>
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
