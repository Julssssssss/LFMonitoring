import { axiosFetchArchLength } from "../../../../../components/api/axios"
import { useEffect, useState } from "react"
import ArchiveDataGenerator from "./ArchiveDataGenerator"
import UnfoundItems from "../../UnfoundItems/UnfoundItems"

const Panels = () => {
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
    <div className="flex flex-col h-full md:text-[2rem] lg:flex-row lg:space-x-[1rem] lg:items-start text-[1rem] text-white font-poppins items-center space-y-[1.5rem] h-auto lg:h-full">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-[1rem] w-full text-white text-[0.8rem] sm:text-[1.1rem] md:text-[1.5rem] 2xl:text-[2.5rem] items-center lg:items-start">
        <div className="p-[0.5rem] md:p-[1.5rem] bg-[#134083] border-[0.1rem] border-[#F9D62B] w-full h-full lg:p-[2rem] xl:p-[2rem] 2xl:p-[3rem] rounded-[1rem]">
          <ArchiveDataGenerator />
        </div>
        <div className="p-[0.5rem] md:p-[1.5rem] bg-[#134083] border-[0.1rem] border-[#F9D62B] w-full h-full lg:p-[2rem] xl:p-[2rem] 2xl:p-[3rem] rounded-[1rem]">
          <UnfoundItems />
        </div>
        <div className="bg-[#134083] p-[0.5rem] md:text-[1.5rem] md:p-[1rem] lg:pb-[2.5rem] border-[0.1rem] border-[#F9D62B] w-full md:h-[20rem] lg:h-[13rem] xl:h-[17rem] 2xl:h-[22rem] rounded-[1rem] 2xl:p-[2rem] 2xl:text-[2rem]">
          RESOLVED CASES
          <p className="flex items-center justify-center h-full">{archiveLength}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Panels