import { useState } from "react"
import { axiosGetLogs } from "../../../../components/api/axios"
import Sidebar from "../../MainComponents/SideBar"

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
    <div className="bg-[#0D1832] h-screen w-screen">
        <b>StartDate : </b>
        <input
            type="date"
            id="startDate"
            min="2024-01-01"
            max={new Date().toISOString().split('T')[0]}
            value={startDate}
            onChange={handleStartDateChange}
        />
        <br></br>
        <b>EndDate : </b>
        <input
            type="date"
            id="endDate"
            min="2024-01-01"
            max={new Date().toISOString().split('T')[0]}
            value={endDate}
            onChange={handleEndDateChange}
        />
        <br></br>
        <button className="h-[2rem] w-[10rem] overflow-hidden"
            onClick={requestArchiveData}
        >
            {'Generate Logs Data'}
        </button>
    </div>
  )
}

export default HistoryLogs