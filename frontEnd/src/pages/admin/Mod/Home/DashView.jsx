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
  const [itemData, setItemData] = useState(null)

  const getItems = async () => {
    const temp = await getData();
    const item = ([temp])
    setItemData(temp)
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
      <div className='relative z-0 bg-[#17394C] w-screen h-screen'>
        <div className='absolute z-1 h-full bg-[#0D1832] flex flex-col space-y-[1rem]'>
          <div className='w-full flex flex-row space-x-[0.1rem]'>
              <Sidebar />
            <div className='flex flex-col space-y-[1rem]'>
              <div className='text-white mt-[1rem] flex flex-row space-x-[0.2rem] h-auto'>
                <div className='whitespace-normal w-[10rem] text-[#F9D62B] font-bold'>
                  Welcome back, <b className='text-white'>{Fname}</b>
                </div>
                <div className='text-[1rem] flex items-center'>
                  <b>
                    {user[0].Role}
                  </b>
                </div>
                <div className='flex items-center'>
                  <ProfileIcon User={[user, pic]} />
                </div>
              </div>
              
            </div>
            
          </div>
          <Panels itemData = {itemData}/>
        </div>
      </div>
    </>
  )
}

export default DashView