import { useState } from "react"
import { axiosGetLogs } from "../../../../../components/api/axios"


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
    <div className="flex flex-col justify-between mt-[0.5rem] text-white whitespace-nowrap px-[1rem] md:px-[2rem] lg:px-0 lg:mr-[1rem]">
        <div className='font-poppins flex flex-col ml-[2rem] md:ml-[3rem] mb-[1rem] md:text-[2rem] lg:ml-0 xl:text-[3rem]'>
            <p>HISTORY LOGS</p>
            
        </div>   
    </div>
    <div className="bg-[#134083] space-y-[3rem] sm:space-y-[4rem] md:space-y-[5rem] font-poppins overflow-y-visible lg:overflow-hidden w-full h-full lg:space-y-[4rem] lg:h-full lg:space-x-[1.5rem] rounded-[2rem] flex flex-col items-center lg:p-[1rem] p-[0.8rem]">
        <div className="text-start font-poppins mb-[0.5rem] text-white h-auto text-[0.7rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.4rem]">
            <p className="w-full whitespace-normal"><b>Note: </b>This section is dedicated for generating logs, which includes history logs and activity logs of user within the administrator side.</p>
        </div>
        <div className="text-white md:text-[1.5rem] xl:text-[1.9rem] font-poppins h-auto w-auto p-[1rem] xl:p-[2rem] md: bg-[#17394C] border-[0.2rem] rounded-[1rem] border-[#F9D62B] flex flex-col items-center">
            <b className="text-center w-full">StartDate : </b>
            <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
                type="date"
                id="startDate"
                min="2024-01-01"
                max={new Date().toISOString().split('T')[0]}
                value={startDate}
                onChange={handleStartDateChange}
            />
            <br></br>
            <b className="text-center w-full">EndDate : </b>
            <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
                type="date"
                id="endDate"
                min="2024-01-01"
                max={new Date().toISOString().split('T')[0]}
                value={endDate}
                onChange={handleEndDateChange}
            />
            <br></br>
            <button className="text-[0.8rem] font-bold rounded-full hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white border-[0.1rem] h-[2rem] w-[10rem] overflow-hidden bg-[#F9D62B] md:text-[1.5rem] md:w-auto md:h-auto lg:w-[15rem] lg:text-[1rem] text-black p-[0.5rem]"
                onClick={requestArchiveData}
            >
                {'Generate Logs Data'}
            </button>
        </div>    
        </div>
    </>
  )
}

export default HistoryLogs