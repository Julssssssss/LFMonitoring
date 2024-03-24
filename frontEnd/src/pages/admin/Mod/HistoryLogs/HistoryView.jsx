import Sidebar from "../../MainComponents/SideBar"
import HistoryLogs from "./components/HistoryLogs"


const HistoryView = () => {
  return (
    <>
    <div className='relative flex flex-row h-screen w-screen bg-[#17394C] overflow-x-hidden overflow-y-hidden'>
      <div className='absolute z-20'>
        <Sidebar />
      </div>
      <div className="absolute z-1 flex flex-col self-center p-[1rem] md:p-[2rem] h-screen w-screen bg-[#0D1832] border-[#134083]">
        <HistoryLogs/>
      </div>
    </div>
    </>
  )
}

export default HistoryView