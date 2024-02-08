


const Signup = () => {
  const googleAuth =()=>{
    window.open(
        `${import.meta.env.VITE_API_URL}/auth/google/callback`, "_self"
    )
}
  return (
    <>
      <button onClick={googleAuth} className="mt-[2rem] mb-[1rem] bg-[#003985] text-[0.9rem] h-[2rem] w-[8rem] p-1 rounded-md font-poppins text-white mx-1">Sign up</button>
    </>
  )
}

export default Signup