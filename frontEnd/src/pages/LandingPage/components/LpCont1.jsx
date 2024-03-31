import { useState } from "react"
import SignIn from "./SignIn"



const LpCont1 = () => {
   
    const [showBtn, setBtn] = useState(true)
    const handleBtn =() => {
        setBtn(false)
    }

   
    return (
        <div className="relative w-screen h-auto pt-[2rem] overflow-hidden">
            <div>
                <div className="flex flex-col h-[10rem] bg-[#183A4C] bg-opacity-30 space-y-[1rem] xsm:space-y-[0.5rem] md:space-y-[3rem] sm:h-[13rem] md:h-[20rem] lg:h-[23.5rem] xl:h-[33rem] 2xl:h-[45rem]">
                    <div className="text-white font-poppins font-bold text-[1.8rem] text-left ml-[1rem] mr-[5rem] z-30 xsm:text-[2.2rem] sm:text-[2.5rem] md:text-[3.5rem] md:ml-[1.5rem] lg:text-[5rem] lg:ml-[1.8rem] xl:text-[6.5rem] xl:ml-[2rem] 2xl:text-[9rem] 2xl:ml-[2.5rem]">Lost & Found</div>
                    <div className="text-white font-poppins font-semithin text-[0.7rem] mr-[9rem] text-left xsm:mr-[11rem] xsm:text-[0.8rem] ml-[1rem] z-30 sm:text-[0.9rem] sm:mr-[13rem] sm:text-[0.8rem] md:text-[1.4rem] md:mr-[17.3rem] md:ml-[1.5rem] lg:text-[1.7rem] lg:ml-[1.8rem] lg:mr-[22rem] xl:text-[2.2rem] xl:mr-[27rem] xl:ml-[2rem] 2xl:mr-[38rem] 2xl:text-[3.2rem] 2xl:ml-[2.5rem]">The Rizal Technological University Lost and Found Monitoring Solution System that simplifies the process of tracking, locating, and reuniting with individuals.</div>
                </div>
                <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1708929147/Assets/iPhone_15_Pro_lptspe.png" alt="Mockups" className="absolute -top-[2.9rem] -right-[4rem] w-[18rem] h-[17rem] xsm:w-[20rem] xsm:h-[19rem] xsm:-top-[3.2rem] rotate-0 z-20 sm:w-[24rem] sm:-right-[4.5rem] sm:h-[24rem] sm:-top-[4rem] md:w-[35rem] md:h-[35rem] md:-top-[5.5rem] md:-right-[6.2rem] lg:w-[41rem] lg:h-[41rem] lg:-top-[7rem] lg:-right-[8rem] xl:w-[56rem] xl:h-[56rem] xl:-top-[9.5rem] xl:-right-[12rem] 2xl:w-[77rem] 2xl:h-[75rem] 2xl:-top-[13rem] 2xl:-right-[17rem] 3xl:-right-[14rem]"/>
                <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1702903075/Assets/rtu_logo_3_2_xdasmc.png" alt="rtu logo" className="absolute top-[8rem] right-[2.2rem] w-[3.5rem] h-[3.5rem] opacity-50 z-10 xsm:right-[3rem] xsm:top-[8.5rem] sm:right-[4.5rem] sm:top-[11rem] md:w-[5rem] md:h-[5rem] md:top-[16rem] md:right-[4.8rem] lg:w-[6rem] lg:h-[6rem] lg:right-[7rem] lg:top-[19rem] xl:w-[8rem] xl:h-[8rem] xl:top-[26rem] xl:right-[9rem] 2xl:right-[11rem] 2xl:top-[34rem] 2xl:w-[12rem] 2xl:h-[12rem] 3xl:right-[14rem]"/>
                <img src="https://res.cloudinary.com/dxjpbwlkh/image/upload/v1702903247/Assets/Untitled_design_5_2_hks4zt.png" alt="lF logo" className="absolute top-[0rem] right-[4rem] w-[3rem] h-[3rem] opacity-50 z-20 md:w-[5rem] md:h-[5rem] md:right-[10rem] md:top-[0.5rem] lg:w-[8rem] lg:h-[8rem] lg:right-[13.5rem] xl:w-[9rem] xl:h-[9rem] xl:right-[16rem] 2xl:right-[23rem] 2xl:top-[3rem] 2xl:h-[11rem] 2xl:w-[11rem]"/>
                <div className="absolute right-[8rem] top-[8rem] bg-[#17394C] w-[5rem] h-[5rem] rounded-full blur-xl xsm:right-[9rem] sm:w-[7rem] sm:h-[7rem] sm:right-[12rem] sm:top-[9rem] md:w-[9rem] md:h-[9rem] md:top-[3rem] md:-right-[1rem] lg:w-[11rem] lg:h-[11rem] xl:top-[11rem] xl:w-[12rem] xl:h-[12rem] 2xl:w-[15rem] 2xl:h-[15rem] 2xl:top-[13rem]"/>
                <div className="absolute right-0 top-[0.1rem] bg-[#17394C] w-[6rem] h-[6rem] rounded-full blur-xl md:w-[9rem] md:h-[11rem] md:top-[13rem] md:right-[12rem] lg:w-[11rem] lg:h-[11rem] lg:top-[18rem] lg:right-[16rem] xl:w-[12rem] xl:h-[12rem] xl:right-[22rem] xl:top-[25rem] 2xl:top-[35rem] 2xl:right-[29rem]"/>
            </div>
            {/* get started na button */}
            <div className="flex flex-col items-center mt-[2rem] xsm:mt-[4rem] sm:mt-[5rem] md:mt-[7rem] lg:mt-[8rem]">
                <SignIn />
            </div>
        </div>
    )
}

export default LpCont1