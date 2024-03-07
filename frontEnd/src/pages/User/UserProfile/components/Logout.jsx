
const Logout = () => {
  const logout =()=>{
      window.open(
          `${import.meta.env.VITE_API_URL}/auth/logout`, "_self"
      )
      localStorage.clear()
  }

return (
  <>
    <button className="bg-[#F9D62B] w-[9rem] rounded-full p-2 text-black xl:w-[11rem] xl:text-[1.4rem] xl:p-[0.4rem]" onClick={logout}>Logout</button>
  </>
)
}

export default Logout