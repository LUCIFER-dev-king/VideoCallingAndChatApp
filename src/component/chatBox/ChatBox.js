import React, { useContext } from "react";
import { getUserFromStorage } from "../../auth/helper/authHelper";
import { UserContext } from "../../context/UserContext";
import Header from "../../layout/Header";
import ChatCard from "./ChatCard";

const ChatBox = ({ msgRef }) => {
  const {
    state: { activeUsers, conv },
  } = useContext(UserContext);
  const { userId } = getUserFromStorage();

  return (
    <div className="bg-white h-full shadow-md flex flex-col justify-start content-center rounded-xl ">
      <Header />
      <div id="chatScrollbar" className="flex flex-col overflow-x-auto">
        {conv.length > 0 ? (
          conv.map((c, i) => (
            <ChatCard key={i} currentConv={c} msgRef={msgRef} />
          ))
        ) : (
          <h4 className="ml-5">No conversation found</h4>
        )}

        <h4 className="ml-5 mt-5 font-semibold">Available Users</h4>
        {activeUsers.length > 0 &&
          activeUsers.map(
            (user, id) =>
              user.userId !== userId && (
                <ChatCard availableUsers={user.user} msgRef={msgRef} key={id} />
              )
          )}
      </div>
    </div>
  );
};

export default ChatBox;
