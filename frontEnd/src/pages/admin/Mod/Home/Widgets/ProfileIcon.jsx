import React, { useState } from "react";
import Logout from "../../../../User/UserProfile/components/Logout";

const ProfileIcon = ({ User }) => {
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogoutClick = () => {
    setConfirmLogout(true);
  };

  return (
    <>
      <div className="dropdown">
        <div
          tabIndex={0}
          style={{ backgroundImage: `url(${User[1]})` }}
          className='btn m-1 bg-contain hover:opacity-75 cursor-pointer rounded-full border-[0.1rem] border-white bg-center w-[3rem] h-[2.5rem] md:w-[4rem] md:h-[4rem] 2xl:w-[5.5rem] 2xl:h-[5.5rem] z-20'
        ></div>
        <ul
          tabIndex={0}
          className="dropdown-content right-0 z-[1] menu p-2 shadow bg-[#134083] border-[#F9D62B] border-[0.2rem] rounded-box w-52 flex-col items-center space-y-[1rem]"
        >
          <li>{User[0].Name}</li>
          <li>{User[0].Email}</li>
          <li>
            <button onClick={handleLogoutClick} className="text-black bg-[#F9D62B] border-[0.2rem] hover:bg-[#134083] rounded-full">
              Logout
            </button>
          </li>
        </ul>
      </div>
      {confirmLogout && (
        <div className="absolute inset-0 overflow-hidden z-50 mt-2">
          <Logout setConfirm={setConfirmLogout} />
        </div>
      )}
    </>
  );
};

export default ProfileIcon;
