import { axiosFetchToken } from "../../../components/api/axios";

const getAccessTokenAndRole = async() => {
    
    try {
        const response = await axiosFetchToken.get();
        const { accessToken, role, TAC } = response.data;
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('role', role)
        return TAC
    } catch (err) {
        console.error(err);
        return null
    }
}


export { getAccessTokenAndRole }