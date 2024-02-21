const Auth = () => {
    
    const role = localStorage.getItem('role')
    const token = localStorage.getItem('accessToken')
    if(token && role){
        if(role==='user'){
            window.location.href = `${import.meta.env.VITE_CLIENT_URL}/dashboard`
        }
        else if(role === 'mod' || role === 'admin'){
            window.location.href = `${import.meta.env.VITE_CLIENT_URL}/Admin/Dashboard`
        }
    }
    else{
        return null
    }
}
export {Auth}