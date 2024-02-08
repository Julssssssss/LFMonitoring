import { useState, useEffect } from "react";
import { axiosGetReqList, axiosReFetchToken } from "../../../../../components/api/axios";
import axios from 'axios'

const RequestList = () => {

  const [date, setDate] = useState('');
  const [list, setList] = useState([])

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  
  const getReqList = async() => {
    try{
      const res = await axiosGetReqList.post()
      setList(res.data.reqList)
      setFilteredData(res.data.reqList)
    }
    catch(err){
      console.log(err)
      return null
    }
  }

  useEffect(()=>{
    getReqList()
  }, [])

  const accessToken = localStorage.getItem('accessToken')
  
  //send transaction to be archived
  const sendToArchive = async(index)=>{
    console.log('hello', index)
    try{
      await axios.post(`${import.meta.env.VITE_API_URL}/priv/ArchivingTrans`,
        {Request : list[index]}, 
        {
          headers:{
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
      .then(response => {console.log(response)})
      if(response.data == "success"){
        alert("Successfully Archived!")
      }
    }
    catch(err){console.log(err)}
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

  const sort = (val)=>{
    if(val.length === 0){
      setFilteredData(list);
    }
    else{
      const filtered = list.filter((el) => {
        return el.Email.toLowerCase().includes(val.toLowerCase());
      });
      setFilteredData(filtered);
    }
  }

  const handleInputChange = (e) => {
    sort(e.target.value)
    setSearchQuery(e.target.value);
  };

  function searchBar() {
    return (
      <>
      
          <input
            type="text"
            placeholder="Search"
            className="mt-[1.5rem] ml-[1.5rem] mr-[1rem] mb-4 bg-[#17394C] p-[1rem] text-white h-[3rem] w-[30rem] rounded-full text-[1.4rem]"
            value={searchQuery}
            onChange={handleInputChange}
          />
       
      </>
    );
  }

  const isWeekend = (selectedDate) => {
    const day = new Date(selectedDate).getDay();
    return day === 0 || day === 6;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    if (isWeekend(selectedDate)) {
      // Prevent the user from selecting a weekend date
      setDate('');
    } else {
      setDate(selectedDate);
    }
  };

  function requestFormat() {
    return filteredData.map((elem, index) => {
      return(
        <div key={index}>
          <div className="flex flex-row bg-[#17394C] w-[70rem] h-[3rem] space-x-[2rem] justify-between rounded-xl">
            <div className="self-center text-white ml-[1rem] text-[1.3rem]">
              {elem.Email}
            </div>
            <div className="self-center flex flex-row space-x-[1.5rem] pr-[1.5rem] text-[1rem]">
              <button className="  bg-[#F9D62B] w-[5rem] rounded-xl py-[0.2rem]">View</button>
              <button onClick={() => sendToArchive(index)} className="  bg-[#F9D62B] w-[5rem] rounded-xl py-[0.2rem]">Approve</button>
              <button className="  bg-[#F9D62B] w-[5rem] rounded-xl py-[0.2rem]">Delete</button>
            </div>
          </div>
        </div>
      )}
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between ml-[3rem] mr-[3rem] mt-[2rem] text-white whitespace-nowrap">
        <div className='text-[2.5rem]'>REQUEST</div>   
         {searchBar()}
      </div>
      <div className="self-center flex flex-col h-full justify-center items-center text-black text-[1rem] w-[76rem] rounded-[2rem] bg-[#134083] p-[2rem] space-x-[1rem]">
          <div className="w-[70rem] h-[20rem] overflow-y-auto">
            {requestFormat()}
          </div>
          <div className="flex flex-col w-full h-[30rem] p-[1.5rem] bg-white rounded-xl border-[#F9D62B] border-[0.5rem] space-y-[1rem]">
            <div className="flex flex-row justify-between">
              <div>Username</div>
              {/* Calendar */}
              <input
                type="date"
                className="w-[15rem] border-[0.2rem] border-[#F9D62B] rounded-xl"
                value={date} // Make sure value is always defined
                onChange={handleDateChange}
                disabled={isWeekend(date)} // Disable the input on weekends
              />
            </div>
            <div className="flex flex-row">
              <div className="text-center border-[0.2rem] border-[#F9D62B] h-[20rem] w-full text-[1.5rem] mr-[1.5rem]">
                Item description
              </div>
              <input placeholder="" className="border-[0.2rem] border-[#F9D62B] h-[20rem] w-full text-[1.5rem]"/>
               
            </div>
            <button className="bg-[#F9D62B] self-center w-[20rem] h-[3rem] text-[1.5rem] rounded-full"
            >
              SEND
            </button>
          </div>
      
      </div>
    </>
  );
};

export default RequestList;
