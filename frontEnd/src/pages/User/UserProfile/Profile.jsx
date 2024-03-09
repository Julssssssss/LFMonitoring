import { Link, useLocation } from "react-router-dom"
import Logout from "./components/Logout";


const Profile = () => {

  const location = useLocation()
  const User = location.state.User

  console.log(User[0].picture ? User[0].picture: `https://www.svgrepo.com/show/512729/profile-round-1342.svg`)

  return (
    <>
    {/* close button */}
        <div className="bg-[#0d1832] flex flex-row">
          <Link to='/Dashboard'>
            <button className='mt-[1rem] ml-[1rem] w-[2rem] h-[2rem] xl:w-[2.5rem] xl:h-[2.5rem] 3xl:h-[3.5rem] 3xl:w-[3.5rem]'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 26" className="fill-[#F9D62B] hover:fill-white">
                <g clipPath="url(#clip0_535_21)">
                  <path d="M23.625 1.625C24.0726 1.625 24.5018 1.7962 24.8182 2.10095C25.1347 2.4057 25.3125 2.81902 25.3125 3.25V22.75C25.3125 23.181 25.1347 23.5943 24.8182 23.899C24.5018 24.2038 24.0726 24.375 23.625 24.375H3.375C2.92745 24.375 2.49822 24.2038 2.18176 23.899C1.86529 23.5943 1.6875 23.181 1.6875 22.75V3.25C1.6875 2.81902 1.86529 2.4057 2.18176 2.10095C2.49822 1.7962 2.92745 1.625 3.375 1.625H23.625ZM3.375 0C2.47989 0 1.62145 0.34241 0.988515 0.951903C0.355579 1.5614 0 2.38805 0 3.25L0 22.75C0 23.612 0.355579 24.4386 0.988515 25.0481C1.62145 25.6576 2.47989 26 3.375 26H23.625C24.5201 26 25.3785 25.6576 26.0115 25.0481C26.6444 24.4386 27 23.612 27 22.75V3.25C27 2.38805 26.6444 1.5614 26.0115 0.951903C25.3785 0.34241 24.5201 0 23.625 0L3.375 0Z"/>
                  <path d="M17.2207 20.241C17.369 20.1768 17.4949 20.0727 17.5832 19.9413C17.6715 19.8098 17.7185 19.6566 17.7185 19.5V6.5C17.7186 6.34339 17.6716 6.19009 17.5833 6.05858C17.495 5.92706 17.369 5.82293 17.2207 5.75872C17.0724 5.6945 16.9079 5.67295 16.7471 5.69664C16.5864 5.72033 16.4361 5.78826 16.3145 5.89225L8.72077 12.3923C8.63155 12.4685 8.56012 12.5621 8.51121 12.6668C8.4623 12.7716 8.43701 12.8851 8.43701 13C8.43701 13.1149 8.4623 13.2284 8.51121 13.3332C8.56012 13.4379 8.63155 13.5315 8.72077 13.6078L16.3145 20.1078C16.4362 20.2117 16.5864 20.2796 16.7472 20.3032C16.9079 20.3269 17.0724 20.3053 17.2207 20.241Z"/>
                </g>
                <defs>
                  <rect width="27" height="26" fill="white"/>
                </defs>
              </svg>
            </button>
          </Link>
        </div>
        <div className="bg-[#0d1832] font-poppins h-auto flex flex-col items-center 3xl:h-screen">
          {/* USER IMAGE */}
          <img className='rounded-full border-8 mt-10 w-[10rem] h-[10rem] border-yellow-400 sm:w-[11rem] sm:h-[11rem] xl:w-[12.5rem] xl:h-[12.5rem]' 
            rel="preload" 
            loading="lazy"
            src={User[0].picture}>
          </img>
          {/* USER DATA */}
          <div className="bg-[#003985] h-[10rem] leading-[1rem] w-[15rem] mt-[5rem] text-white p-[1rem] justify-center flex flex-col z-20 rounded-xl xsm:w-[16rem] xsm:h-[11rem] xsm:mt-[6rem] sm:h-[12rem] sm:w-[20rem] sm:mt-[6.5rem] lg:w-[22rem] lg:h-[13rem] lg:text-[1.1rem] xl:w-[25rem] xl:h-[15rem] xl:text-[1.3rem] 3xl:h-[20rem] 3xl:w-[32rem] 3xl:text-[2rem] 3xl:leading-[2rem] xl:mt-[8.5rem]">
            <b>Name:</b> {User[0].user.Name}  <br/><br/>
            <b>Email:</b> {User[0].user.Email}
          </div>
          {/* yellow designs */}
          <div className="absolute rounded-tr-full left-0 top-[19rem] bg-yellow-400 w-[14rem] h-[4.6rem] z-10 xsm:top-[21rem] sm:h-[6rem] sm:w-[21rem] md:h-[7rem] md:w-[30rem] xl:h-[9rem] xl:w-[45rem] xl:top-[24rem] 3xl:h-[11rem] 3xl:w-[60rem]"></div>
          <div className=" absolute rounded-bl-full right-0 top-[27.5rem] bg-yellow-400 w-[14rem] h-[4.6rem] z-10 xsm:top-[31rem] sm:h-[6rem] sm:w-[20rem] md:h-[7rem] md:w-[30rem] lg:top-[33rem] xl:h-[9rem] xl:w-[45rem] xl:top-[36rem] 3xl:h-[11rem] 3xl:w-[60rem] 3xl:top-[40rem]"></div>
          <div className="mt-[7rem] mb-[8rem] xsm:mt-[8rem] sm:mt-[9rem]">
            <Logout />
          </div>
        </div>
    </>
  )
}

export default Profile