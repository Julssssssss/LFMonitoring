import Panels from './Widgets/Panels'
import SearchBar from './Widgets/SearchBar'
import ProfileIcon from './Widgets/ProfileIcon'
import Sidebar from '../../MainComponents/SideBar'
import { getData } from "../../MainComponents/getData"
import { useEffect, useState } from 'react';
import Loading from "../../../404/Loading"


const DashView = () => {
  const [user, setUser] = useState(null);
  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null)

  const getItems = async () => {
    const temp = await getData();
    const item = ([temp])
    setUser([item[0].user]);
    setPic ([item[0].pic])
    
    setLoading(false);
    
  };
  
  
  useEffect(() => {
    getItems();
  }, []);
  if (loading) {
    return <div><Loading /></div>;
  }

  const Fname = user[0].Name? user[0].Name.split(' ')[0] : "";

  return (
    <>
    <div className='flex flex-row h-screen w-screen bg-[#17394C] font-poppins space-x-[1.5rem] overflow-x-hidden overflow-y-hidden'>
      <Sidebar />
      <div className="flex flex-col self-center h-full w-full bg-[#0D1832] border-l-[0.5rem] border-[#134083] lg:rounded-l-[6rem] xl:space-y-[2rem] lg:space-y-[1rem] xl:rounded-l-[7rem] 3xl:rounded-l-[7.5rem]">
        <div className='flex flex-row justify-between xl:ml-[3rem] lg:mt-[2rem] lg:ml-[2rem] lg:mr-[2rem] xl:mr-[3rem] xl:mt-[2rem] 2xl:mt-[2.5rem] text-white whitespace-nowrap'>
          <div className='xl:text-[2.5rem] lg:text-[2rem] 2xl:text-[3rem]'>
            Welcome back, <b>{Fname}</b>
          </div>
          <ProfileIcon User={[user, pic]} />
        </div>
          <Panels />
      </div>
    </div>
    </>
  )
}

export default DashView