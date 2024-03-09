import SearchBar from '../Home/Widgets/SearchBar'
import RequestList from './components/RequestList'
import Sidebar from '../../MainComponents/SideBar'

const RequestsView = () => {
  return (
   <>
    <div className='flex flex-row h-screen w-screen bg-[#17394C] space-x-[1.5rem] overflow-hidden'>
      <Sidebar />
      <div className="flex flex-col relative overflow-y-hidden self-center h-full overflow-hidden w-full bg-[#0D1832] border-l-[0.5rem] border-[#134083] rounded-l-[6rem] space-y-[2rem] md:pb-[1.5rem] md:px-[2rem] 2xl:rounded-l-[7.4rem] 2xl:pb-[2rem] 3xl:rounded-l-[7.7rem] 3xl:px-[3rem]">
        <RequestList/>
      </div>
    </div>
   </>
  )
}

export default RequestsView