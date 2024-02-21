

const SignUpSecQ = () => {
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
  return (
    <>
      <div className="bg-[#0d1832] h-screen">
        <div className="pt-[4rem] flex flex-col h-full w-full items-center">
          {/* warning eme */}
          <p className="text-center px-3  text-white">{lorem}</p>

          {/* security questions */}
          <div className="mt-[3rem] px-[3.3rem]">
            <p className="text-white mb-1">{lorem}</p>
            <input className="bg-yellow-300 rounded-lg w-full px-3 py-1" id="input" type="text"></input>
          </div>

          <button className="mt-[4rem] bg-yellow-300 rounded-md w-[8rem]">Confirm</button>

        </div>
      </div>
    </>
  )
}

export default SignUpSecQ