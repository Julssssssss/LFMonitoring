import { axiosDeleteReq } from "../../../../../components/api/axios";

const DeleteReq = ({reqData}) => {
    //console.log(reqData)

    const sendDeleteReq = async()=>{
      try{
        await axiosDeleteReq.post(null, reqData)
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{console.log(err)})
      }
      catch(err){console.log(err)}
    }

  return (
    <div>
        <button className="  bg-[#F9D62B] w-[5rem] rounded-xl py-[0.2rem]"
        type='button'
        onClick={sendDeleteReq}
        >
          Delete
        </button>
    </div>
  )
}

export default DeleteReq