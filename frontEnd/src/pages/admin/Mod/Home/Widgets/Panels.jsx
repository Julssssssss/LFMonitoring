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
    <div className="flex flex-col text-white font-poppins items-center space-y-[2rem] h-full w-full lg:px-[2rem] 3xl:px-[3rem]">
      <div className="flex flex-row space-x-[1.5rem] w-full text-white text-[2rem] lg:text-[1.5rem] 3xl:text-[2.3rem]">
        <div className="bg-[#134083] border-[0.1rem] border-[#F9D62B] lg:h-[10rem] p-[0.5rem] xl:h-[15rem] w-full rounded-[1rem]">
          {'Online Users: ' + Math.floor(Math.random() * 8)}
        </div>
        <div className="bg-[#134083] border-[0.1rem] border-[#F9D62B] lg:h-[10rem] p-[0.5rem] xl:h-[15rem] w-full rounded-[1rem]">
          {'lOST ITEMS: ' + itemData.items.length}
        </div>
        <div className="bg-[#134083] border-[0.1rem] border-[#F9D62B] lg:h-[10rem] p-[0.5rem] xl:h-[15rem] w-full rounded-[1rem]">
          {'RESOLVED CASES: '+ archiveLength}
        </div>
      </div>
      {/*panel 2 */}
      <div className="flex flex-row w-full h-full lg:pb-[2rem] lg:space-x-[2rem] xl:pb-[3rem] xl:space-x-[2rem]">
        <div className="lg:w-[34.7rem] lg:p-[0.5rem] xl:w-[51rem] xl:h-full xl:p-[1rem] 2xl:text-[1.5rem] 3xl:w-full bg-[#134083] border-[0.1rem] border-[#F9D62B] rounded-[1rem] 2xl:w-full">
          {'Found item list'}
        </div>
      {/*panel 3 */}
      <div className="flex flex-col items-center lg:w-[15rem] xl:w-[24rem] 2xl:w-[50rem] 3xl:w-[42rem] text-black">
        <AddItem />
        {/*calendar*/}
        <div className="bg-[#134083] border-[0.1rem] border-[#F9D62B] lg:w-full xl:w-full h-full rounded-[1rem]">

        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Panels