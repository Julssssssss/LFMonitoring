import { useEffect, useState } from "react";
import { axiosReFetchToken } from "../../../../../components/api/axios";
import axios from 'axios'


const Approve = ({ RequestItem, Item, index, list }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lists, setLists] = useState([])

  useEffect(()=>{
    setLists(list)
  }, [])

  const openPopup = () => {
    setShowConfirmation(true);
  };

  const closePopup = () => {
    setShowConfirmation(false);
  };

  const accessToken = localStorage.getItem('accessToken')

  const selectedItem = Item.find((item) => item._id === RequestItem.itemId);

  const sendToArchive = async()=>{
    console.log('hello', list)
    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/priv/ArchivingTrans`,
        {Request : lists[index]}, 
        {
          headers:{
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
      .then(res=>{
        console.log(res.data)
        if(res.data == "success"){
        alert("Successfully Archived!")
        window.location.reload();
        closePopup()
      }
      })
      
    }
    catch(err){console.log(err)}
  }

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

  return (
    <>
      <div className="md:mt-[0.1rem]">
        <button
          onClick={openPopup}
          type="button"
          className="bg-[#F9D62B] font-poppins hover:bg-[#134083] hover:text-white w-[5rem] md:w-[4rem] md:text-[0.7rem] md:p-[0.1rem] 2xl:w-[5rem] 3xl:text-[1.3rem] 3xl:w-[6rem] rounded-full text-center"
        >
          Approve
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col bg-[#134083] shadow-md w-[40rem] h-[35rem] rounded-2xl whitespace-pre space-y-[1rem] items-center">
          <button
              className="w-[3rem] h-[3rem] md:w-[2rem] md:h-[2rem] place-self-end m-[0.5rem] 2xl:w-[3rem] 2xl:h-[3rem] stroke-[#F9D62B] hover:stroke-white"
              onClick={closePopup}
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
          <div className="flex flex-col space-y-[3rem] justify-center items-center">
            <div className='text-[1.5rem] space-y-[1rem] font-poppins text-white'>
                <div className="flex flex-col items-start justify-start space-y-[1rem]">
                  <div className="flex items-center space-x-[5rem]">
                    <div className="w-[15rem]">Name of item:</div>
                    <div>{selectedItem.nameItem}</div>
                  </div>
                  <div className="flex items-center space-x-[5rem]">
                    <div className="w-[15rem]">Description:</div>
                    <div>{selectedItem.desc}</div>
                  </div>
                  <div className="flex items-center space-x-[5rem]">
                    <div className="w-[15rem]">Found at:</div>
                    <div>{selectedItem.found}</div>
                  </div>
                  <div className="flex items-center space-x-[5rem]">
                    <div className="w-[15rem]">Surrendered by:</div>
                    <div>{selectedItem.surrenderedBy}</div>
                  </div>
                  <div className="flex items-center space-x-[5rem]">
                    <div className="w-[15rem]">Date posted:</div>
                    <div className="text-center">{selectedItem.datePosted}</div>
                  </div>
                  <div className="flex items-center space-x-[5rem]">
                    <div className="w-[15rem]">Owner:</div>
                    <div>{RequestItem.Email}</div>
                  </div>
              </div>
            </div>

            <button onClick={sendToArchive} className="bg-[#F9D62B] hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white text-[1.5rem] text-black p-2 rounded-2xl w-[10rem] font-poppins">
              APPROVE
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Approve;