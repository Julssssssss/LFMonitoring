import { useState } from 'react';
import Sidebar from '../MainComponents/SideBar';
import axios from 'axios'
import { axiosReFetchToken } from '../../../components/api/axios';

const Privilege = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [userData, setUserData] = useState('')
  const [tempRole, setTempRole] = useState('')
  const [cooldownActive, setCooldownActive] = useState(false)

  const dropResult = () => {
    if(!isOpen)
    {
      setUserData(null)
      if(searchQuery){
        findUser()
      }
    }
    setIsOpen(true);
  };

  const role = localStorage.getItem('role')
  const accessToken = localStorage.getItem('accessToken')

  if(role != 'admin'){
    window.location.href='/401'
  } 

  const findUser = async()=>{
    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/priv/userData`,
        {Email : searchQuery}, 
        {
          headers:{
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
      .then(response=>{
        setUserData(response.data)
        setTempRole(response.data.Role)
      })
    }
    catch(error){
      console.log(error)
    }
  }
  //403 catcher
  axios.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      try{    
          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axiosReFetchToken.post()
                .then(response => {
                    const newAccessToken = response.data.accessToken;
                    const temp = JSON.stringify(newAccessToken)
                    localStorage.setItem('accessToken', temp);
                    originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                });
            }
            else if (error.response.status === 401) {
              window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
              
              return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
        } 
        catch (e){
            console.log(e)
            logout()
            return Promise.resolve()
        }

      return Promise.reject(error);
    }
  );
  

  const handleInputChange = (e) =>{
    setIsOpen(false)
    setSearchQuery(e.target.value)
  }


  //buttons function
  const setRole = async(roleToChange)=>{
    try{
      switch (roleToChange) {
        case 0:
          roleToChange = "user"
          break;
        case 1:
          roleToChange = "mod"
          break;
        case 2:
          roleToChange = "admin"
          break;
      }
      setTempRole(roleToChange)
      if(!cooldownActive){

        await axios.post(`${import.meta.env.VITE_API_URL}/priv/setRoles`,
          {
            'Email' : userData.Email,
            'roleToChange' : roleToChange
          }, 
          {
            headers:{
              'Authorization': `Bearer ${accessToken}`
            }
          }
        )
        .then(response=>{
          console.log(response.data)
          alert('the privielege of the user has been successfully changed')

          setCooldownActive(true)

          setTimeout(()=>{
            setCooldownActive(false)
          }, 5000)
          
        })
        .catch(err=>{
          console.log(err)
          alert('There is a problem that occured try again later')
        })
      } 
    }
    catch(err){console.log(err)}
  }


  return (
    <div className='flex flex-row h-screen w-screen bg-[#17394C] overflow-x-hidden overflow-y-hidden'>
      <Sidebar />
      <div className="flex flex-col self-center p-[1rem] h-full w-screen bg-[#0D1832] border-[#134083]">
        <div className="flex flex-col justify-between mt-[0.5rem] mb-[1rem] text-white whitespace-nowrap px-[1rem]">
          <div className='font-poppins ml-[2rem]'>
              PRIVILEGE
          </div>   
        </div>
        


        <div className="self-center h-full w-screen px-[1rem]">
          <div className="flex flex-col items-center h-full w-full rounded-[2rem] bg-[#134083]">
            <div className='flex flex-row space-x-[1.5rem] items-center top-[8rem] relative'>
              <div className="relative">
                <div className='flex flex-row space-x-[0.5rem] items-center'>
                  <input type='text' 
                    className="text-justify rounded-xl w-full h-[2rem] font-poppins bg-[#17394C] text-[0.7rem] p-2 text-white"
                    placeholder='Enter Email' 
                    value={searchQuery}
                    onChange={handleInputChange}
                  />

                  <button
                    onClick={dropResult}
                    className="w-[7rem] h-[1.5rem] text-black font-poppins flex items-center text-[1rem] justify-center bg-[#F9D62B] rounded-2xl"
                  >
                    Find
                  </button>
                </div>
                {isOpen && (
                
                  <div className="flex flex-col mt-[2rem] space-y-[1rem] p-[1rem] text-[1.5rem] drop-shadow-2xl text-white rounded-xl shadow-md bg-[#17394C] w-[16.8rem] px-[1rem] h-auto">
                    <div className='flex flex-row justify-between text-[0.7rem]'>
                      {userData ? (
                        <>
                          <div>{userData.Email}</div>
                          <div>{tempRole}</div>
                        </>
                      ) : (
                        <div>User not Found</div>
                      )}
                    </div>

                    {userData && (
                     
                      <div className='flex flex-row space-x-[1rem] justify-center font-poppins text-black font-bold text-[0.6rem] items-center'>
                        <button className='bg-[#F9D62B] rounded-full w-[11rem] h-[1.5rem]'
                        onClick={()=>{setRole(0)}}>User</button>

                        <button className='bg-[#F9D62B] rounded-full w-[11rem] h-[1.5rem]'
                        onClick={()=>{setRole(1)}}>Moderator</button>

                        <button className='bg-[#F9D62B] rounded-full w-[11rem] h-[1.5rem]'
                        onClick={()=>{setRole(2)}}>Administrator</button>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Privilege;
