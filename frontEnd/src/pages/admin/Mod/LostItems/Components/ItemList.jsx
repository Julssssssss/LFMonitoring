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

  //for searchBar
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (deletedId) => {
    setFilteredData(filteredData.filter(item => item._id !== deletedId));
  };

  const getItems = async () => {
    try {
      await getData()
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
  }, []);

  if (loading) {
    return <div><Loading /></div>;
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  function searchBar() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          className="mt-[1.5rem] ml-[1.5rem] mr-[1rem] mb-4 bg-[#17394C] p-[1rem] text-white md:mt-[0rem] md:h-[2.5rem] md:w-[20rem] xl:h-[3rem] xl:w-[30rem] rounded-full xl:text-[1.4rem] 3xl:h-[3.5rem] 3xl:w-[35rem] 3xl:text-[1.7rem]"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="h-[2rem] w-[3rem] mr-2">{`Search`}</button>
      </div>
    );
  }

  function itemsFormat() {
    return items.map((item, index) => {
      return(
        <div key={index}>
          <div className="flex flex-row items-center p-1 border-b-2 border-white bg-[#17394C] w-full h-auto space-x-[2rem] rounded-xl">
            <div className="text-white font-poppins whitespace-nowrap md:ml-[1rem] xl:ml-[1rem] xl:text-[1.5rem] 3xl:text-[2rem]">
              <div>{item.nameItem}</div>
            </div>
            <div className="flex flex-row-reverse bg-[#17394C] w-full items-center">
              <div className="text-white mr-[2rem] flex flex-row space-x-[2rem] md:space-x-[1rem] md:mr-[1rem]">
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
      <div className="flex flex-row justify-between md:mt-[2rem] xl:mt-[2rem] 2xl:mt-[3rem] text-white whitespace-nowrap">
        <div className='md:text-[2rem] xl:text-[2.5rem] 2xl:text-[3rem] font-poppins'>LOST ITEMS</div>   
        {searchBar()}
      </div>
      <div className="bg-[#134083] w-full h-full rounded-[2rem] flex flex-col space-y-[1.5rem] self-center md:p-[2rem] lg:p-[1.5rem] xl:p-[1rem] 2xl:p-[1.5rem]">
        <div className="flex flex-row-reverse md:mt-[0.5rem] mt-[1.5rem] xl:h-[4rem]">
          <AddItem  />
        </div>
        {itemsFormat()}
      </div>
    </>
  );
};

export default ItemList;
