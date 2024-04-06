import { useState } from "react";
import { Link } from "react-router-dom";

const UserManual = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImageSrc, setZoomedImageSrc] = useState("");

  const toggleZoom = (src) => {
    setIsZoomed(!isZoomed);
    setZoomedImageSrc(src);
  };

  const closeZoom = () => {
    setIsZoomed(false);
    setZoomedImageSrc("");
  };

  return (
    <>
      <div className="bg-[#134083] h-screen w-screen flex flex-col space-y-[0.5rem] p-[1rem] lg:p-[1.5rem] 2xl:p-[2rem]">
        <div className="flex flex-row items-center justify-between">
          <img
            className="w-[4rem] h-[4rem] lg:w-[6rem] lg:h-[6rem] xl:w-[9rem] xl:h-[9rem] 2xl:w-[12rem] 2xl:h-[12rem]"
            src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709912489/Assets/rtu_logo_5_yz5e6k.png"
            alt="rtuLogo"
          />
          <div className="font-poppins text-white sm:text-[1.5rem] lg:text-[1.7rem] xl:text-[2.5rem] 2xl:text-[4rem] flex flex-row gap-2">
            <p className="font-bold">RTU:</p>LOST AND FOUND
          </div>
          <Link to={"/Admin/Dashboard"}>
            <button className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] xl:w-[4rem] xl:h-[4rem] 2xl:w-[5.5rem] 2xl:h-[5.5rem]">
              <svg
                className="fill-[#F9D62B] hover:fill-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                  ></path>{" "}
                </g>
              </svg>
            </button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-y-[0rem] lg:gap-[0.5rem] text-[0.5rem] xsm:text-[0.7rem] sm:text-[0.9rem] lg:text-[1rem] xl:text-[1.4rem] 2xl:text-[2rem] text-white font-poppins gap-[0.5rem] bg-[#0D1832] w-full h-full p-[0.5rem] rounded-xl overflow-y-auto">
          {/*Landing page */}
          <div className="border-[0.2rem] border-[#F9D62B] w-full h-full rounded-[1rem] p-[0.2rem] hover:opacity-50">
            <img className="w-auto h-auto cursor-pointer" src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712329638/UserManual/Group_181_v6eltj.png" alt="landing page"
              onClick={() =>toggleZoom("https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712329638/UserManual/Group_181_v6eltj.png")
              }
            />
          </div>
          {/*Home */}
          <div className="border-[0.2rem] border-[#F9D62B] w-full h-full rounded-[1rem] p-[0.2rem] hover:opacity-50">
            <p><b>Dashboad:</b> Here you can see the data generation report that you can toggle to a specific date.</p>
            <img className="w-auto h-auto cursor-pointer" src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712335899/UserManual/Group_19_ph6auj.png" alt="Home"
              onClick={() =>toggleZoom("https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712335899/UserManual/Group_19_ph6auj.png")
              }
            />
          </div>
          {/*Found items */}
          <div className="border-[0.2rem] border-[#F9D62B] w-full h-full rounded-[1rem] p-[0.2rem] hover:opacity-50">
            <p><b>Found Items:</b> Here is where you can manipulate the different items that is currently presented in the user side and you can also search a specific item or when its created.</p>
            <img className="w-auto h-auto cursor-pointer" src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712336536/UserManual/Group_21_op46fo.png" alt="FoundItems"
              onClick={() =>toggleZoom("https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712336536/UserManual/Group_21_op46fo.png")
              }
            />
          </div>
          {/*Request list */}
          <div className="border-[0.2rem] border-[#F9D62B] w-full h-full rounded-[1rem] p-[0.2rem] hover:opacity-50">
            <p><b>Request:</b> Here you can see the request made by users you can see here if the user's request had already been emailed, what type of item they are requesting and here you can also delete and approve request.</p>
            <img className="w-auto h-auto cursor-pointer" src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712336706/UserManual/Group_22_uqqs9s.png" alt="RequestList"
              onClick={() =>toggleZoom("https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712336706/UserManual/Group_22_uqqs9s.png")
              }
            />
          </div>
          {/*View details */}
          <div className="border-[0.2rem] border-[#F9D62B] w-full h-full rounded-[1rem] p-[0.2rem] hover:opacity-50">
            <img className="w-auto h-auto cursor-pointer" src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712336886/UserManual/Group_23_xgvdpq.png" alt="RequestList"
              onClick={() =>toggleZoom("https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712336886/UserManual/Group_23_xgvdpq.png")
              }
            />
          </div>
          {/*Authorization */}
          <div className="border-[0.2rem] border-[#F9D62B] w-full h-full rounded-[1rem] p-[0.2rem] hover:opacity-50">
            <p><b>Authorization:</b> Here you can change any existing user if u have an admin privielege.</p>
            <img className="w-auto h-auto cursor-pointer" src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712337026/UserManual/Group_24_plt3rn.png" alt="Authorization"
              onClick={() =>toggleZoom("https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712337026/UserManual/Group_24_plt3rn.png")
              }
            />
          </div>
          {/*History Logs */}
          <div className="border-[0.2rem] border-[#F9D62B] w-full h-full rounded-[1rem] p-[0.2rem] hover:opacity-50">
            <p><b>History logs:</b> Here you can generate the history of all the activity logs in a specific date.</p>
            <img className="w-auto h-auto cursor-pointer" src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712416756/UserManual/Group_25_rrhzih.png" alt="History Logs"
              onClick={() =>toggleZoom("https://res.cloudinary.com/dxjpbwlkh/image/upload/v1712416756/UserManual/Group_25_rrhzih.png")
              }
            />
          </div>
        </div>
        {isZoomed && (
          <div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50"
            onClick={closeZoom} // Close zoomed view when clicked outside the image
          >
            <img
              src={zoomedImageSrc}
              alt="Zoomed Image"
              className="max-w-full max-h-full"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default UserManual;
