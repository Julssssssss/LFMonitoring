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
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openPopup = () => {
    setShowConfirmation(true);
  };

  const closePopup = () => {
   setShowConfirmation(false);
  };



  const getReqList = async() => {
    try{
      const res = await axiosGetReqList.post()
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
          className=" mb-4 mt-[1rem] bg-[#17394C] p-[0.4rem] text-white rounded-full"
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
          <div className="flex flex-col justify-center border-b-2 border-white bg-[#17394C] w-full h-[4rem] space-y-[0.2rem] rounded-xl p-1">
            <div className="flex flex-row justify-between items-center text-white text-[0.8rem]">
              {elem.Email}
              <div className="text-[0.7rem] h-[2rem] w-[5rem] text-end -mr-[1.3rem]">
                {dateFormat}
              </div>
              <div className={`${elem.haveBeenEmailed ? "bg-green-700" : "bg-red-700"} group h-[1rem] w-[1rem] rounded-full mr-[0.3rem]`}>
                <span className="absolute left-[31rem] p-2 scale-0 bg-gray-800 text-[2rem] text-white group-hover:scale-50">
                  {elem.haveBeenEmailed ? "user Emailed" : "user haven't Emailed"}
                </span>
              </div>
            </div>
            <div className="items-center w-full justify-center flex flex-row space-x-[1rem]">
              <button onClick={() => viewItem(elem, items, openPopup())} className="bg-[#F9D62B] font-poppins text-black hover:bg-[#134083] mt-[0.3rem] text-[0.7rem] hover:text-white w-[4rem] rounded-full">View</button>
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
      <div className="relative z-10 flex flex-col justify-between mt-[0.5rem] text-white whitespace-nowrap px-[1rem]">
        <div className='font-poppins ml-[2rem]'>REQUEST LIST</div>   
         {searchBar()}
      </div>

      <div className="bg-[#134083] font-poppins text-white overflow-y-auto p-[0.7rem] w-full h-full rounded-[2rem] flex flex-col">
        <div className="flex flex-row p-[0.7rem] justify-between text-[0.7rem]">
          <p>Requestor</p>
          <p>Date Requested</p>
        </div>
        <div className="flex flex-col overflow-y-auto w-full h-full space-y-[1rem]">
          {requestFormat()}
        </div>
    
      </div>

      {showConfirmation &&(
          <div className="absolute inset-0 z-50 flex flex-col space-y-[1rem] bg-[#0D1832] w-screen h-auto p-[1rem] overflow-y-auto overflow-x-hidden">
            <div className="flex flex-row justify-between">
              <div className="flex w-auto h-[2rem] text-white text-[0.9rem] items-center font-semibold font-poppins whitespace-normal h-auto w-auto">Requested by: {requestBy}</div>
              <button className="absolute right-[0.7rem] w-[2rem] h-[2rem] stroke-[#F9D62B] hover:stroke-white"
                onClick={closePopup}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 14.9802 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
                        
                      ></path>{' '}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                        
                    ></path>{' '}
                  </g>
                </svg>
              </button>
            </div>

            <div className="flex flex-col text-[0.9rem] text-white items-start space-y-[0.6rem] leading-[0.9]">
              <div className="flex items-center space-x-[2.5rem] h-auto w-auto text-wrap">
                <div className="w-24">Name of item:</div>
                <div className="w-[10rem] h-auto">{name}</div>
              </div>
              <div className="flex items-center space-x-[2.5rem] h-auto w-auto text-wrap">
                <div className="w-24">Description:</div>
                <div className="w-[10rem] h-auto">{desc}</div>
              </div>
              <div className="flex items-center space-x-[2.5rem] h-auto w-auto text-wrap">
                <div className="w-24">Found at:</div>
                <div className="w-[10rem] h-auto">{found}</div>
              </div>
              <div className="flex items-center space-x-[2.5rem] h-auto w-auto text-wrap">
                <div className="w-24">Surrendered by:</div>
                <div className="w-[10rem] h-auto">{surrenderedBy}</div>
              </div>
              <div className="flex items-center space-x-[2.5rem] h-auto w-auto text-wrap">
                <div className="w-24">Posted by:</div>
                <div className="w-[10rem] h-auto">{postedby}</div>
              </div>
              <div className="flex items-center space-x-[2.5rem] md:space-x-[0.5rem]">
                <div className="w-24 md:w-[7rem] xl:w-[6rem] 2xl:w-[8.5rem] 3xl:w-[10rem]">Date posted:</div>
                <div className="w-[10rem] h-auto">{datePosted}</div>
              </div>
            </div>
            <div className="relative p-2 h-full w-full border-[0.2rem] border-[#F9D62B] rounded-xl">
              {displayPic()}
            </div>

            <input 
              type="text"
              id="subject"  
              placeholder="Subject" 
              className="border-[0.2rem] border-[#F9D62B] h-[2.5rem] font-poppins rounded-xl text-white w-full text-[0.7rem] p-[0.5rem]"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            /> 
              <textarea 
              id="letter" 
              rows={10}
              placeholder="" 
              className="border-[0.2rem] border-[#F9D62B] w-full text-[0.7rem] text-white p-[0.5rem] rounded-xl pb-[15rem]"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            /> 
            <div className="flex justify-center items-center">
              <SendButton subject={subject} emailContent={emailContent} requestBy={requestBy} index= {index}/>
            </div>

          </div>

      )}
    </>
  );
};

export default RequestList;
