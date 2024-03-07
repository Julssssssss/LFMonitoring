

const Login = () => {
    const googleAuth =()=>{
        window.open(
            `${import.meta.env.VITE_API_URL}/auth/google`, "_self"
        )
    }
  return (
    <>
        <button onClick={googleAuth} className="relative z-10 mt-[2rem] mb-[1rem] bg-[#003985] text-[0.9rem] h-[2rem] w-[8rem] p-1 rounded-full font-poppins text-white mx-1 md:text-[1.5rem] md:h-[3.5rem] md:w-[13rem] lg:text-[1.8rem] lg:w-[17rem] lg:h-[4rem] xl:h-[3.5rem] xl:w-[12rem] xl:text-[2rem] 2xl:w-[35rem]">Log in</button>
    </>
  )
}

export default Login