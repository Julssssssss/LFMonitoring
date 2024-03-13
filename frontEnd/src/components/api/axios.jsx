import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const baseUrl = `${import.meta.env.VITE_API_URL}`;
const accessToken = localStorage.getItem('accessToken')

const logout =()=>{
    window.open(
        `${import.meta.env.VITE_API_URL}/auth/logout`, "_self"
    )
    localStorage.clear()
}

//get
const axiosFetchToken = axios.create({
    baseURL: `${baseUrl}/auth/login/success`,
});

//post kasi eto na mga need mo pakita token e
const axiosFetchItems = axios.create({
    baseURL: `${baseUrl}/prot/data`,
    headers:{
        'authorization': `Bearer ${accessToken}`
    }
});

axiosFetchItems.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        try
            {    if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    return axiosReFetchToken.post()
                        .then(response => {
                            const newAccessToken = response.data.accessToken;
                            const temp = JSON.stringify(newAccessToken)
                            localStorage.setItem('accessToken', temp);
                            originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                            return axiosFetchItems(originalRequest);
                        });
                }
                else if (error.response.status === 401) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
                    
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
                else if (error.response.status === 404) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                    logout()
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
            } 
            catch (e){
                console.log(e)
                logout()
                return Promise.resolve()
            }

        return Promise.reject(error);
    }
);

const axiosFetchAdminData = axios.create({
    baseURL: `${baseUrl}/priv/data`,
        headers:{
        'authorization': `Bearer ${accessToken}`
    }
});

axiosFetchAdminData.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        try
            {    if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    return axiosReFetchToken.post()
                        .then(response => {
                            const newAccessToken = response.data.accessToken;
                            const temp = JSON.stringify(newAccessToken)
                            localStorage.setItem('accessToken', temp);
                            originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                            return axiosFetchAdminData(originalRequest);
                        });
                }
                else if (error.response.status === 401) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
                    
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
                else if (error.response.status === 404) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                    logout()
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
            } 
            catch (e){
                console.log(e)
                logout()
                return Promise.resolve()
            }

        return Promise.reject(error);
    }
);

const axiosReFetchToken = axios.create({
    baseURL: `${baseUrl}/auth/refreshToken`,
});

axiosReFetchToken.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        try
            {  
                if (error.response.status === 403) {
                    logout()
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}`;
                    
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
                else if (error.response.status === 401) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
                    
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
            } 
            catch (e){
                console.log(e)
                logout()
                return Promise.resolve()
            }

        return Promise.reject(error);
    }
)

//mod side

const axiosSendItem = axios.create({
    baseURL: `${baseUrl}/priv/sendItem`,
    headers:{
        'authorization': `Bearer ${accessToken}`
    }
});

axiosSendItem.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      try{    
          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axiosReFetchToken.post()
                .then(response => {
                    const newAccessToken = response.data.accessToken;
                    const temp = JSON.stringify(newAccessToken)
                    localStorage.setItem('accessToken', temp);
                    originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axiosSendItem(originalRequest);
                });
            }
            else if (error.response.status === 401) {
              window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
              
              return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
            else if (error.response.status === 404) {
                window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                logout()
                return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
        } 
        catch (e){
            console.log(e)
            logout()
            return Promise.resolve()
        }

      return Promise.reject(error);
    }
  );

const axiosUpdateImage = axios.create({
    baseURL: `${baseUrl}/priv/update/image`,
    headers:{
        'authorization': `Bearer ${accessToken}`
    }
});

axiosUpdateImage.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      try{    
          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axiosReFetchToken.post()
                .then(response => {
                    const newAccessToken = response.data.accessToken;
                    const temp = JSON.stringify(newAccessToken)
                    localStorage.setItem('accessToken', temp);
                    originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axiosUpdateImage(originalRequest);
                });
            }
            else if (error.response.status === 401) {
              window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
              
              return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
            else if (error.response.status === 404) {
                window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                logout()
                return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
        } 
        catch (e){
            console.log(e)
            logout()
            return Promise.resolve()
        }

      return Promise.reject(error);
    }
  );

const axiosSendUpdate = axios.create({
    baseURL: `${baseUrl}/priv/update/data`,
    headers:{
        'authorization': `Bearer ${accessToken}`
    }
});

axiosSendUpdate.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      try{    
          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axiosReFetchToken.post()
                .then(response => {
                    const newAccessToken = response.data.accessToken;
                    const temp = JSON.stringify(newAccessToken)
                    localStorage.setItem('accessToken', temp);
                    originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axiosSendUpdate(originalRequest);
                });
            }
            else if (error.response.status === 401) {
              window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
              
              return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
            else if (error.response.status === 404) {
                window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                logout()
                return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
        } 
        catch (e){
            console.log(e)
            logout()
            return Promise.resolve()
        }

      return Promise.reject(error);
    }
  );

const axiosUnclaimedItems = axios.create({
    baseURL: `${baseUrl}/priv/archive/UnclaimedItems`,
    headers:{
        'authorization': `Bearer ${accessToken}`
    }
})

axiosUnclaimedItems.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      try{    
          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axiosReFetchToken.post()
                .then(response => {
                    const newAccessToken = response.data.accessToken;
                    const temp = JSON.stringify(newAccessToken)
                    localStorage.setItem('accessToken', temp);
                    originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axiosUnclaimedItems(originalRequest);
                });
            }
            else if (error.response.status === 401) {
              window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
              
              return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
            else if (error.response.status === 404) {
                window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                logout()
                return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
        } 
        catch (e){
            console.log(e)
            logout()
            return Promise.resolve()
        }

      return Promise.reject(error);
    }
  );

const axiosDeleteItem = axios.create({
    baseURL: `${baseUrl}/priv/delete`,
    headers:{
        'authorization': `Bearer ${accessToken}`
    }
});
//403 catcher
axiosDeleteItem.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      try{    
          if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axiosReFetchToken.post()
                .then(response => {
                    const newAccessToken = response.data.accessToken;
                    const temp = JSON.stringify(newAccessToken)
                    localStorage.setItem('accessToken', temp);
                    originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axiosDeleteItem(originalRequest);
                });
            }
            else if (error.response.status === 401) {
              window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
              
              return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
            else if (error.response.status === 404) {
                window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                logout()
                return Promise.resolve(); // Returning a resolved promise to stop further processing
            }
        } 
        catch (e){
            console.log(e)
            logout()
            return Promise.resolve()
        }

      return Promise.reject(error);
    }
  );

const axiosGetReqList = axios.create({
    baseURL: `${baseUrl}/priv/reqList`,
    headers:{
        'authorization': `Bearer ${accessToken}`
    }
})

axiosGetReqList.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        try
            {    if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    return axiosReFetchToken.post()
                        .then(response => {
                            const newAccessToken = response.data.accessToken;
                            const temp = JSON.stringify(newAccessToken)
                            localStorage.setItem('accessToken', temp);
                            originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                            return axiosGetReqList(originalRequest);
                        });
                }
                else if (error.response.status === 401) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
                    
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
                else if (error.response.status === 404) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                    logout()
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
            } 
            catch (e){
                console.log(e)
                logout()
                return Promise.resolve()
            }

        return Promise.reject(error);
    }
);

//send email
const axiosSendEmail = axios.create({
    baseURL: `${baseUrl}/priv/sendEmail`,
    headers:{
        'authorization': `Bearer ${accessToken}`
    }
});

axiosSendEmail.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        try
            {    if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    return axiosReFetchToken.post()
                        .then(response => {
                            const newAccessToken = response.data.accessToken;
                            const temp = JSON.stringify(newAccessToken)
                            localStorage.setItem('accessToken', temp);
                            originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                            return axiosSendEmail(originalRequest);
                        });
                }
                else if (error.response.status === 401) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
                    
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
                else if (error.response.status === 404) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                    logout()
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
            } 
            catch (e){
                console.log(e)
                logout()
                return Promise.resolve()
            }

        return Promise.reject(error);
    }
);

const axiosDeleteReq = axios.create({
    baseURL: `${baseUrl}/priv/delReq`,
    headers:{
        'authorization': `Bearer ${accessToken}`
    }
});

axiosDeleteReq.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        try
            {    if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    return axiosReFetchToken.post()
                        .then(response => {
                            const newAccessToken = response.data.accessToken;
                            const temp = JSON.stringify(newAccessToken)
                            localStorage.setItem('accessToken', temp);
                            originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                            return axiosDeleteReq(originalRequest);
                        });
                }
                else if (error.response.status === 401) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
                    
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
                else if (error.response.status === 404) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                    logout()
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
            } 
            catch (e){
                console.log(e)
                //logout()
                return Promise.resolve()
            }

        return Promise.reject(error);
    }
);

const axiosFetchArchLength = axios.create({
    baseURL: `${baseUrl}/priv/archiveLength`,
    headers:{
        'authorization': `Bearer ${accessToken}`
    }
});

axiosFetchArchLength.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        try
            {    if (error.response.status === 403 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    return axiosReFetchToken.post()
                        .then(response => {
                            const newAccessToken = response.data.accessToken;
                            const temp = JSON.stringify(newAccessToken)
                            localStorage.setItem('accessToken', temp);
                            originalRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                            return axiosFetchArchLength(originalRequest);
                        });
                }
                else if (error.response.status === 401) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/401`;
                    
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
                else if (error.response.status === 404) {
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/`;
                    logout()
                    return Promise.resolve(); // Returning a resolved promise to stop further processing
                }
            } 
            catch (e){
                console.log(e)
                //logout()
                return Promise.resolve()
            }

        return Promise.reject(error);
    }
);



export {axiosFetchArchLength, axiosDeleteReq, axiosGetReqList, axiosFetchToken, axiosFetchItems, axiosReFetchToken, axiosSendItem, axiosSendUpdate, axiosUpdateImage, axiosUnclaimedItems, axiosDeleteItem, axiosFetchAdminData, axiosSendEmail};