import { axiosFetchAdminData } from "../../../components/api/axios";

const getData = async(currentPage) => {
  try {
    
    const res = await axiosFetchAdminData.post('', {'currentPage': currentPage})
    console.log(res)
    return res

  } catch (error) { 
    console.log("Error fetching data", error);
    return null
  }
}

export { getData }