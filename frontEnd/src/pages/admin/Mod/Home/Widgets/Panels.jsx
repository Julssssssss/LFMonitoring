import AddItem from "../../../MainComponents/AddItem"


const Panels = () => {
  return (
    <>
    {/*panel 1 */}
    <div className="flex flex-col text-white font-poppins items-center space-y-[2rem] h-full w-full lg:px-[2rem] 3xl:px-[3rem]">
      <div className="flex flex-row space-x-[1.5rem] w-full text-white text-[2rem] lg:text-[1.5rem] 3xl:text-[2.3rem]">
        <div className="bg-[#134083] border-[0.1rem] border-[#F9D62B] lg:h-[10rem] p-[0.5rem] xl:h-[15rem] w-full rounded-[1rem]">
          USERS
        </div>
        <div className="bg-[#134083] border-[0.1rem] border-[#F9D62B] lg:h-[10rem] p-[0.5rem] xl:h-[15rem] w-full rounded-[1rem]">
          lOST ITEMS
        </div>
        <div className="bg-[#134083] border-[0.1rem] border-[#F9D62B] lg:h-[10rem] p-[0.5rem] xl:h-[15rem] w-full rounded-[1rem]">
          RESOLVED CASES
        </div>
      </div>
      {/*panel 2 */}
      <div className="flex flex-row w-full h-full lg:pb-[2rem] lg:space-x-[2rem] xl:pb-[3rem] xl:space-x-[2rem]">
        <div className="lg:w-[34.7rem] lg:p-[0.5rem] xl:w-[51rem] xl:h-full xl:p-[1rem] 2xl:text-[1.5rem] 3xl:w-full bg-[#134083] border-[0.1rem] border-[#F9D62B] rounded-[1rem] 2xl:w-full">
          Found item list
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