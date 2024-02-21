import SearchBar from '../Home/Widgets/SearchBar'
import RequestList from './components/RequestList'
import Sidebar from '../../MainComponents/SideBar'

const RequestsView = () => {
  return (
   <>
   <div className='flex flex-row h-screen w-screen bg-[#17394C] space-x-[1.5rem] overflow-x-hidden overflow-y-hidden'>
      <Sidebar />
      <div className="flex flex-col self-center h-full w-full bg-[#0D1832] border-l-[0.5rem] border-[#134083] rounded-l-[5rem] space-y-[2rem] pb-[3rem] px-[3rem]">
        <RequestList/>
      </div>
    </div>
   </>
  )
}

export default RequestsView