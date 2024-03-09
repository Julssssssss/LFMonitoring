import { Link } from "react-router-dom";

const ProfileIcon = ({User}) => {
  return (
    <>
     
      
      <Link to={{pathname:`/Admin/AdminProfile`}}
        state={{User}}
      >
        <div style={{backgroundImage:`url(${User[1]})`}} className='bg-contain cursor-pointer rounded-full border-[0.1rem] border-white bg-center xl:h-[3.5rem] xl:w-[3.5rem] md:w-[3rem] md:h-[3rem] 2xl:w-[5rem] 2xl:h-[5rem] z-20'></div>
      </Link>
    </>
  )
}

export default ProfileIcon