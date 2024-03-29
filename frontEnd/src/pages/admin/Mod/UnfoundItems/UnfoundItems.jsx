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
    <div className="text-white md:text-[1.5rem] xl:text-[1.9rem] font-poppins h-auto w-full px-[5rem] flex flex-col justify-center items-center">
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
            <button className="text-[0.8rem] font-bold rounded-full hover:bg-[#134083] hover:text-white hover:border-[0.1rem] border-[0.1rem] hover:border-white h-[2rem] w-[12rem] overflow-hidden bg-[#F9D62B] md:text-[1.5rem] md:w-auto md:h-auto lg:text-[1rem] lg:w-[15rem] text-black p-[0.5rem]"
                onClick={handleUnfoundItemsGeneration}
            >
                {'Generate Unclaimed Items'}
            </button>
          
        </div>
  )
}

export default UnfoundItems