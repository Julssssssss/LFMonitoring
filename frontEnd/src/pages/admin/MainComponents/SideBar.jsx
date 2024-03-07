import { Link } from "react-router-dom";

const Sidebar = () => {
    const buttons = [
        { to: '/Admin/Dashboard', name: 'HOME', label: 'Home', svg: (<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>) },
        { to: '/Admin/LostItems', name: 'FOUND ITEMS', label: 'Lost Items', svg: (<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 14H15M4.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V5.6C21 5.03995 21 4.75992 20.891 4.54601C20.7951 4.35785 20.6422 4.20487 20.454 4.10899C20.2401 4 19.9601 4 19.4 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10ZM5 10H19V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H8.2C7.07989 20 6.51984 20 6.09202 19.782C5.71569 19.5903 5.40973 19.2843 5.21799 18.908C5 18.4802 5 17.9201 5 16.8V10Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>) },
        { to: '/Admin/Requests', name: 'REQUESTS', label: 'Requests', svg: (<svg stroke="#ffffff" fill="none" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5,21H19a2,2,0,0,0,2-2V6a3,3,0,0,0-3-3H6A3,3,0,0,0,3,6V19A2,2,0,0,0,5,21ZM5,6A1,1,0,0,1,6,5H18a1,1,0,0,1,1,1v5.5a.5.5,0,0,1-.5.5H15.471a.492.492,0,0,0-.5.407,3,3,0,0,1-5.946,0,.492.492,0,0,0-.5-.407H5.5a.5.5,0,0,1-.5-.5Z"></path></g></svg>) },
        { to: '/Admin/Privilege', name: 'ADMIN', label: 'User Management', svg: (<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 21C4 17.4735 6.60771 14.5561 10 14.0709M19.8726 15.2038C19.8044 15.2079 19.7357 15.21 19.6667 15.21C18.6422 15.21 17.7077 14.7524 17 14C16.2923 14.7524 15.3578 15.2099 14.3333 15.2099C14.2643 15.2099 14.1956 15.2078 14.1274 15.2037C14.0442 15.5853 14 15.9855 14 16.3979C14 18.6121 15.2748 20.4725 17 21C18.7252 20.4725 20 18.6121 20 16.3979C20 15.9855 19.9558 15.5853 19.8726 15.2038ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>) }
    ];

    const role = localStorage.getItem('role')
    if(role !== 'admin'){
        buttons.pop()
        
    }

    function buttonsFormat (){
        return buttons.map((nav, index) =>{
            return(
                <Link to={nav.to} key={index} className="group flex flex-row">
                    <button className='xl:w-[2.5rem] xl:h-[2.5rem] lg:h-[2rem] lg:w-[2rem] 2xl:w-[4rem] 2xl:h-[4rem] group relative flex justify-center'>
                        {nav.svg}
                        <span className="font-poppins lg:-left-[0.9rem] lg:text-[1.7rem] lg:w-[15rem] xl:w-[15rem] xl:p-[0.1rem] absolute left-0 2xl:left-[1rem] 2xl:text-[2.5rem] 2xl:p-[0.5] 2xl:w-[17rem] 3xl:text-[2.5rem] 3xl:w-[18rem] 3xl:-left-[1rem] justify-center whitespace-nowrap flex scale-0 rounded bg-gray-800 p-1 text-[2rem] text-white group-hover:scale-50">{nav.name}</span>
                    </button>
                </Link>
           
        )
        })
    }

  return (
        <>
            <div className="flex flex-col lg:h-screen lg:w-[7rem] xl:h-screen xl:w-[7.5rem] 2xl:w-[11rem] border-r-[0.5rem] border-[#134083] lg:space-y-[1.5rem] lg:rounded-r-[5rem] xl:rounded-r-[6rem] xl:space-y-[2.5rem] 2xl:rounded-r-[8rem] 3xl:rounded-r-[7.5rem] bg-[#0D1832] items-center">
                <img className="xl:w-[4.5rem] xl:h-[4.5rem] xl:m-[2rem] xl:mt-[4rem] lg:w-[3.5rem] lg:h-[3.5rem] lg:mt-[4rem] 2xl:mt-[5rem] 2xl:w-[6rem] 2xl:h-[6rem]" src={'https://iieecsc.files.wordpress.com/2021/09/rizal_technological_university-1.png'} />

                {buttonsFormat()}

                <Link to={'/admin/HlpDocs'} className="absolute bottom-[4rem]">
                    <button className="xl:w-[2.5rem] xl:h-[2.5rem] lg:h-[3rem] lg:w-[3rem] 2xl:w-[4rem] 2xl:h-[4rem] group relative flex justify-center">
                    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" strokeWidth="2"></path> <path d="M10.5 8.67709C10.8665 8.26188 11.4027 8 12 8C13.1046 8 14 8.89543 14 10C14 10.9337 13.3601 11.718 12.4949 11.9383C12.2273 12.0064 12 12.2239 12 12.5V12.5V13" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 16H12.01" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <span className="absolute left-[0rem] scale-0 rounded bg-gray-800 p-1 xl:text-[2rem] font-poppins text-white group-hover:scale-50 2xl:left-[1rem] 2xl:text-[2.5rem] 2xl:p-[0.5] 2xl:w-[17rem]">SUPPORT/HELP</span>
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Sidebar;