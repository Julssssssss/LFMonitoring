import AddItem from "../../../MainComponents/AddItem";
import EditButton from "./EditButton";
import Archive from "./Archive";
import DeleteButton from "./DeleteButton";
import { useState, useEffect } from "react";
import { getData } from "../../../MainComponents/getData";
import Loading from "../../../../404/Loading";
import { axiosFetchAdminData } from "../../../../../components/api/axios";

const ItemList = () => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [hasNextPage, setHasNextPage] = useState(null)

  //for searchBar
  const [searchQuery, setSearchQuery] = useState("");
  const [userUsedSearch, setUserUsedSearch] = useState(false)
  const [filteredData, setFilteredData] = useState([]);

  const handleDelete = (deletedId) => {
    setFilteredData(filteredData.filter(item => item._id !== deletedId));
  };
  //console.log(hasNextPage)
  const getItems = async () => {
    try {
      await getData(currentPage)
      .then((temp) => {
        const {items} = temp.data;
        setItem(items); 
        setHasNextPage(temp.data.hasNextPage)
    
        setLoading(false); 
      })
    } catch (error) {
      console.error("Error getting items", error);
      setLoading(true);
    }
  };

  const searchData = async()=>{
    if(searchQuery){
      await axiosFetchAdminData.post('', {
        'searchQuery': searchQuery.trim(),
        'currentPage' : currentPage
      })
      .then(res=>{
        //console.log(res.data)
        const {items} = res.data
        setItem(items)
        setHasNextPage(res.data.hasNextPage)
        setLoading(false);
      })
    }
  }

  const searchByDate = async()=>{
    if(startDate && endDate){
      await axiosFetchAdminData.post('', {
          'startDate':startDate,
          'endDate':endDate,
          'currentPage': currentPage
      })
      .then(res=>{
        const {items} = res.data
        setItem(items)
        setHasNextPage(res.data.hasNextPage)
        setLoading(false);
      })
    }
  }

  const useSearch = ()=>{
    if(searchQuery){
      setSearchQuery(searchQuery.trim())
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
      getItems()
    }
  }, [currentPage]);

  if (loading) {
    return <div><Loading /></div>;
  }

  const pagination =()=>{
    const disable = `btn-disabled`
    return(
      <div className="flex flex-row justify-center">
        <div className="join border-[0.1rem] border-[#F9D62B] mt-[1rem] lg:text-md">
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
      <div className="flex flex-col lg:flex-row items-center space-y-[0.8rem] font-poppins mb-[0.5rem] lg:space-y-[0rem] lg:space-x-[1rem] xl:space-x-[2rem]">
        <div className="flex p-[1rem] lg:p-0 flex-row items-center justify-center lg:space-x-[0rem] lg:gap-[0.5rem] space-x-[0.5rem]">
          <input
            type="text"
            placeholder="Search"
            className="w-[12rem] pl-[1rem] xsm:w-[16rem] sm:w-[19rem] md:w-[25rem] md:h-[2.2rem] bg-[#17394C] md:text-[1.1rem] lg:w-[15rem] xl:w-[20rem] xl:text-[1.5rem] xl:p-[1.2rem] text-[0.9rem] p-[0.3rem] text-white rounded-full"
            value={searchQuery}
            onChange={(e)=>{setSearchQuery(e.target.value), setStartDate(''), setEndDate('')}}
          />
          <button className="bg-[#F9D62B] font-bold hover:bg-[#134083] hover:text-white text-black rounded-full text-[0.8rem] sm:text-[0.9rem] sm:h-[1.6rem] md:text-[1rem] md:h-[2rem] md:w-[5.5rem] xl:text-[1.5rem] xl:h-auto xl:w-[7rem] xl:p-[0.3rem] h-[1.5rem] w-[4.5rem]"
            onClick={()=>{useSearch()}}
          >
            Search
          </button>
        </div>

        <div className="flex flex-row lg:flex-col gap-[0.5rem] text-[0.9rem] md:text-[1.3rem] lg:text-[1rem] xl:text-[1.5rem]">
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

        <div className="flex flex-row lg:flex-col gap-[0.5rem] text-[0.9rem] md:text-[1.3rem] lg:text-[1rem] xl:text-[1.5rem]">
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

        <button className="h-[1.5rem] w-[7rem] font-bold sm:h-[2rem] sm:w-[8rem] md:h-[2.5rem] md:w-[9rem] md:text-[1rem] lg:h-[2rem] xl:text-[1.5rem] xl:w-[13rem] xl:h-[3rem] bg-[#F9D62B] text-black text-[0.7rem] sm:text-[0.9rem] rounded-full hover:bg-[#134083] hover:text-white"
            onClick={()=>{useSearch()}}
        >
            Search by Date
        </button>
      </div>
    );
  } 

  function itemsFormat() {
    return item.map((item, index) => {
      return(
        <div key={index}>
          <div className="flex flex-col items-center border-b-2 border-white bg-[#17394C] w-full h-auto space-x-[0.5rem] p-[0.6rem] rounded-xl">
            <div className="flex flex-row justify-between w-full text-white text-[0.8rem] md:text-[1rem] lg:text-[1.2rem] xl:text-[1.5rem] font-poppins whitespace-nowrap">
              <div>{item.nameItem}</div>
              <div>{item.datePosted}</div>
            </div>
            <div className="flex flex-row justify-center bg-[#17394C] items-center">
              <div className="text-white flex flex-row space-x-[0.8rem]">
                <EditButton Info = {item}/>
                <Archive Info = {item} />
                <DeleteButton Info = {item} onDelete={handleDelete} />
              </div>
            </div>
          </div>
        </div>
      )
    });
  }
  
  //console.log('here', item)
  return (
    <>
        <div className="flex flex-col lg:mt-0 justify-between mt-[0.5rem] md:mt-[1rem] text-white whitespace-nowrap px-[1rem]">
          <div className='font-poppins ml-[2rem] md:ml-[5rem] md:text-[2rem] lg:ml-0 lg:mt-[1rem] xl:text-[3rem]'>FOUND ITEMS</div>   
          {searchBar()}
        </div>
        <div className="bg-[#134083] overflow-y-auto w-full h-full rounded-[1.5rem] flex flex-col self-center p-[0.8rem]">
          <div className="flex flex-row font-poppins font-bold text-white justify-between px-[0.8rem] text-[0.7rem] md:text-[1rem] xl:text-[1.5rem]">
            <p>Name of item</p>
            <p>Date</p>
          </div>
          <div className="flex flex-row-reverse w-full mb-[1rem] pr-[0.8rem]">
            <AddItem  />
          </div>
          <div className="flex flex-col p-[0.1rem] lg:px-[1rem] overflow-y-auto w-full h-full space-y-[1rem]">
            {itemsFormat()}
          </div>
          {pagination()}
        </div>
      
    </>
  );
};

export default ItemList;
