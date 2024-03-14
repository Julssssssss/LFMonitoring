
import ItemList from './Components/ItemList'
import Sidebar from "../../MainComponents/SideBar"

const lostView = () => {
  return (
    <>
    <div className='relative flex flex-row h-screen w-screen bg-[#17394C] overflow-x-hidden overflow-y-hidden'>
      <div className='absolute z-20'>
        <Sidebar />
      </div>
      <div className="absolute z-1 flex flex-col self-center p-[1rem] h-full w-screen bg-[#0D1832] border-[#134083]">
        <ItemList/>
      </div>
    </div>
    </>
  )
}

export default lostView