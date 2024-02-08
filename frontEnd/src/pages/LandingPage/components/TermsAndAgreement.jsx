
import { Auth } from "./Auth"
import axios from 'axios'

const TermsAndAgreement = ({closeTAC}) => {

  const accessToken = localStorage.getItem('accessToken');

  const handleAcceptTAC = async () => {
    try{
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/prot/TACagreement`,
        null,
        {
            headers: {
                'authorization': `Bearer ${accessToken}`
            }
        }
      )
      Auth()
    }
    catch(err){console.log(err)}
  }


  return (
    <div className='h-auto w-[20rem] fixed top-10 left-7 z-30 bg-[#0D1E48] border-2 border-[#F9D62B] rounded-xl text-white'>
      <div className='flex flex-col items-center'>
        <div className="w-full flex flex-row justify-end">
          <button onClick={closeTAC} className='h-[1.5rem] w-[1.5rem] m-[0.5rem] rounded-full'>
            <svg fill="#F9D62B" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
            pace="preserve" stroke="#F9D62B"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.84,0,0,114.842,0,256s114.84,256,256,256s256-114.842,256-256S397.16,0,256,0z M256,462.452 c-113.837,0-206.452-92.614-206.452-206.452S142.163,49.548,256,49.548S462.452,142.163,462.452,256S369.837,462.452,256,462.452z "></path> </g> </g> <g> <g> <polygon points="355.269,191.767 320.233,156.731 256,220.964 191.767,156.731 156.731,191.767 220.964,256 156.731,320.233 191.767,355.269 256,291.036 320.233,355.269 355.269,320.233 291.036,256 "></polygon> </g> </g> </g></svg>
          </button>
        </div>

        <div className='w-full text-center text-[1rem] font-poppins font-bold'>
          Terms and Condition 
        </div>
        <div className='w-full overflow-auto overscroll-contain text-justify h-[20rem] mb-[1rem] text-[0.8rem] font-poppins font-thin px-[0.9rem]'>
          <div className="p-[0.2rem]">
            These terms and conditions govern your use of the Lost and Found Monitoring Solutions, provided by Rizal Technological University. By using the system you agree to accept by these terms.<br/> <br/>
            <b>1.	Registration and User Information</b> <br/>
            <b>1.1.</b>	To use the system, you may be required to use your Institutional Account as this system are only allowed for RTU members. The process will gone through Google sign-in, that will grant the system to access your information such as email address and name.<br/>
            <b>1.2.</b>	Upon accepting, you are responsible for maintaining the confidentiality of your account information, including login credentials and for all activity that occurs under your account. <br/>
            <b>2.	Use of Personal Information</b> <br/>
            <b>2.1.</b>	The system will collect and store your name and email address for the purpose of providing lost and found services and sending email notifications to you.<br/>
            <b>2.2.</b>	The system will not share your personal information with third parties without your explicit consent, except as required by law. <br/>
            <b>3.	Email notifications </b> <br/>
            <b>3.1.</b>	By using the system, you agree to receive email notifications from the Administrator related to lost and found items that you have requested. You may receive email that contains about the items, instructions, and appointment schedule. <br/>
            <b>4.	Appointment Schedule </b> <br/>
            <b>4.1.</b>	Users acknowledge that the appointment schedule for item pickup is subject to the discretion of the service administrators and may not always align with users' preferences or expectations. <br/>
            <b>4.2.</b>	Users agree to be flexible and cooperative regarding appointment scheduling, recognizing that the primary goal is to facilitate a smooth and efficient process for all users. <br/>
            <b>5.	User Responsibilities </b> <br/>
            <b>5.1. </b>	You are responsible for all activities conducted under your account. <br/>
            <b>5.2.</b>	You are responsible for any item that you have request through the service, complying with the agreed-upon appointment schedule for item pickup as specified from the instructions from the email notification. <br/>
            <b>6.	Modifications to Terms </b> <br/>
            <b>6.1.</b>	The administrators and the department who handle this system reserves the right to modify or update these Terms at any time. <br/><br/>
              By using the Lost and Found Monitoring Solution System, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
          </div>
        </div>
        <button onClick={handleAcceptTAC} className='bg-[#003985] h-[2rem] w-[7rem] rounded-md font-poppins mb-[1rem]'>Accept</button>
      </div>
    </div>
  )
}

export default TermsAndAgreement