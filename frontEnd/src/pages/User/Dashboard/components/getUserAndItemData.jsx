import { axiosFetchItems } from "../../../../components/api/axios";

const getUserAndItem = async(currentPage) => {
  try {
    const response = await axiosFetchItems.post('',{'currentPage':currentPage})
    return response.data
  } catch (error) { 
    console.log("Error fetching data", error);
    return null
  }
}

export { getUserAndItem }