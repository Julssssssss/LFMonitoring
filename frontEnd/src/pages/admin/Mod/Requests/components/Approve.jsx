import { useState } from "react";
import axios from 'axios';

const Approve = ({ list }) => {
  const accessToken = localStorage.getItem('accessToken');
  const [selectedItem, setSelectedItem] = useState(null);
  const {id, Email, itemId} = list

  const sendToArchive = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/priv/ArchivingTrans`, { Request: { id, Email, itemId} }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log(res.data);
      if (res.data === "success") {
        alert("Successfully Archived!");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //403 catcher
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

 
const sample =()=>{
  if(selectedItem.itemData){
    const {nameItem, desc, found, surrenderedBy, datePosted, haveBeenEmailed} = selectedItem.itemData
    return(
      <div className="fixed -left-[1rem] lg:inset-0 top-0 z-70 flex flex-col items-center justify-center h-screen">
        <div className="flex w-screen place-items-center justify-center h-screen bg-black bg-opacity-75">
          <div className="flex flex-col bg-[#134083] border-[0.1rem] border-[#F9D62B] rounded-[1rem] w-full mx-[1rem] md:mx-[2rem] lg:mx-[7rem] xl:mx-[15rem] h-auto p-[1rem]">
            <button
                className={`w-[2rem] h-[2rem] xl:w-[3rem] xl:h-[3rem] place-self-end m-[0.5rem] stroke-[#F9D62B] hover:stroke-white`}
                onClick={()=>{setSelectedItem(false)}}
              >
              <svg
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
                  <path
                    d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 14.9802 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
                    
                  ></path>{' '}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                    
                  ></path>{' '}
                </g>
              </svg>
            </button>

              <div className="flex flex-col space-y-[2rem] justify-center items-center">
                <div className='text-[0.7rem] sm:text-[0.9rem] xsm:text-[0.8rem] md:text-[1.5rem] xl:text-[1.7rem] space-y-[1rem] font-poppins text-white whitespace-normal'>
                  <div className="flex flex-col items-start justify-start space-y-[0.5rem]">
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-24 sm:w-[7rem] md:w-[16rem] lg:w-[20rem] xl:w-[22rem]">Name of item:</div>
                      <div className="w-[10rem] md:w-[16rem] h-auto lg:w-[20rem] xl:w-[22rem]">{nameItem}</div>
                    </div>
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-24 sm:w-[7rem] md:w-[16rem] lg:w-[20rem] xl:w-[22rem]">Description:</div>
                      <div className="w-[10rem] md:w-[16rem] h-auto lg:w-[20rem] xl:w-[22rem]">{desc}</div>
                    </div>
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-24 sm:w-[7rem] md:w-[16rem] lg:w-[20rem] xl:w-[22rem]">Found at:</div>
                      <div className="w-[10rem] md:w-[16rem] h-auto lg:w-[20rem] xl:w-[22rem]">{found}</div>
                    </div>
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-24 sm:w-[7rem] md:w-[16rem] lg:w-[20rem] xl:w-[22rem]">Surrendered by:</div>
                      <div className="w-[10rem] md:w-[16rem] h-auto lg:w-[20rem] xl:w-[22rem]">{surrenderedBy}</div>
                    </div>
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-24 sm:w-[7rem] md:w-[16rem] lg:w-[20rem] xl:w-[22rem]">Date posted:</div>
                      <div className="w-[10rem] md:w-[16rem] h-auto lg:w-[20rem] xl:w-[22rem]">{datePosted}</div>
                    </div>
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-24 sm:w-[7rem] md:w-[16rem] lg:w-[20rem] xl:w-[22rem]">Owner:</div>
                      <div className="w-[10rem] md:w-[16rem] h-auto lg:w-[20rem] xl:w-[22rem]">{Email}</div>
                    </div>
                </div>
              </div>
              <button onClick={sendToArchive} className={`bg-[#F9D62B] font-bold hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white text-[0.9rem] text-black p-[0.1rem] md:text-[1.5rem] md:h-[3rem] md:w-[10rem] lg:h-[2.2rem] lg:text-[1.2rem] rounded-full w-[7rem] font-poppins`}>
                APPROVE
              </button>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

  return (
    <>
      <div className="">
        <button
          onClick={()=>{list.haveBeenEmailed ? setSelectedItem(list): null}}
          type="button"
          className={`${list.haveBeenEmailed ?  null : `bg-[#836d04]`} bg-[#F9D62B] text-black font-poppins hover:bg-[#134083] text-[0.7rem] hover:text-white w-[4rem] md:w-[6rem] xl:text-[1.2rem] xl:h-[2rem] xl:w-[7rem] md:text-[1rem] rounded-full text-center`}
        >
          Approve
        </button>
      </div>

      {selectedItem ? sample() : null}
    </>
  );
};

export default Approve;