import { useState } from "react"
import { axiosGetLogs } from "../../../../../components/api/axios"
import UnfoundItems from "../../UnfoundItems/UnfoundItems"



const HistoryLogs = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
  
    //handle range of dates
    const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
    };
  
    const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
    };

    const requestArchiveData = async()=>{
        if(startDate && endDate){
            await axiosGetLogs.post('', {
                startDate:startDate,
                endDate:endDate,
            }, 
            {
                responseType:'blob'
            })
            .then(result=>{
                
                const pdfBlob = new Blob([result.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(pdfBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Logs-from${startDate}-to-${endDate}.pdf`; // Set the desired filename
                a.click();

                // Clean up the temporary URL
                window.URL.revokeObjectURL(url);
            })
        }
    }


  return (
    <>
    <div className="flex flex-col justify-between mt-[0.5rem] text-white whitespace-nowrap px-[1rem] md:px-[2rem] lg:px-0">
        <div className='font-poppins ml-[2rem] md:ml-[3rem] mb-[1rem] md:text-[2rem] lg:ml-0 xl:text-[3rem]'>HISTORY LOGS</div>   
        {/*searchbar */}
    </div>
    <div className="bg-[#134083] space-y-[0.9rem] overflow-y-visible lg:overflow-hidden w-full h-screen lg:space-y-0 lg:h-full lg:space-x-[1.5rem] rounded-[2rem] flex flex-col lg:flex-row justify-center items-center lg:p-0 p-[0.8rem]">
        <div className="text-white md:text-[1.5rem] xl:text-[1.9rem] font-poppins h-auto w-full px-[5rem] flex flex-col items-center">
            <b className="text-start w-full">StartDate : </b>
            <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
                type="date"
                id="startDate"
                min="2024-01-01"
                max={new Date().toISOString().split('T')[0]}
                value={startDate}
                onChange={handleStartDateChange}
            />
            <br></br>
            <b className="text-start w-full">EndDate : </b>
            <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
                type="date"
                id="endDate"
                min="2024-01-01"
                max={new Date().toISOString().split('T')[0]}
                value={endDate}
                onChange={handleEndDateChange}
            />
            <br></br>
            <button className="text-[0.8rem] font-bold rounded-full hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white h-[2rem] w-[10rem] overflow-hidden bg-[#F9D62B] md:text-[1.5rem] md:w-auto md:h-auto lg:w-[15rem] lg:text-[1rem] text-black p-[0.5rem]"
                onClick={requestArchiveData}
            >
                {'Generate Logs Data'}
            </button>
        </div>
        <UnfoundItems />
    </div>
    </>
  )
}

export default HistoryLogs