import AddItem from "../../../MainComponents/AddItem"
import { axiosGetReqList, axiosFetchArchLength } from "../../../../../components/api/axios"
import { useEffect, useState } from "react"


const Panels = ({itemData}) => {
  //console.log(itemData)
  const [reqLength, setReqLength] = useState(null) //nandito na yung max length ng data ng request gagamitin mo n lang
  const [archiveLength, setArchiveLength] = useState(null) //nandito na din yung data ha ng length ng archives
  useEffect(()=>{
    fetchArchReqLength()
    
  },[])
  const fetchArchReqLength =async()=>{
    const result = await axiosGetReqList.post()
    setReqLength(result.data.reqList.length) 
    //console.log(result.data.reqList.length)

    const archLength = await axiosFetchArchLength.post()
    setArchiveLength(archLength.data)
    console.log(archiveLength)
  }
  return (
    <>
    {/*panel 1 */}
    <div className="flex flex-col text-[1rem] text-white font-poppins items-center space-y-[1rem] px-[1rem] h-full">
      <div className="grid grid-cols-2 gap-[1rem] w-full text-white text-[0.8rem] items-center">
        <div className="flex flex-col p-[0.5rem] bg-[#134083] border-[0.1rem] border-[#F9D62B] w-full rounded-[1rem]">
          ONLINE USERS
          <p className="text-center p-[2rem]">{ Math.floor(Math.random() * 3)}</p>
        </div>
        <div className="flex flex-col p-[0.5rem] bg-[#134083] border-[0.1rem] border-[#F9D62B] w-full rounded-[1rem]">
          lOST ITEMS
          <p className="text-center p-[2rem]">{itemData.items.length}</p>
        </div>
        <div className="bg-[#134083] p-[0.5rem] border-[0.1rem] border-[#F9D62B] w-full rounded-[1rem]">
          RESOLVED CASES
          <p className="text-center p-[2rem]">{archiveLength}</p>
        </div>
        <AddItem />
      </div>

      <div className=" bg-[#134083] border-[0.1rem] border-[#F9D62B] p-[0.5rem] rounded-[1rem] w-full h-full">
          {'Found item list'}
      </div>
    </div>
    </>
  )
}

export default Panels