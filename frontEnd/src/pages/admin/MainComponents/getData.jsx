import { axiosFetchAdminData } from "../../../components/api/axios";

const getData = async() => {
  try {
    
    const res = await axiosFetchAdminData.post()

    const datas = res.data;
    
    const items = datas.items;
    const user = datas.user;
    const pic = datas.picture
    return {user, items, pic,}
  } catch (error) { 
    console.log("Error fetching data", error);
    return null
  }
}

export { getData }