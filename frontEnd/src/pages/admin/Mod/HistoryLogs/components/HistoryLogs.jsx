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
    <div className="flex flex-col justify-between mt-[0.5rem] text-white whitespace-nowrap px-[1rem]">
        <div className='font-poppins ml-[2rem] mb-[1rem]'>HISTORY LOGS</div>   
        {/*searchbar */}
        </div>
    <div className="bg-[#134083] overflow-y-auto w-full h-full rounded-[2rem] flex flex-col space-y-[1rem] self-center p-[0.8rem]">
        <div className="text-white font-poppins h-full flex flex-col space-y-[0.5rem] justify-center items-center">
            <b>StartDate : </b>
            <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
                type="date"
                id="startDate"
                min="2024-01-01"
                max={new Date().toISOString().split('T')[0]}
                value={startDate}
                onChange={handleStartDateChange}
            />
            <br></br>
            <b>EndDate : </b>
            <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
                type="date"
                id="endDate"
                min="2024-01-01"
                max={new Date().toISOString().split('T')[0]}
                value={endDate}
                onChange={handleEndDateChange}
            />
            <br></br>
            <button className="text-[0.8rem] font-bold rounded-full hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white h-[2.5rem] w-[10rem] overflow-hidden bg-[#F9D62B] text-black p-[0.5rem]"
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