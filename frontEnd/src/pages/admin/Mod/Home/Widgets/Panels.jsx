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
    <div className="flex flex-col text-white font-poppins items-center space-y-[2rem] h-full w-full md:px-[2rem] 3xl:px-[3rem]">
      <div className="flex flex-row space-x-[1.5rem] w-full text-white text-[2rem] md:text-[1.5rem] 2xl:text-[2.4rem] 3xl:text-[2.3rem]">
        <div className="flex flex-col bg-[#134083] border-[0.1rem] border-[#F9D62B] md:h-[10rem] p-[0.5rem] lg:h-[12rem] xl:h-[15rem] 3xl:h-[19rem] 3xl:p-[1rem] w-full rounded-[1rem]">
          ONLINE USERS
          <p className="text-center p-[2rem]">{ Math.floor(Math.random() * 3)}</p>
        </div>
        <div className="flex flex-col bg-[#134083] border-[0.1rem] border-[#F9D62B] md:h-[10rem] p-[0.5rem] lg:h-[12rem] xl:h-[15rem] 3xl:h-[19rem] 3xl:p-[1rem] w-full rounded-[1rem]">
          lOST ITEMS
          <p className="text-center p-[2rem]">{itemData.items.length}</p>
        </div>
        <div className="bg-[#134083] border-[0.1rem] border-[#F9D62B] md:h-[10rem] p-[0.5rem] lg:h-[12rem] xl:h-[15rem] 3xl:h-[19rem] 3xl:p-[1rem] w-full rounded-[1rem]">
          RESOLVED CASES
          <p className="text-center p-[2rem]">{archiveLength}</p>
        </div>
      </div>
      {/*panel 2 */}
      <div className="flex flex-row w-full h-full md:pb-[2rem] md:space-x-[2rem] xl:pb-[3rem] xl:space-x-[2rem]">
        <div className="md:w-[34rem] md:p-[0.5rem] lg:w-[41.2rem] xl:w-[51rem] xl:h-full xl:p-[1rem] 2xl:text-[1.8rem] 3xl:w-full bg-[#134083] border-[0.1rem] border-[#F9D62B] rounded-[1rem] 2xl:w-full">
          {'Found item list'}
        </div>
      {/*panel 3 */}
      <div className="flex flex-col items-center md:w-[15rem] lg:w-[20rem] xl:w-[24rem] 2xl:w-[41rem] 3xl:w-[42rem] text-black">
        <AddItem />
        {/*calendar*/}
        <div className="bg-[#134083] border-[0.1rem] border-[#F9D62B] md:w-full lg:w-fulls xl:w-full h-full rounded-[1rem]">

        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Panels