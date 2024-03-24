import { useState, useEffect } from "react";
import { axiosGetReqList} from "../../../../../components/api/axios";
import ItemsCarousel from "../../../MainComponents/ItemsCarousel";
import DeleteReq from "./DeleteReq";
import SendButton from "./SendButton";
import Approve from "./Approve";
import Loading from "../../../../404/Loading";


const RequestList = () => {

  const [list, setList] = useState([])
  const [itemList, setItemList] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState('')
  const [image, setImage] = useState([])
  const [subject, setSubject] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const [selectedItem, setSelectedItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [userUsedSearch, setUserUsedSearch] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(null)


  const getReqList = async() => {
    try{
      const res = await axiosGetReqList.post('', {'currentPage': currentPage})
      //console.log(res.data)
      setHasNextPage(res.data.hasNextPage)
      setList(res.data.reqListAndItemData)
      setLoading(false);
    }
    catch(err){
      console.log(err)
      setLoading(true);
      return null
    }
  }
  useEffect(()=>{
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
      getReqList()
    }
  }, [currentPage])

  const showWarning = (message) => {
    alert(message);
  };

  //console.log('here', list)
  const pagination =()=>{
    const disable = `btn-disabled`
    return(
      <div className="flex flex-row justify-center">
        <div className="join border-[0.1rem] mt-[0.5rem] border-[#F9D62B]">
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

  const searchData = async()=>{
    if(searchQuery){
      await axiosGetReqList.post('', {
        'searchQuery': searchQuery,
        'currentPage' : currentPage
      })
      .then(res=>{
        setList(res.data.reqListAndItemData)
        setHasNextPage(res.data.hasNextPage)
        setLoading(false);
      })
    }
  }

  const searchByDate = async()=>{
    if(startDate && endDate){
      await axiosGetReqList.post('', {
          'startDate':startDate,
          'endDate':endDate,
          'currentPage': currentPage
      })
      .then(res=>{
        setList(res.data.reqListAndItemData)
        setHasNextPage(res.data.hasNextPage)
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

  function searchBar() {
    return (
      <div className="flex flex-col items-center space-y-[0.5rem] font-poppins mb-[0.5rem]">
        <div className="flex p-[1rem] flex-row items-center justify-center space-x-[0.5rem]">
          <input
            type="text"
            placeholder="Search"
            className="w-[12rem] xsm:w-[16rem] sm:w-[19rem] md:w-[25rem] md:h-[2.2rem] bg-[#17394C] text-[0.9rem] p-[0.3rem] text-white rounded-full"
            value={searchQuery}
            onChange={(e)=>{setSearchQuery(e.target.value), setStartDate(''), setEndDate('')}}
          />
          <button className="bg-[#F9D62B] hover:bg-[#134083] hover:text-white text-black rounded-xl text-[0.8rem] sm:text-[0.9rem] sm:h-[1.6rem] md:text-[1rem] md:h-[2rem] md:w-[5.5rem] h-[1.5rem] w-[4.5rem]"
            onClick={()=>{useSearch()}}
          >
            Search
          </button>
        </div>

        <div className="flex flex-row gap-[0.5rem] text-[0.9rem] md:text-[1.3rem]">
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

        <div className="flex flex-row gap-[1rem] text-[0.9rem] md:text-[1.3rem]">
          <b>EndDate : </b>
          <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
              type="date"
              id="endDate"
              min="2024-01-01"
              max={new Date().toISOString().split('T')[0]}
              value={endDate}
              onChange={(e)=>{setEndDate(e.target.value), setSearchQuery('')}}
          />
        </div>

        <button className="h-[1.5rem] w-[7rem] sm:h-[2rem] sm:w-[8rem] md:h-[2.5rem] md:w-[9rem] md:text-[1rem] bg-[#F9D62B] text-black text-[0.7rem] sm:text-[0.9rem] rounded-full hover:bg-[#134083] hover:text-white"
            onClick={()=>{useSearch()}}
        >
            Search by Date
        </button>
      </div>
    );
  }
  function requestFormat() {
    return list.map((elem, index) => {
      
      return(
        <div key={index}>
          <div className="relativeflex flex-col justify-center border-b-2 border-white bg-[#17394C] w-full h-auto space-y-[0.2rem] rounded-xl p-1 md:p-[0.7rem]">
            <div className="flex flex-row justify-between items-center text-white text-[0.8rem] md:text-[1.3rem]">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col md:flex-row md:space-x-[4rem] md:items-center">
                  <p className="font-bold">{elem.Email}</p>
                  <p className="text-[0.7rem] md:text-[1rem]">{elem.itemData.nameItem}</p>
                </div>
                <div className="text-[0.6rem] p-1 xsm:text-[0.7rem] h-[2rem] w-auto text-end md:text-[1rem]">
                  {elem.dateRequested}
                </div>
              </div>
              <div className={`${elem.haveBeenEmailed ? "bg-green-700" : "bg-red-700"} group h-[1rem] w-[1rem] rounded-full p-[0.5rem]`}>
                <span className="absolute left-[31rem] p-2 scale-0 bg-gray-800 text-[2rem] text-white group-hover:scale-50">
                  {elem.haveBeenEmailed ? "user Emailed" : "user haven't Emailed"}
                </span>
              </div>
            </div>
            <div className="items-center w-full justify-center flex flex-row space-x-[1rem]">
              <button onClick={()=>{setSelectedItem(elem), showWarning(elem.itemData.source)}} className="bg-[#F9D62B] font-poppins text-black hover:bg-[#134083] mt-[0.1rem] text-[0.7rem] md:text-[1rem] md:w-[5rem] hover:text-white w-[4rem] rounded-full">View</button>
              <Approve list={elem} />
              <DeleteReq reqData={elem}/>
            </div>
          </div>
        </div>
      )}
    );
  }

  if (loading) {
    return <div><Loading /></div>;
  }

  const enableDeleteButton = false
  
  const displayPic = (url) => {
    return <ItemsCarousel item={url} enableDeleteButton={enableDeleteButton}/>
  };

  const viewItem = () => { 
    if(selectedItem.itemData){
      const {Email, id, itemData} = selectedItem
      const {datePosted, desc, found, nameItem, postedBy, surrenderedBy, url, source} = itemData
      return(
        <div className="absolute inset-0 z-50 text-[0.9rem] md:text-[1.2rem] flex flex-col space-y-[1rem] bg-[#0D1832] font-poppins w-screen h-auto p-[1rem] overflow-y-auto overflow-x-hidden">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="flex text-white items-center font-semibold font-poppins whitespace-normal h-auto w-[20rem] md:w-[30rem] text-wrap">NOTE: {source}</div>
              <div className="flex text-white items-center font-semibold font-poppins whitespace-normal h-auto w-[20rem] md:w-[30rem] text-wrap">Requested by: {Email}</div>
            </div>
            <button className="absolute right-0 w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] stroke-[#F9D62B] hover:stroke-white"
              onClick={()=>{setSelectedItem('')}}>
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
         
          <div className="flex flex-col text-white items-start space-y-[0.6rem] leading-[0.9]">
            <div className="flex items-center space-x-[2.5rem] h-auto w-auto text-wrap">
              <div className="w-24 md:w-[11rem]">Name of item:</div>
              <div className="w-[10rem] md:w-[20rem] h-auto">{nameItem}</div>
            </div>
            <div className="flex items-center space-x-[2.5rem] h-auto w-auto text-wrap">
              <div className="w-24 md:w-[11rem]">Description:</div>
              <div className="w-[10rem] md:w-[20rem] h-auto">{desc}</div>
            </div>
            <div className="flex items-center space-x-[2.5rem] h-auto w-auto text-wrap">
              <div className="w-24 md:w-[11rem]">Found at:</div>
              <div className="w-[10rem] md:w-[20rem] h-auto">{found}</div>
            </div>
            <div className="flex items-center space-x-[2.5rem] h-auto w-auto text-wrap">
              <div className="w-24 md:w-[11rem]">Surrendered by:</div>
              <div className="w-[10rem] md:w-[20rem] h-auto">{surrenderedBy}</div>
            </div>
            <div className="flex items-center space-x-[2.5rem] h-auto w-auto text-wrap">
              <div className="w-24 md:w-[11rem]">Posted by:</div>
              <div className="w-[10rem] md:w-[20rem] h-auto">{postedBy}</div>
            </div>
            <div className="flex items-center space-x-[2.5rem]">
              <div className="w-24 md:w-[11rem] xl:w-[6rem] 2xl:w-[8.5rem] 3xl:w-[10rem]">Date posted:</div>
              <div className="w-[10rem] md:w-[20rem] h-auto">{datePosted}</div>
            </div>
          </div>
          <div className="relative p-2 h-full w-full border-[0.2rem] border-[#F9D62B] rounded-xl">
            {displayPic(url)}
          </div>

          <input 
            type="text"
            id="subject"  
            placeholder="Subject" 
            className="border-[0.2rem] bg-white border-[#F9D62B] h-[2.5rem] font-poppins rounded-xl text-black w-full text-[0.7rem] md:text-[1rem] p-[0.5rem]"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          /> 
            <textarea 
            id="letter" 
            rows={4}
            placeholder="" 
            className="border-[0.2rem] border-[#F9D62B] w-full text-[0.8rem] md:text-[1rem] text-black bg-white p-[0.5rem] rounded-xl pb-[15rem]"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          /> 
          <div className="flex justify-center items-center">
            <SendButton subject={subject} emailContent={emailContent} requestBy={Email} index= {id}/>
          </div>

        </div>

      )
    }
    else{
      //palagay naman ako ng catch dito if nadelete na yung data means d na mafetch yung data sa db
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between mt-[0.5rem] md:mt-[1rem] text-white whitespace-nowrap px-[1rem]">
          <div className='font-poppins ml-[2rem] md:ml-[5rem] md:text-[2rem]'>REQUESTS LIST</div>   
          {searchBar()}
      </div>

      <div className="bg-[#134083] font-poppins text-white overflow-y-auto p-[0.5rem] w-full h-full rounded-[2rem] flex flex-col">
        <div className="flex flex-row p-[0.7rem] justify-between text-[0.7rem] sm:text-[0.9rem] md:text-[1rem]">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-[15rem] w-full">
            <p>Requestor</p>
            <p>Item</p>
          </div>
          <p className="w-auto">Date Requested</p>
        </div>
        <div className="flex flex-col overflow-y-auto w-full h-full space-y-[1rem]">
          {requestFormat()}
        </div>
        {pagination()}
      </div>

      {selectedItem ? viewItem() : null}
    </>
  );
};

export default RequestList;
