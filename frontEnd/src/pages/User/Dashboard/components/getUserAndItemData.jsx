import { axiosFetchItems } from "../../../../components/api/axios";

const getUserAndItem = async() => {
  try {
    const response = await axiosFetchItems.post()
    return response.data
  } catch (error) { 
    console.log("Error fetching data", error);
    return null
  }
}

export { getUserAndItem }