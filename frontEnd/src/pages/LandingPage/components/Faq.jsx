import { useState } from "react";

const Faq = () => {
  const Questions = [
    { label: '1.	What is Lost and Found Monitoring Solution System?', contents: 'The lost and Found Monitoring Solution System is a platform designed to help individuals claim found items. Users can request appointments to retrieve items that have been reported as found.' },
    { label: '2.	How can I request an appointment to claim a found item?', contents: 'To request an appointment for claiming a found item, log in to your account and access the Found Items section. Select the item you wish to claim and click the "Request for Appointment" button.' },
    { label: '3.	Who decides the appointment schedule and instructions for item retrieval?', contents: 'The appointment schedule and specific instructions for item retrieval are determined by the administrators of the Lost and Found Monitoring System. They will review your appointment request and communicate the schedule and instructions to you via email.' },
    { label: '4.	How will I receive the appointment schedule and instructions?', contents: 'The administrators will send the appointment schedule and detailed instructions to your registered email address. It is essential to regularly check your email for updates regarding your appointment and item retrieval.' },
    { label: '5.	How can I surrender an item to the Lost and Found Monitoring System?', contents: 'Surrendering an item should be done in person at our designated physical location. If you have found an item and would like to surrender it, please visit our designated drop-off location during our operating hours. Our team will assist you with the surrender process.' }
  ];

  const [isOpen, setIsOpen] = useState(new Array(Questions.length).fill(false));

  const toggleDropdown = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  function Format() {
    return Questions.map((el, index) => {
      return (
        <div className="overflow-hidden" key={index}>
          <div className="bg-[#134083] rounded-full flex flex-row justify-between p-[0.2rem] px-[1rem] items-center relative z-20">
            <div className="text-[0.7rem] text-justify">{el.label}</div>
            <button
              onClick={() => toggleDropdown(index)}
              className="w-[1rem] h-[1rem] flex items-center justify-center"
            >
                  {
                    isOpen[index]
                      ? <svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></g></svg>
                      : <svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path></g></svg>
                  }
            </button>
          </div>
          {isOpen[index] && (
            <div className="p-2 text-justify text-[0.7rem] border border-[#F9D62B] rounded shadow-md mt-2">
              {el.contents}
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <>
      <div className="relative w-screen overflow-hidden">
        <div className="text-white font-poppins flex flex-col space-y-[1rem] mx-[1.5rem] mb-[3rem]">
          <div className="text-[1.5rem] font-bold">FAQ</div>
          <div className="text-[0.9rem]">
            Frequently Asked Questions
          </div>
          {Format()}
        </div>
        <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1702903076/Assets/ease_2_egomvy.png" alt="Mockups" className="absolute bottom-[-2rem] right-0 w-[10rem] h-[15rem] z-10 opacity-50"/>
      </div>
    </>
  );
};

export default Faq;
