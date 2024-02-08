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
    <div className='mb-[2rem]'>
      <button
        className='text-black bg-[#F9D62B] rounded-xl h-[2rem] w-[14rem]'
        onClick={() => setIsModalOpen(true)}
      >
        Request for Appointment
      </button>
      <Modal
        className='font-poppins p-[1rem] rounded-xl bg-[#17394C] m-[2rem] mt-[7rem] text-white'
        isOpen={isModalOpen}
        onRequestClose={handleNoClick}
        contentLabel="Custom Modal"
      >
        <div className='rounded-xl space-y-[2rem] mt-[2rem] text-center items-center'>
          <div className='text-center'>
            We'll begin the procedure as soon as we receive your confirmation. Are you certain about your decision?
          </div>
          <div className='space-x-[2rem] text-black'>
            <button className='bg-[#F9D62B] w-[3rem] rounded-lg' onClick={showSuccessAlert}>
              Yes
            </button>
            <button className='bg-[#F9D62B] w-[3rem] rounded-lg' onClick={handleNoClick}>
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Confirmation;
