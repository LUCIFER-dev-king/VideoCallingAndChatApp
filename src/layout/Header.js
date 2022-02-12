import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-4xl">Chatz</h3>

        <div class="p-3 rounded-full hover:bg-primary cursor-pointer">
          <FaSignOutAlt className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Header;
