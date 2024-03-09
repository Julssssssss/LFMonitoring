import { useState } from "react";

const Logout = () => {
  const [confirm, setConfirm] = useState(false);

  const openPopup = () => {
    setConfirm(true);
  };

  const closePopup = () => {
    setConfirm(false);
  };

  const logout = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      "_self"
    );
    localStorage.clear();
  };

  return (
    <>
      <button
        className="bg-[#F9D62B] w-[9rem] hover:bg-[#134083] hover:text-white rounded-full p-2 text-black xl:w-[11rem] lg:text-[1.2rem] lg:w-[12rem] xl:text-[1.4rem] xl:p-[0.4rem] 3xl:text-[1.6rem] 3xl:w-[12rem]"
        onClick={openPopup}
      >
        Logout
      </button>

      {confirm && (
        <div className="fixed z-30 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col justify-center text-white bg-[#134083] shadow-md w-[20rem] h-[20rem] md:w-[25rem] md:text-[1.3rem] xl:w-[30rem] xl:h-[25rem] xl:text-[1.5rem] 3xl:h-[30rem] 3xl:w-[40rem] 3xl:text-[2rem] rounded-2xl whitespace-pre space-y-[2rem] items-center">
            <div>Are you sure you want to logout?</div>
            <div className="flex flex-row space-x-[4rem]">
              <button
                type="button"
                className="text-black text-[1rem] hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white bg-[#F9D62B] w-[5rem] h-[2rem] rounded-full mr-2 xl:w-[6rem] xl:h-[2.5rem] md:text-[1.2rem] 3xl:text-[1.6rem] 3xl:w-[7rem]"
                onClick={logout} // <-- Fix: Pass function reference without invoking
              >
                Yes
              </button>
              <button
                type="button"
                className="text-white text-[1rem] hover:bg-[#F9D62B] hover:text-black bg-gray-500 w-[5rem] h-[2rem] rounded-full ml-2 xl:w-[6rem] xl:h-[2.5rem] md:text-[1.2rem] 3xl:text-[1.6rem] 3xl:w-[7rem]"
                onClick={closePopup}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
