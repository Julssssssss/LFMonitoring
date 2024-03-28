
import ItemList from './Components/ItemList'
import Sidebar from "../../MainComponents/SideBar"

const lostView = () => {
  return (
    <>
      <div className='relative z-0 h-screen w-screen bg-[#17394C]'> 
        <div className='flex flex-row lg:gap-[5rem] xl:gap-[7rem]'>
          <div className='absolute lg:relative'>
            <Sidebar />
          </div>
          <div className='flex flex-col bg-[#0D1832] lg:rounded-l-[6rem] w-full h-screen lg:h-screen p-[1rem] lg:p-[1.5rem] lg:pb-[2rem]'>
            <ItemList />
          </div>
        </div>
      </div>
    </>
  )
}

export default lostView