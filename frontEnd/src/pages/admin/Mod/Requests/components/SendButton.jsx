import { useState } from "react";
import { axiosSendEmail } from "../../../../../components/api/axios";
import LoadingDots from "../../../../404/LoadingDots";

const SendButton = ({ subject, emailContent, requestBy, index, nameItem }) => {
  const [showPopup, setShowPopup] = useState(false);
 // const [loading, setLoading] = useState(true); 

  const Success =()=>{
   alert('Email successfully delivered.')
   window.location.reload();
  }

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
 
  const sendEmail = async () => {
    try {
      await axiosSendEmail.post('', {
        id: index,
        to: requestBy,
        subject: subject,
        text: emailContent,
      });
      closePopup(); 
      
      Success()
    } catch (error) {
      console.error("Error sending email:", error);
      
    }
  };

  const checker = () => {
    try {
      console.log('here', nameItem)
      if (subject.trim() === '' || emailContent.trim() === '' || requestBy.trim() === '') {
        alert('Please fill out all required fields.');
        if(nameItem){
          openPopup(); 
        }
      }else {
        alert("The requested item no longer exists in the system.")
      }
    } catch (error) {
      console.log(error);
    }
  };



  
  
  return (
    <>
      <div>
        <button onClick={checker} className="bg-[#F9D62B] hover:bg-[#134083] hover:text-white self-center w-[10rem] h-[2rem] md:h-[3rem] md:w-[12rem] md:text-[1.5rem] lg:h-[2.5rem] xl:text-[2rem] xl:h-[3rem] xl:w-[15rem] border-[0.1rem] text-black text-[1rem] rounded-full">
          SEND
        </button>

        {showPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="text-white text-[1rem] md:text-[2rem] text-center bg-[#134083] p-[1.5rem] rounded-2xl shadow-md w-[15rem] h-[20rem] md:w-[25rem] md:h-[35rem]">
              <div className="flex flex-col h-full space-y-[5rem] justify-center items-center">
                <div>Are you sure you want to send this email?</div>
                <div className="flex flex-row space-x-[2rem]">
                  <button
                    type="button"
                    className="text-black text-[1rem] md:text-[1.5rem] bg-[#F9D62B] hover:bg-white w-[4rem] h-[2rem] md:h-[2.5rem] md:w-[6rem] rounded-full mr-2"
                    onClick={sendEmail}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="text-white text-[1rem] md:text-[1.5rem] bg-gray-500 w-[4rem] h-[2rem] md:h-[2.5rem] md:w-[6rem] rounded-full ml-2 hover:bg-[#134083] hover:border-[0.1rem] hover:border-white"
                    onClick={closePopup}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SendButton;
