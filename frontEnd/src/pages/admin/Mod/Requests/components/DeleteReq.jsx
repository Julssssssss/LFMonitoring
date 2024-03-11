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
    <div className="md:mt-[0.1rem]">
        <button className="bg-[#F9D62B] font-poppins hover:bg-[#134083] hover:text-white w-[5rem] rounded-full py-[0.2rem] md:w-[4rem] md:text-[0.7rem] md:p-[0.1rem] 2xl:w-[5rem] 3xl:text-[1.3rem] 3xl:w-[6rem]"
        type='button'
        onClick={openPopup}
        >
          Delete
        </button>
    </div>
    {showConfirmation && (
            <div className="absolute inset-0 flex justify-center bg-black bg-opacity-50">
              <div className="z-30 text-white text-[2rem] place-self-center text-center bg-[#134083] p-[1.5rem] rounded-2xl shadow-md w-[30rem] h-[45rem] md:w-[25rem] md:h-[40rem] 2xl:h-[45rem] 2xl:w-[30rem]">
                <div className="flex flex-col h-[40rem] space-y-[10rem] justify-center items-center">
                  <div>Are you sure you want to delete this request?</div>
                  <div className="flex flex-row space-x-[7rem] md:space-x-[4rem]">
                    <button
                      type="button"
                      className="text-black text-[1.5rem] bg-[#F9D62B] hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white w-[8rem] h-[3rem] rounded-full mr-2"
                      onClick={sendDeleteReq}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="text-white text-[1.5rem] bg-gray-500 w-[8rem] h-[3rem] rounded-full ml-2 hover:bg-[#F9D62B] hover:text-white hover:border-[0.1rem] hover:border-white"
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