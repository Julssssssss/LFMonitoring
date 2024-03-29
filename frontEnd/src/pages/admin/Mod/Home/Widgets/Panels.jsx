import { axiosFetchArchLength } from "../../../../../components/api/axios"
import { useEffect, useState } from "react"
import ArchiveDataGenerator from "./ArchiveDataGenerator"


const Panels = ({itemData}) => {
  const [archiveLength, setArchiveLength] = useState(null) //nandito na din yung data ha ng length ng archives

  useEffect(()=>{
    fetchArchReqLength()
    
  },[])
  const fetchArchReqLength =async()=>{
    const archLength = await axiosFetchArchLength.post()
    setArchiveLength(archLength.data)
  }
  return (
    <>
    {/*panel 1 */}
    <div className="flex flex-col lg:flex-row lg:space-x-[1rem] lg:items-start text-[1rem] text-white font-poppins items-center space-y-[1.5rem] lg:space-y-0 h-auto lg:h-full">
      <div className="flex flex-row gap-[1rem] w-full text-white text-[0.8rem] sm:text-[1.1rem] md:text-[1.5rem] 2xl:text-[2.5rem] items-center">
        <div className="flex flex-col p-[0.5rem] bg-[#134083] border-[0.1rem] border-[#F9D62B] w-full h-full md:h-[15rem] lg:h-[13rem] xl:h-[17rem] 2xl:h-[23rem] rounded-[1rem]">
          ONLINE USERS
          <p className="flex items-center justify-center h-full p-[2rem]">{ Math.floor(Math.random() * 3)}</p>
        </div>
        <div className="bg-[#134083] p-[0.5rem] lg:pb-[2.5rem] border-[0.1rem] border-[#F9D62B] w-full md:h-[15rem] lg:h-[13rem] xl:h-[17rem] 2xl:h-[23rem] rounded-[1rem]">
          RESOLVED CASES
          <p className="flex items-center justify-center h-full p-[2rem]">{archiveLength}</p>
        </div>
      </div>
      <ArchiveDataGenerator />
    </div>
    </>
  )
}

export default Panels