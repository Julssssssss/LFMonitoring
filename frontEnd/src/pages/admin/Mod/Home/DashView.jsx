import Panels from './Widgets/Panels'
import ProfileIcon from './Widgets/ProfileIcon'
import Sidebar from '../../MainComponents/SideBar'
import { getData } from "../../MainComponents/getData"
import { useEffect, useState } from 'react';
import Loading from "../../../404/Loading"

const DashView = () => {
  const [users, setUsers] = useState(null);
  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState()

  const getItems = async () => {
    await getData()
    .then((res)=>{
      const {items, user, picture} = res.data;
      setItemData(items)
      setUsers(user)
      setPic(picture)  
      setLoading(false);
    })
    
  };

  useEffect(() => {
    getItems();
  }, []);
 
  if (loading) {
    return <div><Loading /></div>;
  }
  const Fname = users.Name.split(' ')[0];
  const Role = users.Role.toUpperCase()

  return (
    <>
      <div className='relative flex flex-col font-poppins -space-y-[11rem] sm:-space-y-[11.5rem] md:-space-y-[15rem] lg:-space-y-[13rem] xl:-space-y-[15rem] 2xl:-space-y-[20rem] z-0 h-screen w-full bg-[#17394C]'> 
        <div className='flex flex-row h-auto lg:gap-[5rem] xl:gap-[7rem]'>
          <div className='absolute z-10 lg:relative'>
            <Sidebar />
          </div>
          <div className='flex flex-col space-y-[1rem] bg-[#0D1832] lg:rounded-l-[6rem] w-full p-[1rem]'>
            {/*for 1st part*/}
            <div className='flex flex-row items-center justify-center lg:justify-between space-x-[4rem] xsm:space-x-[7rem] sm:space-x-[10rem] sm:text-[1.2rem] md:space-x-[25rem] md:text-[1.5rem] lg:pt-[1rem] lg:pl-[1rem] xl:text-[2rem] 2xl:text-[3rem]'>
              <div className='gap-[0.5rem] w-[5rem] ml-[3rem] md:ml-[5rem] lg:m-0 flex flex-row text-[#F9D62B] font-bold'>
                Hi,<b className='text-white'>{Fname}</b>
              </div>
              <div className='flex flex-row text-white gap-[0.5rem] items-center'>
                <b>
                  {Role}
                </b>
                <ProfileIcon User={[users, pic]} />
              </div>
            </div>
            <p className='font-poppins text-white text-[0.8rem] sm:text-[0.9rem] md:text-[1.2rem] xl:text-[1.5rem] 2xl:text-[2rem]'>
              <b>Notice:</b> Generate logs by selecting start and end dates.
            </p>
            <Panels itemData = {itemData}/> 
          </div>
        </div>
      </div>
    </>
  )
}

export default DashView