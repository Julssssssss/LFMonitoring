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
        <div className="flex flex-row justify-center mt-[1rem] sm:w-[25rem] md:w-[23rem] lg:w-[22rem] 2xl:w-[26.5rem]">
          <div className="w-[2rem] h-[2rem] p-2 bg-[#17394C] rounded-l-lg">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            className="bg-[#17394C] text-white p-[1rem] w-[16rem] h-8 rounded-r-lg 2xl:w-[20rem]"
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
        <div key={index} className="flex flex-row m-[1rem] mb-[2.5rem] rounded-lg z-0 justify-end h-[6rem] items-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <Link to={{ pathname: `/Item/${el._id}` }} state={{ el }}>
            <div className="m-2 rounded-lg bg-[#003985] hover:bg-sky-700 active:bg-[#0d1832] overflow-hidden w-[16rem] h-[5rem] md:w-[20rem] lg:w-[18.5rem] xl:w-[20rem] 2xl:w-[21.5rem]">
              <div className="whitespace-nowrap flex items-center font-bold text-white text-[0.7rem] ml-[7rem] h-full p-4 sm:ml-[4rem] md:ml-[7rem]">{el.nameItem}</div>
            </div>
          </Link>

          <div className="p-2 rounded-full bg-yellow-400 overflow-hidden absolute left-[3rem] ">
            <img src={el.url[0]} alt={el.nameItem} className="rounded-full object-contain w-28 h-28" />
          </div>
        </div>
      );
    });
  }

  return (
    <div className="bg-[#0d1832] p-[1rem] min-h-screen font-poppins">
      <div className="bg-[#002855] rounded-[1rem]">
        <div className="flex pt-[1rem] px-[1rem]">
          <ProfilePic User={data} />
          <div className="flex p-[0.5rem] whitespace-nowrap w-full">
            <div className="text-white text-lg ml-[3rem] md:text-[1.5rem] lg:text-[1.7rem]"> Hi, {data[0].user.Name}</div>
          </div>
        </div>

        {searchBar()}
        <div className={`flex flex-col p-[1rem] min-h-screen`}>
          <img
            className="w-[9rem] h-[10rem] fixed -left-[4.5rem] -top-[1.5rem]"
            src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709031100/Assets/Group_3_umxc26.png"
            alt="rectangle"
          />
          <img
            className="w-[9rem] h-[9rem] fixed -right-[1.5rem] -bottom-[3.5rem]"
            src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709030999/Assets/1_rqlvoq.png"
            alt="rectangle"
          />
          <img
            className="w-[7.5rem] h-[7.5rem] fixed -right-[1rem] -top-[2.25rem]"
            src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709031100/Assets/Group_4_d8iknv.png"
            alt="rectangle"
          />
          {sample()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;