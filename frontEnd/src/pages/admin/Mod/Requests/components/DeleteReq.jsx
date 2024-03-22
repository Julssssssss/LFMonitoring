import { axiosDeleteReq } from "../../../../../components/api/axios";
import { useState } from "react";

const DeleteReq = ({reqData}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openPopup = () => {
    setShowConfirmation(true);
  };

  const closePopup = () => {
    setShowConfirmation(false);
  };

    
    const sendDeleteReq = async()=>{
      try{
        await axiosDeleteReq.post(null, {'data':reqData._id})
        .then(res=>{
            console.log(res)
            window.location.reload();
        })
        .catch(err=>{console.log(err)})
      }
      catch(err){console.log(err)}
    }

  return (
    <>
    <div className="">
        <button className="bg-[#F9D62B] font-poppins text-black text-[0.7rem] hover:bg-[#134083] hover:text-white w-[4rem] md:text-[1rem] md:w-[5rem] md:h-[1.5rem] rounded-full"
        type='button'
        onClick={openPopup}
        >
          Delete
        </button>
    </div>
    {showConfirmation && (
            <div className="absolute -inset-4 z-50 flex flex-col w-full h-full justify-center items-center bg-black bg-opacity-50">
            <div className="text-white text-[1rem] font-poppins text-center bg-[#134083] p-[1.5rem] rounded-2xl shadow-md w-[15rem] h-[25rem]">
                <div className="flex flex-col h-[20rem] space-y-[5rem] justify-center items-center">
                  <div>Are you sure you want to delete this request?</div>
                  <div className="flex flex-row space-x-[1rem]">
                    <button
                      type="button"
                      className="text-black text-[1rem] bg-[#F9D62B] hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white w-[5rem] h-[2rem] rounded-full mr-2"
                      onClick={sendDeleteReq}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="text-white text-[1rem] bg-gray-500 w-[5rem] h-[2rem] rounded-full ml-2 hover:bg-[#F9D62B] hover:text-white hover:border-[0.1rem] hover:border-white"
                      onClick={closePopup}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
    </>
  )
}

export default DeleteReq