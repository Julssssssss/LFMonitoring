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

    /*  console.log('hii', res.data.items)
      setItemData([res.data.items])
      console.log('here', itemData) */
      //setUser([res.data.user]);
      //setPic ([item[0].pic])
      //console.log('here', user)
  
      
      setLoading(false);
    })
  /*  const item = ([temp.res.data])
    setItemData(temp)
    setUser([item[0].user]);
    setPic ([item[0].pic])
    
    setLoading(false); */
    
  };

  useEffect(() => {
    getItems();
  }, []);
 
  if (loading) {
    return <div><Loading /></div>;
  }
  const Fname = users.Name? users.Name.split(' ') : "";

  return (
    <>
      <div className='relative bg-[#0D1832] w-auto h-screen md:h-full md:w-screen'>
        <div className='relative z-1 w-full md:h-auto bg-[#0D1832] flex flex-col space-y-[1rem]'>
          <div className='w-screen flex flex-row space-x-[0.1rem] md:space-x-[3rem]'>
              <Sidebar />
            <div className='flex flex-col space-y-[1rem]'>
              <div className='text-white mt-[1rem] flex flex-row justify-between md:gap-[4rem] h-auto w-screen md:w-full'>
                <div className='ml-[4rem] justify-start md:w-full whitespace-normal w-full md:text-[2rem] text-[#F9D62B] font-bold'>
                  Welcome back, <b className='text-white'>{Fname}</b>
                </div>

                <div className='flex flex-row space-x-[0.5rem] w-full md:w-full justify-end pr-[1rem]'>
                  <div className='text-[1rem] md:text-[2rem] flex items-center'>
                    <b>
                      {users.Role}
                    </b>
                  </div>
                  <div className='flex items-center'>
                    <ProfileIcon User={[users, pic]} />
                  </div>
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