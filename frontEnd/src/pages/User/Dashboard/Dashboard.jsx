import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./components/ProfilePic";
import { getUserAndItem } from "./components/getUserAndItemData";
import { axiosFetchItems } from "../../../components/api/axios"; 
import Loading from "../../404/Loading";

//need ayusin search
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [userUsedSearch, setUserUsedSearch] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(null)

  const getData = async () => {
    await getUserAndItem(currentPage)
    .then((result)=>{
      setData([result])
      setHasNextPage(result.hasNextPage)
      
      setLoading(false);
      //console.log(data)
    })
  };
  //console.log(hasNextPage)
  //NOTE PROBLEM MO IS IF NAG SEARCH BY DATE YUNG DATA PAG PININDOT YUNG NEXT PAGE IS PAGE NA NI GETDATA 
  useEffect(() => {
    setLoading(true)
    if(userUsedSearch){
      if(searchQuery){
        searchData()
      }
      else if(startDate && endDate){
        searchByDate()
      }
      else{
        window.location.reload()
      }
    }
    else{
      getData()
    }
  }, [currentPage]);

  if (loading) {
    return <div><Loading/></div>;
  }
  //console.log(userUsedSearch)
  const searchData = async()=>{
    if(searchQuery){
      await axiosFetchItems.post('', {
        'searchQuery': searchQuery.trim(),
        'currentPage' : currentPage
      })
      .then(res=>{
        console.log(res.data)
        setData([res.data])
        setHasNextPage(res.hasNextPage)
        setLoading(false);
      })
    }
  }

  const searchByDate = async()=>{
    if(startDate && endDate){
      await axiosFetchItems.post('', {
          'startDate':startDate,
          'endDate':endDate,
          'currentPage': currentPage
      })
      .then(res=>{
        setData([res.data])
        setHasNextPage(res.hasNextPage)
        setLoading(false);
      })
    }
  }

  const useSearch = ()=>{
    if(searchQuery){
      setUserUsedSearch(true)
      setCurrentPage(1)
      searchData()
    }
    else if(startDate && endDate){
      setUserUsedSearch(true)
      setCurrentPage(1)
      searchByDate()
    }
  }

  const pagination =()=>{
    const disable = `btn-disabled`
    return(
      <div className="flex flex-row justify-center">
        <div className="join border-[0.1rem] border-[#F9D62B] mt-[0.5rem] lg:text-md">
          <button className={`join-item btn btn-sm bg-[#17394C] ${currentPage === 1 ? `btn-disabled` : ''}`}
            onClick={()=>{
                setCurrentPage(currentPage - 1)
              }}>
              «
          </button>
          <button className="join-item btn btn-sm bg-[#0D1832]">{currentPage}</button>
          <button 
            className={`join-item btn btn-sm bg-[#17394C] ${hasNextPage ? '' : 'btn-disabled'}`}
            onClick={()=>{
                setCurrentPage(currentPage + 1)
              }}>
              »
          </button>
        </div>
      </div>
    )
  }

  function searchBar() {
    return (
      <div className="flex flex-col text-white lg:flex-row items-center space-y-[0.8rem] font-poppins mb-[0.5rem] lg:space-y-[0rem] lg:space-x-[1rem] xl:space-x-[2rem] mb-[2rem]">
        <div className="flex p-[1rem] lg:p-0 flex-row items-center justify-center lg:space-x-[0rem] lg:gap-[0.5rem] space-x-[0.5rem]">
          <input
            type="text"
            placeholder="Search"
            className="w-[12rem] pl-[1rem] xsm:w-[16rem] sm:w-[19rem] md:w-[25rem] md:h-[2.2rem] lg:h-[2.3rem] bg-[#17394C] md:text-[1.1rem] lg:w-[15rem] xl:w-[20rem] xl:text-[1.5rem] 2xl:text-[2rem] 2xl:w-[25rem] 2xl:h-[3.5rem] xl:p-[1.2rem] text-[0.9rem] p-[0.3rem] text-white rounded-full"
            value={searchQuery}
            onChange={(e)=>{setSearchQuery(e.target.value), setStartDate(''), setEndDate('')}}
          />
          <button className="bg-[#F9D62B] font-bold hover:bg-[#134083] hover:text-white text-black rounded-full text-[0.8rem] sm:text-[0.9rem] sm:h-[1.6rem] md:text-[1rem] md:h-[2rem] md:w-[5.5rem] xl:text-[1.5rem] xl:h-auto xl:w-[7rem] xl:p-[0.3rem] 2xl:text-[2rem] 2xl:w-[9rem] h-[1.5rem] w-[4.5rem]"
            onClick={()=>{useSearch()}}
          >
            Search
          </button>
        </div>

        <div className="flex flex-row lg:flex-col gap-[0.5rem] text-[0.9rem] md:text-[1.1rem] lg:text-[1rem] xl:text-[1.5rem] 2xl:text-[1.8rem]">
          <b>StartDate : </b>
          <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
              type="date"
              id="startDate"
              min="2024-01-01"
              max={new Date().toISOString().split('T')[0]}
              value={startDate}
              onChange={(e)=>{setStartDate(e.target.value), setSearchQuery('')}}
          />
        </div>

        <div className="flex flex-row lg:flex-col gap-[0.5rem] text-[0.9rem] md:text-[1.1rem] md:gap-[0.9rem] lg:gap-[0.4rem] lg:text-[1rem] xl:text-[1.5rem] 2xl:text-[1.8rem]">
          <b>EndDate : </b>
          <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
              type="date"
              id="endDate"
              min="2024-01-01"
              max={new Date().toISOString().split('T')[0]}
              value={endDate}
              onChange={(e)=>{setEndDate(e.target.value), setSearchQuery("")}}
          />
        </div>

        <button className="h-[1.5rem] w-[7rem] font-bold sm:h-[2rem] sm:w-[8rem] md:h-[2.2rem] md:w-[9rem] md:text-[1rem] lg:h-[2rem] xl:text-[1.5rem] xl:w-[13rem] xl:h-[3rem] bg-[#F9D62B] 2xl:text-[2rem] 2xl:h-[4rem] 2xl:w-[18rem] text-black text-[0.7rem] sm:text-[0.9rem] rounded-full hover:bg-[#134083] hover:text-white"
            onClick={()=>{useSearch()}}
        >
            Search by Date
        </button>
      </div>
    );
  } 

  function sample() {
    return data[0].items.map((el, index) => {
      return (
        <div key={index} className="flex flex-row mb-[2rem] rounded-lg justify-center items-center">
          
          <Link to={{ pathname: `/Item/${el._id}` }} state={{ el }}>
            <div className="flex items-center rounded-l-[10rem] rounded-r-[4rem] bg-[#003985] border-b-[0.1rem] border-white hover:bg-sky-700 active:bg-[#0d1832] w-[17rem] h-[6rem] xsm:w-[20rem] xsm:h-[6.5rem] md:w-[18rem] md:h-[6rem] lg:w-[18rem] lg:h-[7rem] xl:w-[25rem] xl:h-[8rem] xl:mt-[2rem] xl:mb-[2rem] 2xl:h-[10rem] 2xl:w-[29rem]">
              <div className="p-2 rounded-full bg-yellow-400">
                <img src={el.url[0]} alt={el.nameItem} className="rounded-full object-contain w-[7rem] h-[7rem] xsm:w-[7.5rem] xsm:h-[7.5rem] md:w-[7rem] md:h-[7rem] lg:w-[8rem] lg:h-[8.5rem] xl:h-[12.5rem] xl:w-[12.5rem] 2xl:h-[14rem] 2xl:w-[14rem]"/>
              </div>
              <div className="w-auto">
                <div className="whitespace-normal flex items-center justify-center font-bold text-white text-[0.7rem] ml-[0.4rem] h-full p-[0.5rem] xsm:ml-[0.5rem] sm:text-[0.9rem] sm:ml-[0.4rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.5rem]">{el.nameItem}</div>
              </div>
            </div>
          </Link>


        </div>
      );
    });
  }
  const Fname = data[0].user.Name.split(' ')[0];

  return (
    <>
    <div className="relative z-0 flex flex-col space-y-[1rem] bg-[#0d1832] w-auto p-[1rem] pb-[0.8rem] min-h-screen font-poppins overflow-x-hidden lg:space-y-[1rem]">
      <div className="z-50 bg-[#002855] lg:px-[2rem] lg:space-y-[2rem] bg-opacity-50 rounded-[1rem] md:h-auto w-full flex flex-col">
        <div className="flex flex-row space-x-[2.8rem] lg:space-x-[4.5rem] pt-[1rem] px-[1rem] lg:space-x-[3rem] lg:px-0 lg:pt-[1.5rem] xl:space-x-[4rem]">
          <ProfilePic User={data} />
          <div className="flex p-[0.5rem] whitespace-nowrap w-full xl:p-[1.2rem]">
            <div className="text-white text-lg lg:text-[1.5rem] xl:text-[2rem]"> Hi, {Fname}</div>
          </div>
        </div>

        {searchBar()}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem] lg:grid-cols-3 lg:gap-[3rem] xl:grid-cols-3 xl:grid-cols-[20rem]xl xl:mx-[1.5rem]">
            {sample()}
        </div>

        {pagination()}

      </div>
      <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709030999/Assets/1_rqlvoq.png" alt="shape3" className="h-[11rem] w-[14rem] absolute z-10 -bottom-[0rem] -right-[3rem] xsm:h-[10rem] xsm:w-[12rem] sm:h-[9rem] sm:w-[12.5rem] lg:w-[17rem] lg:h-[15rem] 3xl:w-[25rem] 3xl:h-[20rem]" />
      <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709031100/Assets/Group_4_d8iknv.png" alt="shape1" className="h-[10rem] w-[10.5rem] absolute z-10 -top-[3rem] -right-[1rem] opacity-50 sm:h-[12rem] sm:w-[12.5rem] md:h-[13rem] md:w-[13.5rem] lg:w-[17rem] lg:h-[17rem] lg:right-[5rem] lg:-top-[5.5rem] xl:h-[24rem] xl:w-[25rem] xl:-top-[7rem] xl:right-[10rem] 3xl:w-[28rem] 3xl:h-[27rem]" />
      <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709031100/Assets/Group_3_umxc26.png" alt="shape2" className="h-[10rem] w-[10rem] absolute z-10 -top-[1.5rem] -left-[5rem] opacity-50 xsm:h-[11rem] xsm:w-[10rem] xsm:-top-[1.7rem] sm:h-[12.8rem] sm:w-[11rem] sm:-left-[6.2rem] sm:-top-[2.1rem] xl:h-[16rem] xl:w-[13rem] xl:-left-[7rem] 3xl:w-[15rem] 3xl:h-[20rem] 3xl:-top-[3rem] 3xl:-left-[8rem]"/>
      
      <div className="flex flex-col items-center justify-center z-30 w-full h-[4rem] lg:h-[5rem] lg:space-y-[0.4rem] rounded-xl bg-[#134083] bg-opacity-75 self-center ">
        <div className="flex flex-row space-x-[0.2rem] lg:space-x-[0.4rem]">
          <a href="https://forms.gle/aMBmxaiFjtGpM5WX9" target="_blank" className="text-white font-poppins text-[0.8rem] lg:text-[1rem] underline decoration-solid hover:text-[#F9D62B]">Share your feedback with us<b>!</b></a>
          <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709966651/Assets/SVGRepo_iconCarrier_sepk7o.png" alt="rtu logo" className="h-[1.3rem] w-[1.7rem] ml-[1rem] mr-[0.5rem] 2xl:h-[1.8rem] 2xl:w-[2.1rem] 3xl:h-[2rem] 3xl:w-[2.5rem]"/>
        </div>
        <div className="flex flex-row space-x-[0.1rem] items-center text-white text-[0.8rem] lg:text-[1rem] xl:text-[1.3rem] ">
          <p>© 2023 | Rizal Technological University</p>
          <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709912489/Assets/rtu_logo_5_yz5e6k.png" alt="rtu logo" className="h-[1.1rem] w-[1.1rem] xsm:h-[1.3rem] xsm:w-[1.3rem] lg:w-[2rem] lg:h-[2rem]" />
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Dashboard;