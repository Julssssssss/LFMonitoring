import { axiosGetReqList, axiosFetchArchLength } from "../../../../../components/api/axios"
import { useEffect, useState } from "react"
import ArchiveDataGenerator from "./ArchiveDataGenerator"


const Panels = ({itemData}) => {
  const [reqLength, setReqLength] = useState(null) //nandito na yung max length ng data ng request gagamitin mo n lang
  const [archiveLength, setArchiveLength] = useState(null) //nandito na din yung data ha ng length ng archives

  useEffect(()=>{
    fetchArchReqLength()
    
  },[])
  const fetchArchReqLength =async()=>{
    const result = await axiosGetReqList.post()
    setReqLength(result.data.reqList.length) 

    const archLength = await axiosFetchArchLength.post()
    setArchiveLength(archLength.data)
    console.log(archiveLength)
  }

  function foundItems() {
    return itemData.items.map((item, index) => {
      return(
        <div key={index}>
          <div className="bg-[#17394C] w-full h-[2rem] md:h-[2.5rem] rounded-xl border-b-[0.1rem] border-white">
            <div className="flex flex-row w-full h-full p-[0.5rem] text-[0.7rem] md:text-[1rem] justify-between items-center">
              {item.nameItem}
              <p>
                {item.datePosted}
              </p>
            </div>
          </div>
        </div>
      )
    });
  }



  return (
    <>
    {/*panel 1 */}
    <div className=" flex flex-col text-[1rem] text-white font-poppins items-center space-y-[1rem] p-[1rem] h-full">
      <div className="grid grid-cols-2 gap-[1rem] w-full text-white text-[0.8rem] md:text-[1.5rem] items-center">
        <div className="flex flex-col p-[0.5rem] bg-[#134083] border-[0.1rem] border-[#F9D62B] w-full h-full md:h-[15rem] rounded-[1rem]">
          ONLINE USERS
          <p className="flex items-center justify-center h-full p-[2rem]">{ Math.floor(Math.random() * 3)}</p>
        </div>
        <div className="flex flex-col p-[0.5rem] bg-[#134083] border-[0.1rem] border-[#F9D62B] w-full h-full md:h-[15rem] rounded-[1rem]">
          lOST ITEMS
          <p className="flex items-center justify-center h-full p-[2rem]">{itemData.items.length}</p>
        </div>
        <div className="bg-[#134083] p-[0.5rem] border-[0.1rem] border-[#F9D62B] w-full h-full md:h-[15rem] rounded-[1rem]">
          RESOLVED CASES
          <p className="flex items-center justify-center h-full p-[2rem]">{archiveLength}</p>
        </div>
          <ArchiveDataGenerator />
      </div>

      <div className=" bg-[#134083] border-[0.1rem] border-[#F9D62B] p-[0.5rem] rounded-[1rem] w-full h-full overflow-x-hidde overflow-y-auto space-y-[0.5rem] md:space-y-[1rem]">
          Found item list
          {foundItems()}
      </div>
    </div>
    </>
  )
}

export default Panels