import { Link } from "react-router-dom";

const ProfileIcon = ({User}) => {
  return (
    <>
     
      
      <Link to={{pathname:`/Admin/AdminProfile`}}
        state={{User}}
      >
        <div style={{backgroundImage:`url(${User[1]})`}} className='bg-contain hover:opacity-75 cursor-pointer rounded-full border-[0.1rem] border-white bg-center w-[2.5rem] h-[2.5rem] md:w-[4rem] md:h-[4rem] z-20'></div>
      </Link>
    </>
  )
}

export default ProfileIcon