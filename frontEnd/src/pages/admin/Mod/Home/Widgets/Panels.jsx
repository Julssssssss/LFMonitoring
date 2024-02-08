import AddItem from "../../../MainComponents/AddItem"
import RequestsButton from "../../../MainComponents/RequestsButton"

const Panels = () => {
  return (
    <>
    {/*panel 1 */}
    <div className="flex flex-col text-white items-center space-y-[2rem] h-screen w-full px-[3rem]">
      <div className="flex flex-row space-x-[1.5rem] text-white text-[2rem]">
        <div className="bg-[#134083] h-[15rem] w-[24rem] rounded-[2rem] pl-[1rem]">
          USERS
        </div>
        <div className="bg-[#134083] h-[15rem] w-[24rem] rounded-[2rem] pl-[1rem]">
          lOST ITEMS
        </div>
        <div className="bg-[#134083] h-[15rem] w-[24rem] rounded-[2rem] pl-[1rem]">
          RESOLVED CASES
        </div>
      </div>
      {/*panel 2 */}
      <div className="flex flex-row w-full h-full pb-[3rem] space-x-[2rem]">
        <div className="w-[49rem] h-full bg-[#134083] rounded-[2rem] p-[1rem]">
          Found item list
        </div>
      {/*panel 3 */}
      <div className="flex flex-col items-center w-[24rem] text-black">
        <AddItem />
        <RequestsButton />
        {/*calendar*/}
        <div className="bg-[#134083] w-full h-full rounded-[2rem]">

        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Panels