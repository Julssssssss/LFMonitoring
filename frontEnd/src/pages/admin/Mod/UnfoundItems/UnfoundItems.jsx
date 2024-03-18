import { useState } from "react"
import { axiosGetUnfoundItems } from "../../../../components/api/axios"

const UnfoundItems = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const handleUnfoundItemsGeneration = async()=>{
        if(startDate && endDate){
            await axiosGetUnfoundItems.post('', {
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

    //handle range of dates
    const handleStartDateChange = (e) => {
      setStartDate(e.target.value);
    };
  
    const handleEndDateChange = (e) => {
      setEndDate(e.target.value);
    };
  return (
    <div>
        <div className="flex flex-row gap-[0.5rem]">
          <b>StartDate : </b>
          <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
              type="date"
              id="startDate"
              min="2024-01-01"
              max={new Date().toISOString().split('T')[0]}
              value={startDate}
              onChange={handleStartDateChange}
          />
        </div>

        <div className="flex flex-row gap-[1rem]">
          <b>EndDate : </b>
          <input className="bg-[#0D1832] border-[#F9D62B] border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
              type="date"
              id="endDate"
              min="2024-01-01"
              max={new Date().toISOString().split('T')[0]}
              value={endDate}
              onChange={handleEndDateChange}
          />
        </div>

        <button className="h-[2rem] w-[9rem] bg-[#F9D62B] text-black text-[0.9rem] rounded-xl hover:bg-[#134083] hover:text-white"
            onClick={handleUnfoundItemsGeneration}
        >
            Search by Date
        </button>
    </div>
  )
}

export default UnfoundItems