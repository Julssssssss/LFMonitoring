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
      const temp = await getData();
      setItems(temp.items); 
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
  function requestFormat() {
    return filteredData.map((elem, index) => {
      return(
        <div key={index}>
          <div className="flex flex-col border-b-2 border-white bg-[#17394C] w-full h-[4.5rem] space-x-[2rem] rounded-xl p-1">
            <div className="flex flex-row justify-between items-center text-white ml-[1rem] text-[1.3rem]">
              {elem.Email}
              <div className={`${elem.haveBeenEmailed ? "bg-green-700" : "bg-red-700"} group h-[1rem] w-[1rem] rounded-full mr-[1rem]`}
              >
                <span className="absolute left-[31rem] scale-0 bg-gray-800 p-2 text-[2rem] text-white group-hover:scale-50"
                >
                  {elem.haveBeenEmailed ? "user Emailed" : "user haven't Emailed"}
                </span>
              </div>
            </div>
            <div className="items-center justify-center flex flex-row space-x-[1.5rem] pr-[1.5rem] text-[1rem]">
              <button onClick={() => viewItem(elem, items)} className="bg-[#F9D62B] w-[5rem] rounded-xl py-[0.2rem]">View</button>
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
      <div className="flex flex-row justify-between mt-[2rem] text-white whitespace-nowrap">
        <div className='text-[2.5rem]'>REQUEST</div>   
         {searchBar()}
      </div>

      <div className="bg-[#134083] w-full h-full rounded-[2rem] flex flex-row lg:space-x-[1.5rem] lg:overflow-y-auto self-center lg:p-[1rem]">
        <div className="w-full h-auto overflow-y-auto space-y-[1rem] p-[1rem]">
          {/*requestFormat()*/}
        </div>
        <div className="flex flex-col h-auto w-full p-[1rem] lg:overflow-y-auto bg-white rounded-xl border-[#F9D62B] border-[0.5rem] space-y-[0.5rem]">
          <div className="flex flex-row">
            <div className="flex w-auto h-[2rem] items-center font-semibold"> Requested by: {requestBy}</div>
          </div>
            
          <div className="flex flex-col space-y-[1rem] h-auto whitespace-nowrap">
            <div className="flex flex-row justify-between text-[1rem]">
              <div className="flex flex-col h-full lg:w-[15rem] p-[0.5rem]">
                <div className="flex flex-col items-start space-y-[0.7rem] leading-[0.9] whitespace-normal">
                  <div className="flex items-center space-x-[2.5rem]">
                    <div className="w-24">Name of item:</div>
                    <div>{name}</div>
                  </div>
                  <div className="flex items-center space-x-[2.5rem]">
                    <div className="w-24">Description:</div>
                    <div>{desc}</div>
                  </div>
                  <div className="flex items-center space-x-[2.5rem]">
                    <div className="w-24">Found at:</div>
                    <div>{found}</div>
                  </div>
                  <div className="flex items-center space-x-[2.5rem]">
                    <div className="w-24">Surrendered by:</div>
                    <div>{surrenderedBy}</div>
                  </div>
                  <div className="flex items-center space-x-[2.5rem]">
                    <div className="w-24">Posted by:</div>
                    <div>{postedby}</div>
                  </div>
                  <div className="flex items-center space-x-[3.1rem]">
                    <div className="w-24">Date posted:</div>
                    <div>{datePosted}</div>
                  </div>
                </div>
            </div>
            <div className="lg:h-[11.5rem] lg:w-[10rem] py-2 border-[0.3rem] border-[#F9D62B] rounded-xl flex flex-col">
              {displayPic()}
            </div>
          </div>
              <input 
              type="text"
              id="subject"  
              placeholder="Subject" 
              className="border-[0.2rem] border-[#F9D62B] h-[2.5rem] w-full text-[1.5rem] p-[1rem] lg:p-[0.8rem] lg:text-[1rem] lg:h-[1rem]"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            /> 
              <textarea 
              id="letter" 
              rows={4}
              placeholder="" 
              className="border-[0.2rem] border-[#F9D62B] h-full w-full text-[1.5rem] p-[1rem] lg:p-[0.5rem] lg:text-[1rem] lg:h-"
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
