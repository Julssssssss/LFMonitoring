import { useState } from 'react';
import Sidebar from '../MainComponents/SideBar';
import axios from 'axios';
import { axiosReFetchToken } from '../../../components/api/axios';

const Privilege = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [tempRole, setTempRole] = useState(null);
  const [cooldownActive, setCooldownActive] = useState(false);

  const dropResult = () => {
    if(!isOpen)
    {
      setUserData(null);
      if(searchQuery){
        findUser();
      }
    }
    setIsOpen(true);
  };

  const role = localStorage.getItem('role');
  const accessToken = localStorage.getItem('accessToken');

  if(role !== 'admin'){
    window.location.href='/401';
  } 

  const findUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/priv/userData`,
        { Email: searchQuery }, 
        {
          headers:{
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      setUserData(response.data);
      setTempRole(response.data.Role);
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 403 catcher
  axios.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      try {
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          return axiosReFetchToken.post()
              .then(response => {
                  const newAccessToken = response.data.accessToken;
                  const temp = JSON.stringify(newAccessToken);
                  localStorage.setItem('accessToken', temp);
                  originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                  return axios(originalRequest);
              });
        } else if (error.response.status === 401) {
          window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
          return Promise.resolve(); // Returning a resolved promise to stop further processing
        }
      } catch (e) {
        console.log(e);
        logout();
        return Promise.resolve();
      }
      return Promise.reject(error);
    }
  );

  const handleInputChange = (e) => {
    setIsOpen(false);
    setSearchQuery(e.target.value);
  };

  // buttons function
  const setRole = async (roleToChange) => {
    try {
      switch (roleToChange) {
        case 0:
          roleToChange = "user";
          break;
        case 1:
          roleToChange = "mod";
          break;
        case 2:
          roleToChange = "admin";
          break;
      }
      setTempRole(roleToChange);
      if (!cooldownActive) {
        await axios.post(`${import.meta.env.VITE_API_URL}/priv/setRoles`,
          {
            'Email': userData.Email,
            'roleToChange': roleToChange
          }, 
          {
            headers:{
              'Authorization': `Bearer ${accessToken}`
            }
          }
        ).then(response => {
          console.log(response.data);
          alert('the privilege of the user has been successfully changed');
          setCooldownActive(true);
          setTimeout(() => {
            setCooldownActive(false);
          }, 5000);
        }).catch(err => {
          console.log(err);
          alert('There is a problem that occurred. Try again later.');
        });
      } 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-row h-screen w-screen bg-[#17394C] lg:space-x-[5rem] xl:space-x-[7rem] overflow-x-hidden overflow-y-hidden'>
      <div className='absolute z-10 lg:relative'>
        <Sidebar />
      </div>
      <div className="flex flex-col self-center p-[1rem] md:p-[2rem] lg:rounded-l-[6rem] h-full w-screen bg-[#0D1832] border-[#134083]">
        <div className="flex flex-col justify-between mt-[0.5rem] mb-[1rem] text-white whitespace-nowrap px-[1rem] lg:px-0">
          <div className='font-poppins ml-[2rem] md:ml-[5rem] md:text-[2rem] lg:ml-0 xl:text-[3rem]'>
            AUTHORIZATION
          </div>   
        </div>
        <div className="self-center h-full w-screen px-[1rem] md:px-[2rem] lg:px-[0rem] lg:w-full">
          <div className="flex flex-col items-center h-full w-full rounded-[1.5rem] bg-[#134083] px-[1rem]">
            <div className='flex flex-row space-x-[1.5rem] items-center top-[8rem] relative'>
              <div className="relative Z-0">
                <div className=' flex flex-row space-x-[0.5rem] items-center'>
                  <input type='text' 
                    className="text-justify rounded-xl w-full h-[2rem] md:h-[2.5rem] md:w-[20rem] xl:w-[30rem] xl:h-[3.5rem] xl:rounded-full font-poppins bg-[#17394C] text-[0.7rem] sm:text-[1.1rem] md:text-[1rem] xl:text-[1.5rem] p-2 text-white"
                    placeholder='Enter Email' 
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                  <button
                    onClick={dropResult}
                    className="w-[7rem] h-[1.5rem] md:h-[2rem] md:text-[1.5rem] xl:text-[1.8rem] xl:h-[2.5rem] xl:w-[9.5rem] text-black font-poppins flex items-center text-[1rem] justify-center bg-[#F9D62B] rounded-2xl hover:bg-[#134083] hover:text-white hover:border-white hover:border-[0.1rem]"
                  >
                    Find
                  </button>
                </div>
                {isOpen && (
                  <div className="flex flex-col mt-[2rem] space-y-[1rem] p-[1rem] text-[1.5rem] drop-shadow-2xl text-white rounded-xl shadow-md bg-[#17394C] w-[16rem] xsm:w-[17rem] sm:w-[21.6rem] md:w-[28rem] xl:w-[40rem] px-[1rem] h-auto">
                    <div className='flex flex-row justify-between text-[0.7rem] sm:text-[1.1rem] md:text-[1.5rem] xl:text-[1.8rem]'>
                      {userData ? (
                        <>
                          <div>{userData.Email}</div>
                          <div>{tempRole}</div>
                        </>
                      ) : (
                        loading ? (
                          <div className="flex justify-center items-center">
                            <span className="loading loading-dots loading-lg"></span>
                          </div>
                        ) : (
                          <div>User not Found</div>
                        )
                      )}
                    </div>
                    {userData && (
                      <div className='flex flex-row space-x-[1rem] justify-center font-poppins text-black font-bold text-[0.6rem] sm:text-[0.8rem] md:text-[1rem] xl:text-[1.5rem] items-center'>
                        <button className='bg-[#F9D62B] hover:bg-[#134083] hover:text-white hover:border-white border-[0.1rem] rounded-full w-[11rem] h-[1.5rem] md:h-[2rem] xl:h-[3rem]'
                          onClick={() => {setRole(0);}}>
                          User
                        </button>
                        <button className='bg-[#F9D62B] hover:bg-[#134083] hover:text-white hover:border-white border-[0.1rem] rounded-full w-[11rem] h-[1.5rem] md:h-[2rem] xl:h-[3rem]'
                          onClick={() => {setRole(1);}}>
                          Moderator
                        </button>
                        <button className='bg-[#F9D62B] hover:bg-[#134083] hover:text-white hover:border-white border-[0.1rem] rounded-full w-[11rem] h-[1.5rem] md:h-[2rem] xl:h-[3rem]'
                          onClick={() => {setRole(2);}}>
                          Administrator
                        </button>
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
