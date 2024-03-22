import { useEffect, useState } from "react";
import axios from 'axios';

const Approve = ({ list }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lists, setLists] = useState([]);

  const {Email, itemId } = list
  
  
 const sample =()=>{
  console.log('here', Email)
 }

  return (
    <>
      <div className="">
        <button
          onClick={sample}
          type="button"
          className="bg-[#F9D62B] text-black font-poppins hover:bg-[#134083] text-[0.7rem] hover:text-white w-[4rem] rounded-full text-center"
        >
          Approve
        </button>
      </div>

      
    </>
  );
};

export default Approve;