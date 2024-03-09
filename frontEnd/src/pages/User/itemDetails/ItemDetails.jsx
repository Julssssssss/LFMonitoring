import { Link, useLocation } from "react-router-dom";
import axios from "axios"
import { axiosReFetchToken } from "../../../components/api/axios";
import { useState } from "react";
import Carousel from "../itemDetails/Carousel"
import Confirmation from "../Confirmation/Confirmation";

const ItemDetails = () => {

  const location = useLocation()
  const data = location.state.el
  //for modal
  const [userClicked, setuserClicked] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false)
  
  const handleYesAction = () => {
    setuserClicked(true); // Set the userClicked state to true
    if(!cooldownActive){
      setCooldownActive(true)
      sendReq() 
      
    }
  };

  const accessToken = localStorage.getItem('accessToken')
 
  const sendReq = async()=>{
    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/prot/request`,
        {itemId : data._id}, 
        {
          headers:{
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
      .then(setTimeout(()=>{
        setCooldownActive(false)
      },5000))
    }
    catch(err){console.log(err)}
  } 

  //catch errors
  axios.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      try{    
          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axiosReFetchToken.post()
                .then(response => {
                    const newAccessToken = response.data.accessToken;
                    const temp = JSON.stringify(newAccessToken)
                    localStorage.setItem('accessToken', temp);
                    originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                });
            }
            else if (error.response.status === 401) {
              window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
              
              return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
        } 
        catch (e){
            console.log(e)
            logout()
            return Promise.resolve()
        }

      return Promise.reject(error);
    }
  );

  
  return (
    <>
    <div className="relative flex flex-col h-screen bg-[#0d1832] font-poppins overflow-y-auto overflow-x-hidden">
      {/* Close button */}
      <div className="bg-[#0d1832] flex flex-row ">
        <Link to='/Dashboard'>
          <button className='mt-[1rem] ml-[1rem] w-[2rem] h-[2rem] xl:w-[3rem] xl:h-[3rem] 3xl:w-[4rem] 3xl:h-[4rem]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 26" className="fill-[#F9D62B] hover:fill-white">
              <g clipPath="url(#clip0_535_21)">
                <path d="M23.625 1.625C24.0726 1.625 24.5018 1.7962 24.8182 2.10095C25.1347 2.4057 25.3125 2.81902 25.3125 3.25V22.75C25.3125 23.181 25.1347 23.5943 24.8182 23.899C24.5018 24.2038 24.0726 24.375 23.625 24.375H3.375C2.92745 24.375 2.49822 24.2038 2.18176 23.899C1.86529 23.5943 1.6875 23.181 1.6875 22.75V3.25C1.6875 2.81902 1.86529 2.4057 2.18176 2.10095C2.49822 1.7962 2.92745 1.625 3.375 1.625H23.625ZM3.375 0C2.47989 0 1.62145 0.34241 0.988515 0.951903C0.355579 1.5614 0 2.38805 0 3.25L0 22.75C0 23.612 0.355579 24.4386 0.988515 25.0481C1.62145 25.6576 2.47989 26 3.375 26H23.625C24.5201 26 25.3785 25.6576 26.0115 25.0481C26.6444 24.4386 27 23.612 27 22.75V3.25C27 2.38805 26.6444 1.5614 26.0115 0.951903C25.3785 0.34241 24.5201 0 23.625 0L3.375 0Z"/>
                <path d="M17.2207 20.241C17.369 20.1768 17.4949 20.0727 17.5832 19.9413C17.6715 19.8098 17.7185 19.6566 17.7185 19.5V6.5C17.7186 6.34339 17.6716 6.19009 17.5833 6.05858C17.495 5.92706 17.369 5.82293 17.2207 5.75872C17.0724 5.6945 16.9079 5.67295 16.7471 5.69664C16.5864 5.72033 16.4361 5.78826 16.3145 5.89225L8.72077 12.3923C8.63155 12.4685 8.56012 12.5621 8.51121 12.6668C8.4623 12.7716 8.43701 12.8851 8.43701 13C8.43701 13.1149 8.4623 13.2284 8.51121 13.3332C8.56012 13.4379 8.63155 13.5315 8.72077 13.6078L16.3145 20.1078C16.4362 20.2117 16.5864 20.2796 16.7472 20.3032C16.9079 20.3269 17.0724 20.3053 17.2207 20.241Z"/>
              </g>
              <defs>
                <rect width="27" height="26" fill="white"/>
              </defs>
            </svg>
          </button>
        </Link>
      </div>

        <div className="flex flex-col 2xl:h-screen 3xl:h-screen items-center justify-center xl:space-y-[2rem] 3xl:space-y-[3.5rem]">
          {/* IMG */}
          <div className="flex flex-col items-center mt-[1rem] justify-center sm:flex-row sm: sm:space-x-[2rem] xl:space-x-[2.5rem]">
            <Carousel />
            {/* DIV FOR CONTAINER OF CONTENTS */}
            <div className=" whitespace-nowrap text-center p-[1.2rem] flex flex-col items-center justify-center bg-[#17394c] h-auto w-[19rem] xsm:w-[21rem] md:w-[22rem] md:h-auto lg:w-[25rem] lg:text-[1.4rem] xl:w-[25rem] xl:text-[1.3rem] 2xl:w-[30rem] 3xl:w-[34rem] 3xl:text-[2rem] mt-[3rem] mb-[4rem] rounded-lg text-white">
              {/* title */}
              <div>{data.nameItem}</div>

              {/* desc container */}
              <div className="mt-[1.5rem] w-full h-auto shadow-sm rounded-sm shadow-[#0d1832]">
                {/* desc */}
                <h1 className="mt-5 p-3">{data.desc}</h1>
                {/* found at */}
                <p className="p-3 mt-[1rem] h-auto">FOUND AT {data.found} </p>
              </div>
            </div>
              {/* request button */}
            
             
            
            <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709214386/Assets/Polygon_11_qhnrk7.png" alt="triangle1" className="absolute top-[6rem] -left-[2.5rem] h-[5rem] w-[5rem] sm:h-[6rem] sm:w-[6.5rem] xl:h-[8rem] xl:w-[8rem] 3xl:h-[12rem] 3xl:w-[12rem]"/>
            
          
          </div>
          <Confirmation onYesAction={handleYesAction}/>
        </div>  
    </div>
    </>
  );
};

export default ItemDetails;