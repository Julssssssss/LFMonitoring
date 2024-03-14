import { useState, useEffect } from "react";
import { axiosGetReqList} from "../../../../../components/api/axios";
import ItemsCarousel from "../../../MainComponents/ItemsCarousel";
import { getData } from "../../../MainComponents/getData";
import DeleteReq from "./DeleteReq";

import SendButton from "./SendButton";
import Approve from "./Approve";

const RequestList = () => {

  const [list, setList] = useState([])

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [items, setItems] = useState('')
  const [desc, setDesc] = useState('')
  const [name, setName] = useState('')
  const [found, setFound] = useState('');
  const [image, setImage] = useState([])
  const [datePosted, setDatePosted] = useState('')
  const [postedby, setPostedBy] = useState('')
  const [surrenderedBy, setSurrenderedBy] = useState('')
  const [requestBy, setRequestBy] = useState('')
  const [emailContent, setEmailContent] = useState('');
  const [subject, setSubject] = useState('');
  const [index, setIndex] = useState('');


  const getReqList = async() => {
    try{
      const res = await axiosGetReqList.post()
      console.log(res)
      const temp = await getData();
      setItems(temp.items); 
      setList(res.data.reqList)
    }
    catch(err){
      console.log(err)
      return null
    }
  }
 

  useEffect(()=>{
    getReqList()
  }, [])

  const viewItem = async (elem, items) => {
    try {
      
      // Find the item with the matching itemId
      const selectedItem = items.find(item => item._id === elem.itemId);
    
      setName(selectedItem.nameItem);
      setDesc(selectedItem.desc);
      setFound(selectedItem.found);
      setImage(selectedItem.url);
      setRequestBy(elem.Email);
      setDatePosted(selectedItem.datePosted);
      setPostedBy(selectedItem.postedBy);
      setSurrenderedBy(selectedItem.surrenderedBy);
      setIndex(elem._id)
      console.log('henlo', index)
    } catch (error) {
      console.error("Error getting items", error);
    }
  };
  
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
  
  function requestFormat() {
    return list.map((elem, index) => {
      return(
        <div key={index}>
          <div className="flex flex-col border-b-2 border-white bg-[#17394C] md:w-[17.5rem] md:h-[4rem] lg:w-[27rem] xl:w-[31rem] 2xl:w-[37rem] 2xl:p-[0.1rem] h-[4rem] space-x-[2rem] rounded-xl p-1 3xl:w-[45rem] 3xl:h-[6rem] 3xl:p-[0.2rem]">
            <div className="flex flex-row justify-between items-center text-white ml-[0.5rem] text-[1.3rem] md:text-[0.9rem] 2xl:text-[1.2rem] 3xl:text-[2rem]">
              {elem.Email}
              <div className={`${elem.haveBeenEmailed ? "bg-green-700" : "bg-red-700"} group h-[1rem] w-[1rem] rounded-full mr-[1rem]`}
              >
                <span className="absolute left-[31rem] scale-0 bg-gray-800 p-2 text-[2rem] text-white group-hover:scale-50"
                >
                  {elem.haveBeenEmailed ? "user Emailed" : "user haven't Emailed"}
                </span>
              </div>
            </div>
            <div className="items-center justify-center flex flex-row space-x-[1.5rem] md:space-x-[1rem] pr-[1.5rem]">
              <button onClick={() => viewItem(elem, items)} className="bg-[#F9D62B] font-poppins hover:bg-[#134083] hover:text-white w-[5rem] py-[0.2rem] md:w-[4rem] md:text-[0.7rem] md:py-[0.1rem] md:mt-[0.4rem] 2xl:w-[5rem] rounded-full 3xl:text-[1.3rem] 3xl:w-[6rem]">View</button>
              <Approve RequestItem = {elem} index={index} list={list} Item = {items} onClick={viewItem} />
              <DeleteReq reqData={elem}/>
            </div>
          </div>
        </div>
      )}
    );
  }
    const enableDeleteButton = false
    const displayPic = () => {
      return <ItemsCarousel item={image} enableDeleteButton={enableDeleteButton}/>
  };

  return (
    <>
      <div className="flex flex-row justify-between md:mt-[2rem] xl:mt-[2rem] 2xl:mt-[3rem] text-white whitespace-nowrap">
        <div className='md:text-[2rem] xl:text-[2.5rem] 2xl:text-[3rem] font-poppins 3xl:text-[3rem]'>REQUEST</div>   
         {searchBar()}
      </div>

      <div className="bg-[#134083] p-[0.8rem] w-full h-full rounded-[2rem] flex flex-row md:space-x-[1rem] md:overflow-y-auto self-center">
        <div className="flex flex-col py-[1rem] items-center overflow-y-auto w-full h-full space-y-[1rem]">
          {requestFormat()}
        </div>
        <div className="flex flex-col h-auto w-auto p-[1rem] bg-white rounded-xl border-[#F9D62B] border-[0.5rem] space-y-[0.5rem]">
          <div className="flex flex-row">
            <div className="flex w-auto h-[2rem] items-center font-semibold font-poppins 3xl:text-[1.5rem]"> Requested by: {requestBy}</div>
          </div>
            
          <div className="flex flex-col space-y-[1rem] h-auto whitespace-normal break-words overflow-y-auto">
            <div className="flex flex-row justify-between font-poppins text-[1rem] xl:text-[1.2rem] 3xl:text-[1.6rem]">
              <div className="flex flex-col h-full md:w-[15rem] lg:w-[18rem] xl:w-[25rem] 3xl:w-[32rem] p-[0.5rem]">
                <div className="flex flex-col items-start space-y-[0.7rem] leading-[0.9]">
                  <div className="flex items-center space-x-[2.5rem] md:space-x-[0.5rem]">
                    <div className="w-24 md:w-[5.5rem] xl:w-[6rem] 2xl:w-[8.5rem] 3xl:w-[10rem]">Name of item:</div>
                    <div>{name}</div>
                  </div>
                  <div className="flex items-center space-x-[2.5rem] md:space-x-[0.5rem]">
                    <div className="w-24 md:w-[5.5rem] xl:w-[6rem] 2xl:w-[8.5rem] 3xl:w-[10rem]">Description:</div>
                    <div>{desc}</div>
                  </div>
                  <div className="flex items-center space-x-[2.5rem] md:space-x-[0.5rem]">
                    <div className="w-24 md:w-[5.5rem] xl:w-[6rem] 2xl:w-[8.5rem] 3xl:w-[10rem]">Found at:</div>
                    <div>{found}</div>
                  </div>
                  <div className="flex items-center space-x-[2.5rem] md:space-x-[0.5rem]">
                    <div className="w-24 md:w-[5.5rem] xl:w-[6rem] 2xl:w-[8.5rem] 3xl:w-[10rem]">Surrendered by:</div>
                    <div>{surrenderedBy}</div>
                  </div>
                  <div className="flex items-center space-x-[2.5rem] md:space-x-[0.5rem]">
                    <div className="w-24 md:w-[5.5rem] xl:w-[6rem] 2xl:w-[8.5rem] 3xl:w-[10rem]">Posted by:</div>
                    <div>{postedby}</div>
                  </div>
                  <div className="flex items-center space-x-[2.5rem] md:space-x-[0.5rem]">
                    <div className="w-24 md:w-[7rem] xl:w-[6rem] 2xl:w-[8.5rem] 3xl:w-[10rem]">Date posted:</div>
                    <div>{datePosted}</div>
                  </div>
                </div>
            </div>
            <div className="md:h-[12rem] md:w-[12rem] xl:h-[15rem] xl:w-[15rem] 2xl:h-[15.5rem] 3xl:w-[19rem] 3xl:h-[19rem] 2xl:w-[15.5rem] py-2 border-[0.3rem] border-[#F9D62B] rounded-xl flex flex-col">
              {displayPic()}
            </div>
          </div>
              <input 
              type="text"
              id="subject"  
              placeholder="Subject" 
              className="border-[0.2rem] border-[#F9D62B] h-[2.5rem] w-full text-[1.5rem] p-[1rem] md:p-[0.8rem] md:text-[1rem] md:h-[1rem] 2xl:text-[1.2rem] 2xl:h-[2.5rem] 3xl:text-[1.4rem] 3xl:h-[2.8rem]"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            /> 
              <textarea 
              id="letter" 
              rows={10}
              placeholder="" 
              className="border-[0.2rem] border-[#F9D62B] h-full w-full text-[1.5rem] p-[1rem] md:p-[0.5rem] md:text-[1rem] 2xl:text-[1.2rem] 3xl:text-[1.4rem]"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            /> 
          </div>
            <div className="flex justify-center">
              <SendButton subject={subject} emailContent={emailContent} requestBy={requestBy} index= {index}/>
            </div>
        </div>
      </div>
    </>
  );
};

export default RequestList;
