import React, { useState } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const Confirmation = ({ onYesAction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const handleYesClick = () => {
    setIsModalOpen(false);
    onYesAction();
    
  };

  const handleNoClick = () => {
    setIsModalOpen(false);
  };

  const showSuccessAlert = () => {
    alert("Your request has been sent to the administrators!\n\nPlease check your email for further details and instructions");
    handleYesClick()
    window.location.href = "/Dashboard";
  };
  

  return (
    <div className='mb-[5rem]'>
      <button
        className='text-center text-black text-[0.9rem] bg-[#F9D62B] rounded-2xl h-[2.4rem] w-[13rem] p-[0.3rem] xl:h-[3rem] xl:w-[18rem] xl:text-[1.3rem] 2xl:w-[30rem] 2xl:h-[4.5rem] 2xl:text-[2rem]'
        onClick={() => setIsModalOpen(true)}
      >
        Request for Appointment
      </button>
      <Modal
        className='font-poppins p-[1rem] rounded-xl bg-[#17394C] m-[1rem] mt-[10rem] text-white'
        isOpen={isModalOpen}
        onRequestClose={handleNoClick}
        contentLabel="Custom Modal"
      >
        <div className='rounded-xl space-y-[2rem] text-center items-center h-full w-full flex flex-col justify-center lg:text-[1.3rem] xl:text-[2rem] 2xl:text-[3rem]'>
          <div className='text-center'>
            We'll begin the procedure as soon as we receive your confirmation. Are you sure you want to proceed?
          </div>
          <div className='space-x-[5rem] text-black'>
            <button className='bg-[#F9D62B] w-[6rem] lg:w-[8rem] xl:w-[10rem] 2xl:w-[12rem] rounded-lg' onClick={showSuccessAlert}>
              Yes
            </button>
            <button className='bg-[#F9D62B] w-[6rem] lg:w-[8rem] xl:w-[10rem] 2xl:w-[12rem] rounded-lg' onClick={handleNoClick}>
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Confirmation;
