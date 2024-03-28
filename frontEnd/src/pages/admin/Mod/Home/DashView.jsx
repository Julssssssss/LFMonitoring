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
  const [userName, setUserName] = useState(null)
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

  return (
    <>
      <div className='relative z-0 h-screen w-screen bg-[#17394C]'> 
        <div className='flex flex-row h-screen lg:gap-[5rem] xl:gap-[7rem]'>
          <div className='absolute z-10 lg:relative'>
            <Sidebar />
          </div>
          <div className='flex flex-col space-y-[1rem] bg-[#0D1832] lg:rounded-l-[6rem] w-full h-auto p-[1rem]'>
            {/*for 1st part*/}
            <div className='flex flex-row items-center justify-center lg:justify-between space-x-[4rem] xsm:space-x-[7rem] sm:space-x-[10rem] sm:text-[1.2rem] md:space-x-[25rem] md:text-[1.5rem] lg:text-[2.5rem] lg:p-[1rem]'>
              <div className='gap-[0.5rem] w-[5rem] ml-[3rem] md:ml-[5rem] lg:m-0 flex flex-row text-[#F9D62B] font-bold'>
                Hi,<b className='text-white'>{Fname}</b>
              </div>
              <div className='flex flex-row text-white gap-[0.5rem] items-center'>
                <b>
                  {users.Role}
                </b>
                <ProfileIcon User={[users, pic]} />
              </div>
            </div>
            <Panels itemData = {itemData}/>
            
          </div>
          <img className='absolute z-0 bottom-[7rem] opacity-50 w-screen h-[5rem] lg:w-full lg:pl-[9rem] xl:h-[7rem] xl:pl-[11rem]' src='https://res.cloudinary.com/dxjpbwlkh/image/upload/v1711559647/Assets/Group_16_zxbouo.png' alt='border' />
          <div className='flex flex-col text-white items-end absolute bottom-[1rem] right-[7rem] xl:right-[9rem] xl:bottom-[2rem] font-poppins font-bold text-[1.2rem]'>
            <p>RIZAL</p>
            <p>TECHNOLOGICAL</p>
            <p>UNIVERSITY</p>
            <p className='text-end text-[1rem] font-normal'>CITIES OF MANDALUYONG AND PASIG</p>
            <p className='font-satisfy text-[0.9rem]'>Forever true to the Gold and Blue</p>
          </div>
          <img className="absolute bottom-[3rem] right-0 w-[7rem] h-[7rem] xl:w-[8.5rem] xl:h-[8.5rem]" src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709912489/Assets/rtu_logo_5_yz5e6k.png" alt="rtuLogo" />
          
        </div>

      </div>
    </>
  )
}

export default DashView