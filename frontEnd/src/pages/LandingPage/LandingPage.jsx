import LpCont1 from "./components/LpCont1"
import LpCont2 from "./components/LpCont2"
import Faq from "./components/Faq"
import {Auth} from "./components/Auth"
import { getAccessTokenAndRole } from "./components/getAccessTokenAndRole"
import {useEffect, useState } from "react"

import TermsAndAgreement from "./components/TermsAndAgreement"

const LandingPage = () => {

  const [handleTAC, setHandleTAC] =useState(true)
  

  const redirect = async()=>{
    await getAccessTokenAndRole()
      .then((res)=>{
        if(!res){logout()}
        const {role, TAC} = res
        //console.log(role, TAC)
        if(role === 'admin' || TAC === true){
          Auth();
        }
        else if(role === "user" && TAC === false){
          setHandleTAC(false)
        }
      })
  }
  
  useEffect(()=>{
    redirect()
  },[])

  const logout =()=>{
    window.open(
        `${import.meta.env.VITE_API_URL}/auth/logout`, "_self"
    )
    localStorage.clear()
  }

  const closeTAC = () => {
    setHandleTAC(false);
    logout()
  };
  
  return (
    <>
        <div className="bg-[#0d1832] flex flex-col overflow-x-hidden overflow-y-auto w-auto h-full">
            {handleTAC ? 
              null:
              <div>
                <TermsAndAgreement closeTAC={closeTAC}/>
              </div>
              }

            <LpCont1/>
            <LpCont2/>
            <Faq/>
            
        </div>
    </>
  )
}

export default LandingPage