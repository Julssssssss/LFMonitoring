
const Logout = ({ setConfirm }) => {
  const logout = () => {
    window.open(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      "_self"
    );
    localStorage.clear();
    setConfirm(false);
  };

  return (
    <>
      <div className=" absolute flex flex-col justiy-center items-center z-70 inset-0 bg-black w-screen h-screen bg-opacity-50">
        <div className="flex flex-col mt-[10rem] rounded-[2rem] justify-center items-center bg-[#134083] p-[2rem] opacity-100">
          <p>Are you sure you want to logout?</p>
          <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={logout}
              className="px-[2rem] rounded-full py-1 bg-[#F9D62B] text-black rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="px-[2rem] rounded-full py-1 bg-[#F9D62B] text-black rounded hover:bg-gray-600"
            >
              No
            </button>
          </div>
        </div>
    </div>
    </>
  );
};

export default Logout;
