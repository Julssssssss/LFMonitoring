
const Logout = () => {
  const logout =()=>{
      window.open(
          `${import.meta.env.VITE_API_URL}/auth/logout`, "_self"
      )
      localStorage.clear()
  }

return (
  <>
    <button className="bg-[#F9D62B] w-[9rem] rounded-full p-2 text-black" onClick={logout}>Logout</button>
  </>
)
}

export default Logout