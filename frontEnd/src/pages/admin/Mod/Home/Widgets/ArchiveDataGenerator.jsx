import { useState } from "react"
import { axiosArchiveDataGeneration } from "../../../../../components/api/axios"

const ArchiveDataGenerator = () => {

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
            await axiosArchiveDataGeneration.post('', {
                startDate:startDate,
                endDate:endDate
            },
            {
                responseType:'blob'
            }
            )
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
    <div className="flex flex-col  space-y-[0.7rem] md:space-y-[0.8rem] md:text-[1.5rem] justify-center items-center md:space-y-[0.5rem] lg:w-auto lg:space-y-[0.7rem] lg:text-[1.3rem] xl:text-[1.6rem] xl:space-y-[1.2rem] 2xl:text-[2.2rem] 2xl:space-y-[2rem]">
        <div className="flex flex-col items-center lg:flex-col w-full gap-[0.5rem] lg:gap-0">
            <b>StartDate : </b>
            <input className="bg-[#0D1832] w-full border-white border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
                type="date"
                id="startDate"
                min="2024-01-01"
                max={new Date().toISOString().split('T')[0]}
                value={startDate}
                onChange={handleStartDateChange}
            />
        </div>
        <div className="flex flex-col items-center lg:flex-col w-full gap-[0.5rem] lg:gap-0">
            <b>EndDate : </b>
            <input className="bg-[#0D1832] w-full border-white border-[0.1rem] hover:bg-[#F9D62B] hover:text-black hover:border-black rounded-full px-[0.2rem]"
                type="date"
                id="endDate"
                min="2024-01-01"
                max={new Date().toISOString().split('T')[0]}
                value={endDate}
                onChange={handleEndDateChange}
            />
        </div>

        <button className="mt-[0.5rem] text-[0.7rem] sm:text-[0.7rem] md:text-[1.4rem] bg-[#F9D62B] hover:bg-[#134083] hover:text-white hover:border-[0.1rem] hover:border-white text-black font-bold rounded-full h-auto w-full p-[0.3rem] md:h-[3rem] lg:h-auto lg:text-[1rem] lg:w-[15rem] xl:text-[1.5rem] xl:w-[20rem] 2xl:text-[2rem] 2xl:w-full overflow-hidden"
            onClick={requestArchiveData}
        >
            Generate Archive Data
        </button>
    </div>
  )
}

export default ArchiveDataGenerator