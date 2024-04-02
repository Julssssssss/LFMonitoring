import { axiosDeleteReq } from "../../../../../components/api/axios";
import { useState } from "react";

const DeleteReq = ({reqData}) => {
  const {id} = reqData
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const showAlert =(message)=>{
    alert(message)
  }
  const openPopup = () => {
    setShowConfirmation(true);
  };

  const closePopup = () => {
    setShowConfirmation(false);
  };
    
    const sendDeleteReq = async()=>{
      try{
        await axiosDeleteReq.post('', {'data':id})
        .then(res=>{
            console.log(res)
            window.location.reload();
            showAlert('Successfully deleted the request')
        })
        .catch(err=>{console.log(err)})
      }
      catch(err){console.log(err)}
    }

  return (
    <>
    <div className="">
        <button className="bg-[#F9D62B] font-poppins text-black text-[0.7rem] hover:bg-[#134083] hover:text-white w-[4rem] md:text-[1rem] md:w-[5rem] md:h-[1.5rem] xl:text-[1.2rem] xl:w-[7rem] xl:h-[2rem] rounded-full"
        type='button'
        onClick={openPopup}
        >
          Delete
        </button>
    </div>
    {showConfirmation && (
          <div className="fixed -left-[1rem] inset-0 flex justify-center bg-black bg-opacity-50">
            <div className="absolute z-50 text-white text-[1rem] md:text-[2.5rem] font-poppins place-self-center text-center bg-[#134083] border-[0.2rem] border-[#F9D62B] p-[1.5rem] rounded-2xl shadow-md w-[15rem] h-[25rem] md:w-[24rem] md:h-[41rem] lg:h-[37rem] xl:w-[26rem] xl:h-[43rem]">
              <div className="flex flex-col h-[20rem] md:h-full space-y-[5rem] justify-center items-center">
                  <div>Are you sure you want to delete this request?</div>
                  <div className="flex flex-row space-x-[1rem]">
                    <button
                      type="button"
                      className="text-black text-[1rem] md:text-[1.5rem] md:h-[2.5rem] md:w-[6rem] bg-[#F9D62B] hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white w-[5rem] h-[2rem] rounded-full mr-2"
                      onClick={sendDeleteReq}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="text-white text-[1rem] md:text-[1.5rem] md:h-[2.5rem] md:w-[6rem] bg-gray-500 w-[5rem] h-[2rem] rounded-full ml-2 hover:bg-[#F9D62B] hover:text-white hover:border-[0.1rem] hover:border-white"
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