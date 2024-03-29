import { useState } from 'react';
import { axiosUnclaimedItems } from '../../../../../components/api/axios';

const Archive = ({ Info }) => {
  const [item, setItem] = useState({
    id: Info._id,
    nameItem: Info.nameItem,
    desc: Info.desc,
    found: Info.found,
    surrenderedBy: Info.surrenderedBy,
    postedBy: Info.postedBy,
    url: Info.url,
    datePosted: Info.datePosted,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false)

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    
  };
  const archiveSuccess = () => {
    alert('Process completed successfully');
    window.location.reload();
  };

  const sendToArchive = async () => {
    try {
      if(!cooldownActive){
        console.log('Sending item to archive:', item)
        await axiosUnclaimedItems.post(`${item.id}`)
        .then(response=>{
          console.log(response)
          archiveSuccess()
          setCooldownActive(true)

            setTimeout(()=>{
              //console.log('hi')
              setCooldownActive(false)
            }, 5000)
          console.log('Item sent to archive:', archive.data);
        })
        .catch(err=>{console.log(err)})
      }
    } catch (error) {
      console.error('Error sending to archive', error);
    }
  };


  return (
    <>
      <div>
        <button
          onClick={openPopup}
          className="bg-[#F9D62B] hover:bg-[#134083] hover:text-white text-[0.7rem] font-bold font-poppins text-black w-[3.5rem] h-auto md:text-[1.2rem] md:w-[5rem] xl:text-[1.5rem] xl:w-[7rem] rounded-full"
        >
          Archive
        </button>
      </div>

      {showPopup && (
        <div className="absolute z-20 inset-0 -left-[1rem] justify-center w-auto flex flex-row items-center bg-black bg-opacity-50">
          <div className="flex flex-col bg-[#134083] border-[0.2rem] border-[#F9D62B] self-center shadow-md w-full h-auto p-1 pb-[1rem] mx-[0.5rem] xsm:mx-[1rem] sm:w-full md:w-[35rem] xl:w-[50rem] rounded-2xl whitespace-pre md:space-y-[1.2rem] items-center">
          <button
              className="w-[2rem] h-[2rem] xl:w-[3rem] xl:h-[3rem] md:w-[2.5rem] md:h-[2.5rem] place-self-end m-[0.5rem] md:mr-[1rem] stroke-[#F9D62B] hover:stroke-white"
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
            
            <div className="flex flex-col space-y-[2rem] justify-center items-center">
                <div className='text-[0.7rem] sm:text-[0.8rem] md:text-[1.5rem] xl:text-[2rem] space-y-[1rem] font-poppins text-white whitespace-normal'>
                  <div className="flex flex-col items-start justify-start space-y-[0.5rem]">
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-[6rem] sm:w-[8rem md:w-[14rem] xl:w-[20rem]">Name of item:</div>
                      <div className="w-[10rem] md:w-[14rem] sm h-auto xl:w-[20rem]">{item.nameItem}</div>
                    </div>
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-[6rem] sm:w-[8rem] md:w-[14rem] xl:w-[20rem]">Description:</div>
                      <div className="w-[10rem] md:w-[14rem] h-auto xl:w-[20rem]">{item.desc}</div>
                    </div>
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-[6rem] sm:w-[8rem] md:w-[14rem] xl:w-[20rem]">Found at:</div>
                      <div className="w-[10rem] md:w-[14rem] h-auto xl:w-[20rem]">{item.found}</div>
                    </div>
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-[6rem] sm:w-[8rem] md:w-[14rem] xl:w-[20rem]">Surrendered by:</div>
                      <div className="w-[10rem] md:w-[14rem] h-auto xl:w-[20rem]">{item.surrenderedBy}</div>
                    </div>
                    <div className="flex items-center space-x-[1rem] h-auto w-auto text-wrap">
                      <div className="w-[6rem] sm:w-[8rem] md:w-[14rem] xl:w-[20rem]">Date posted:</div>
                      <div className="w-[10rem] md:w-[14rem] h-auto xl:w-[20rem]">{item.datePosted}</div>
                    </div>
                </div>
              </div>
              </div>

            <button
              onClick={sendToArchive}
              className="font-poppins bg-[#F9D62B] font-bold text-[0.7rem] md:text-[1.5rem] xl:text-[1.9rem] text-black p-2 rounded-full mt-4 hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white"
            >
              Confirm Archive
            </button>
            
          </div>
        </div>
      )}
    </>
  );
};

export default Archive;
