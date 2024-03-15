import AddItem from "../../../MainComponents/AddItem";
import EditButton from "./EditButton";
import Archive from "./Archive";
import DeleteButton from "./DeleteButton";
import { useState, useEffect } from "react";
import { getData } from "../../../MainComponents/getData";
import Loading from "../../../../404/Loading";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)

  //for searchBar
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (deletedId) => {
    setFilteredData(filteredData.filter(item => item._id !== deletedId));
  };

  const getItems = async () => {
    try {
      await getData(currentPage)
      .then((temp) => {
        setItems(temp.items); 
        setLoading(false);
      })
    } catch (error) {
      console.error("Error getting items", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, [currentPage]);

  if (loading) {
    return <div><Loading /></div>;
  }

  const pagination =()=>{
    const disable = `btn-disabled`
    return(
      <div className="flex flex-row justify-center ">
        <div className="join">
          <button className={`join-item btn btn-lg ${currentPage === 1 ? `btn-disabled` : ''}`} 
            onClick={()=>{
                setCurrentPage(currentPage - 1)
              }}>
              «
          </button>
          <button className="join-item btn btn-lg">{currentPage}</button>
          <button 
            className={`join-item btn btn-lg ${items.length < 6 ? 'btn-disabled' : ''}`}
            onClick={()=>{
                setCurrentPage(currentPage + 1)
              }}>
              »
          </button>
        </div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  function searchBar() {
    return (
      <>
          <input
            type="text"
            placeholder="Search"
            className=" mb-4 mt-[1rem] bg-[#17394C] p-[0.4rem] text-white rounded-full"
            value={searchQuery}
            onChange={handleInputChange}
          />
       
      </>
    );
  }

  function itemsFormat() {
    return items.map((item, index) => {
      return(
        <div key={index}>
          <div className="flex flex-col items-center p-1 border-b-2 border-white bg-[#17394C] w-full h-auto space-x-[0.5rem] rounded-xl">
            <div className="flex flex-row justify-between w-full text-white text-[0.8rem] font-poppins whitespace-nowrap">
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
  
  
  return (
    <>
      <div className="flex flex-col justify-between mt-[0.5rem] text-white whitespace-nowrap px-[1rem]">
        <div className='font-poppins ml-[2rem]'>LOST ITEMS</div>   
         {searchBar()}
      </div>
      <div className="bg-[#134083] overflow-y-auto w-full h-full rounded-[2rem] flex flex-col space-y-[1rem] self-center p-[0.8rem]">
        <div className="flex flex-row font-poppins font-bold text-white justify-between px-[0.8rem] text-[0.7rem]">
          <p>Name of item</p>
          <p>Date</p>
         </div>
        <div className="flex flex-row-reverse w-full">
          <AddItem  />
        </div>
        {itemsFormat()}
        {pagination()}
      </div>
    </>
  );
};

export default ItemList;
