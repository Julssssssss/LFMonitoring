import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./components/ProfilePic";
import { getUserAndItem } from "./components/getUserAndItemData";


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const getData = async () => {
    const temp = await getUserAndItem();
    console.log(temp)
    setData([temp]);
    setLoading(false);
    setFilteredData(temp.items);
  };
  
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const sort = (val)=>{
    if (val.length > 0) {
      const filtered = data[0].items.filter((el) => {
        return el.nameItem.toLowerCase().includes(val.toLowerCase());
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data[0].items);
    }
    console.log(val)
  }


  const handleInputChange = (e) => {
    sort(e.target.value)
    setSearchQuery(e.target.value);
  };

  function searchBar() {
    return (
      <>
        <div className="flex flex-row justify-center mt-[1rem] mb-[1rem] md:justify-start md:ml-[1.5rem] md:mb-[1rem]">
          <div className="w-[2rem] h-[2.1rem] p-2 bg-[#17394C] rounded-l-lg border-b-2 2xl:h-[3rem] 2xl:w-[3rem]">
            <svg className="2xl:w-[2rem] 2xl:h-[2rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <input
            type="text"
            className="bg-[#17394C] border-b-2 mb-[1rem]  text-white p-[1rem] w-[16rem] h-8 rounded-r-lg sm:w-[19rem] xl:w-[22rem] 2xl:w-[30rem] 2xl:h-[3rem] 2xl:text-[1.5rem]"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
      </>
    );
  }

  function sample() {
    return filteredData.map((el, index) => {
      return (
        <div key={index} className="flex flex-row mb-[3rem] rounded-lg justify-center items-center">
          
          <Link to={{ pathname: `/Item/${el._id}` }} state={{ el }}>
            <div className="flex items-center rounded-l-[10rem] rounded-r-[4rem] bg-[#003985] border-b-[0.1rem] border-white hover:bg-sky-700 active:bg-[#0d1832] w-[17rem] h-[6rem] sm:w-[20rem] sm:h-[6.5rem] lg:w-[18rem] lg:h-[6rem] xl:w-[25rem] xl:h-[8rem] xl:mt-[2rem] xl:mb-[2rem] 2xl:h-[9rem] 2xl:w-[26rem]">
              <div className="p-2 rounded-full bg-yellow-400">
                <img src={el.url[0]} alt={el.nameItem} className="rounded-full object-contain w-[7rem] h-[7rem] sm:w-[7.5rem] sm:h-[7.5rem] lg:w-[7rem] lg:h-[7rem] xl:h-[12.5rem] xl:w-[12.5rem]" />
              </div>
              <div className="whitespace-nowrap flex items-center font-bold text-white text-[0.7rem] ml-[0.4rem] h-full p-[0.5rem] sm:ml-[0.5rem] md:text-[0.9rem] md:ml-[0.4rem] xl:text-[1.1rem] 2xl:text-[1.3rem]">{el.nameItem}</div>
              
            </div>
          </Link>


        </div>
      );
    });
  }

  return (
    <>
    <div className="relative flex justify-center bg-[#0d1832] w-screen p-[1.5rem] min-h-screen font-poppins overflow-x-hidden 2xl:p-[2rem]">
      <div className=" bg-[#002855] rounded-[1rem] w-full">
        <div className="flex flex-row space-x-[2.8rem] pt-[1rem] px-[1rem] xl:space-x-[4rem]">
          <ProfilePic User={data} />
          <div className="flex p-[0.5rem] whitespace-nowrap w-full xl:p-[1.2rem] 2xl:p-[1.7rem]">
            <div className="text-white text-lg xl:text-[2rem] 2xl:text-[2.5rem]"> Hi, {data[0].user.Name}</div>
          </div>
        </div>

        {searchBar()}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] xl:grid-cols-[20rem]xl xl:mx-[1.5rem] 2xl:grid-cols-4">
          <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709031100/Assets/Group_4_d8iknv.png" alt="shape1" className="h-[10rem] w-[10.5rem] absolute z-10 -top-[3rem] -right-[1rem] opacity-50 md:h-[12rem] md:w-[12.5rem] lg:h-[13rem] lg:w-[13.5rem] xl:h-[24rem] xl:w-[25rem] xl:-top-[7rem] xl:right-[10rem] 2xl:w-[28rem] 2xl:h-[27rem]" />
          <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709031100/Assets/Group_3_umxc26.png" alt="shape2" className="h-[10rem] w-[10rem] absolute z-10 -top-[1.5rem] -left-[5rem] opacity-50 xsm:h-[11rem] xsm:w-[10rem] xsm:-top-[1.7rem] md:h-[12.8rem] md:w-[11rem] md:-left-[6.2rem] md:-top-[2.1rem] xl:h-[16rem] xl:w-[13rem] xl:-left-[7rem] 2xl:w-[15rem] 2xl:h-[20rem] 2xl:-top-[3rem] 2xl:-left-[8rem]"/>
          <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709126701/Assets/Group_21_tplope.png" alt="shape3" className="h-[5rem] w-[5rem] absolute z-10 bottom-0 right-[0rem] opacity-50 xsm:h-[7rem] xsm:w-[10rem] md:h-[9rem] md:w-[12.5rem] 2xl:w-[20rem] 2xl:h-[14rem]" />
            {sample()}
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;