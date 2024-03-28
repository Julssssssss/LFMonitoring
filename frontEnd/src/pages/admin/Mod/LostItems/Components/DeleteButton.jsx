import { axiosDeleteItem } from "../../../../../components/api/axios";
import { useState } from "react";

const showWarning = (message) => {
  alert(message);
};

const DeleteButton = ({ Info, onDelete }) => {
  const [confirm, setConfirm] = useState(false);

  const [cooldownActive, setCooldownActive] = useState(false)


  const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
      <div className="absolute z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#134083] shadow-md w-[15rem] h-[25rem] rounded-2xl">
          {children}
        </div>
      </div>
    );
  };

  const selectedItem = async () => {
    if(!cooldownActive){
      try {
        await axiosDeleteItem.post(`${Info._id}`, { 
          data: { url: Info.url } })
          
        .then(res=>{

          onDelete(Info._id, Info.url);
          showWarning('Successfully removed.')
          setConfirm(false); 
          window.location.reload();
          setCooldownActive(true)

            setTimeout(()=>{
            
              setCooldownActive(false)
            }, 5000)
        })
      } 
      catch (error) {
        console.error('Error deleting information:', error);
      }
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => setConfirm(true)}
          className="bg-[#F9D62B] hover:bg-[#134083] hover:text-white text-[0.7rem] font-bold font-poppins text-black w-[3.5rem] h-auto md:text-[1.2rem] md:w-[5rem] xl:w-[7rem] xl:text-[1.5rem] rounded-full"
        >
          Delete
        </button>

        {confirm && (
          <Modal isOpen={confirm} onClose={() => setConfirm(false)}>
            <div className="absolute inset-0 flex justify-center bg-black bg-opacity-50">
              <div className="absolute border-[0.2rem] border-[#F9D62B] z-50 text-white text-[1rem] md:text-[2.5rem] font-poppins place-self-center text-center bg-[#134083] p-[1.5rem] rounded-2xl shadow-md w-[15rem] h-[25rem] md:w-[24rem] md:h-[36rem]">
                <div className="flex flex-col h-[20rem] md:h-full space-y-[5rem] justify-center items-center">
                  <div>Are you sure you want to remove this item?</div>
                  <div className="flex flex-row space-x-[1rem]">
                    <button
                      type="button"
                      className="text-black text-[0.7rem] bg-[#F9D62B] hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white w-[5rem] h-[2rem] md:w-[8rem] md:h-[3rem] md:text-[1.5rem] rounded-full mr-2"
                      onClick={selectedItem}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="text-white text-[0.7rem] bg-gray-500 w-[5rem] h-[2rem] md:w-[8rem] md:h-[3rem] md:text-[1.5rem] rounded-full ml-2 hover:bg-[#F9D62B] hover:text-white hover:border-[0.1rem] hover:border-white"
                      onClick={() => setConfirm(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default DeleteButton;
