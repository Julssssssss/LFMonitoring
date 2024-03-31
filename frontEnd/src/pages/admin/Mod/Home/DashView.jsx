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
      <div className='relative flex flex-col font-poppins -space-y-[11rem] sm:-space-y-[11.5rem] md:-space-y-[15rem] lg:-space-y-[13rem] xl:-space-y-[15rem] 2xl:-space-y-[20rem] z-0 h-screen w-screen bg-[#17394C]'> 
        <div className='flex flex-row h-screen lg:gap-[5rem] xl:gap-[7rem]'>
          <div className='absolute z-10 lg:relative'>
            <Sidebar />
          </div>
          <div className='flex flex-col space-y-[1rem] bg-[#0D1832] lg:rounded-l-[6rem] w-full h-full p-[1rem]'>
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
        <div>
          <img className='relative z-0 opacity-50 w-screen h-[4rem] xsm:h-[5rem] sm:h-[5.5rem] md:h-[8rem] lg:w-full lg:pl-[9rem] xl:h-[10rem] xl:pl-[11rem] 2xl:h-[13rem]' src='https://res.cloudinary.com/dxjpbwlkh/image/upload/v1711559647/Assets/Group_16_zxbouo.png' alt='border' />
          <div className='flex flex-row absolute bottom-[3.7rem] lg:bottom-[1.1rem] xl:bottom-[1.5rem] 2xl:bottom-[2.2rem] right-0'>
            <div className='flex flex-col font-bold text-end sm:text-[1.2rem] sm:pl-[0.1rem] md:text-[1.8rem] xl:text-[2.2rem] 2xl:text-[3rem] font-poppins text-white'>
              <p>RIZAL</p>
              <p>TECHNOLOGICAL</p>
              <p>UNIVERSITY</p>
              <p className='text-end text-[1rem] md:text-[1.5rem] xl:text-[1.9rem] 2xl:text-[2.8rem] font-normal'>CITIES OF MANDALUYONG AND PASIG</p>
              <p className='font-satisfy text-[0.9rem] md:text-[1.5rem] xl:text-[1.8rem] 2xl:text-[2.5rem]'>Forever true to the Gold and Blue</p>
            </div>
            <img className=" w-[7rem] h-[7rem] xsm:w-[8rem] xsm:h-[8rem] sm:w-[9rem] sm:h-[9rem] md:w-[14rem] md:h-[14rem] xl:w-[18rem] xl:h-[18rem] 2xl:w-[21rem] 2xl:h-[21rem]" src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709912489/Assets/rtu_logo_5_yz5e6k.png" alt="rtuLogo" />
         </div>
        </div>
      </div>
    </>
  )
}

export default DashView