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
        <div className="flex flex-row justify-center mt-[1rem]">
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
            className="bg-[#17394C] text-white p-[1rem] w-[16rem] h-8 rounded-r-lg"
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
        <div key={index} className="flex flex-row m-[1rem] mb-[2.5rem] rounded-lg z-0 justify-end h-[6rem] items-center ">
          <Link to={{ pathname: `/Item/${el._id}` }} state={{ el }}>
            <div className="m-2 rounded-lg bg-[#003985] hover:bg-sky-700 active:bg-[#0d1832] overflow-hidden w-[16rem] h-[5rem]">
              <div className="whitespace-nowrap flex items-center font-bold text-white text-[0.7rem] ml-[7.4rem] h-full p-4">{el.nameItem}</div>
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
            <div className="text-white text-lg"> Hi, {data[0].user.Name}</div>
          </div>
        </div>

        {searchBar()}
        <div className={`flex flex-col p-[1rem] min-h-screen`}>
          <img
            className="w-[5rem] h-[5rem] fixed right-[0.5rem] top-[8rem]"
            src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1702908163/Assets/Untitled_design_4_3_c6zova.png"
            alt="rectangle"
          />
          <img
            className="w-[5rem] h-[5rem] fixed left-[0.6rem] bottom-[2rem]"
            src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1702908164/Assets/Untitled_design_8_2_r00uua.png"
            alt="rectangle"
          />
          <img
            className="w-[5rem] h-[5rem] fixed left-[10rem] top-[19rem]"
            src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1702908163/Assets/Untitled_design_9_2_vm1wx2.png"
            alt="rectangle"
          />
          {sample()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;