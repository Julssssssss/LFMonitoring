import { Link } from "react-router-dom";

const Sidebar = () => {
    const buttons = [
        { to: '/Admin/Dashboard', name: 'HOME', label: 'HOME', svg: (<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>) },
        { to: '/Admin/LostItems', name: 'ITEMS', label: 'ITEMS', svg: (<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M9 14H15M4.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V5.6C21 5.03995 21 4.75992 20.891 4.54601C20.7951 4.35785 20.6422 4.20487 20.454 4.10899C20.2401 4 19.9601 4 19.4 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10ZM5 10H19V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H8.2C7.07989 20 6.51984 20 6.09202 19.782C5.71569 19.5903 5.40973 19.2843 5.21799 18.908C5 18.4802 5 17.9201 5 16.8V10Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>) },
        { to: '/Admin/Requests', name: 'REQUESTS', label: 'REQUESTS', svg: (<svg fill="none" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5,21H19a2,2,0,0,0,2-2V6a3,3,0,0,0-3-3H6A3,3,0,0,0,3,6V19A2,2,0,0,0,5,21ZM5,6A1,1,0,0,1,6,5H18a1,1,0,0,1,1,1v5.5a.5.5,0,0,1-.5.5H15.471a.492.492,0,0,0-.5.407,3,3,0,0,1-5.946,0,.492.492,0,0,0-.5-.407H5.5a.5.5,0,0,1-.5-.5Z"></path></g></svg>) },
        { to: '/Admin/Privilege', name: 'AUTHORIZATION', label: 'AUTHORIZATION', svg: (<svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4 21C4 17.4735 6.60771 14.5561 10 14.0709M19.8726 15.2038C19.8044 15.2079 19.7357 15.21 19.6667 15.21C18.6422 15.21 17.7077 14.7524 17 14C16.2923 14.7524 15.3578 15.2099 14.3333 15.2099C14.2643 15.2099 14.1956 15.2078 14.1274 15.2037C14.0442 15.5853 14 15.9855 14 16.3979C14 18.6121 15.2748 20.4725 17 21C18.7252 20.4725 20 18.6121 20 16.3979C20 15.9855 19.9558 15.5853 19.8726 15.2038ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>) },
        { to: '/Admin/HistoryLogs', name: 'HISTORY LOGS', label: 'HISTORY LOGS', svg: (<svg fill="#ffffff" className="hover:fill-[#F9D62B]" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M0 24q0 0.832 0.576 1.44t1.44 0.576h1.984q0 2.496 1.76 4.224t4.256 1.76h6.688q-2.144-1.504-3.456-4h-3.232q-0.832 0-1.44-0.576t-0.576-1.408v-20q0-0.832 0.576-1.408t1.44-0.608h16q0.8 0 1.408 0.608t0.576 1.408v7.232q2.496 1.312 4 3.456v-10.688q0-2.496-1.76-4.256t-4.224-1.76h-16q-2.496 0-4.256 1.76t-1.76 4.256h-1.984q-0.832 0-1.44 0.576t-0.576 1.408 0.576 1.44 1.44 0.576h1.984v4h-1.984q-0.832 0-1.44 0.576t-0.576 1.408 0.576 1.44 1.44 0.576h1.984v4h-1.984q-0.832 0-1.44 0.576t-0.576 1.408zM10.016 24h2.080q0-0.064-0.032-0.416t-0.064-0.576 0.064-0.544 0.032-0.448h-2.080v1.984zM10.016 20h2.464q0.288-1.088 0.768-1.984h-3.232v1.984zM10.016 16h4.576q0.992-1.216 2.112-1.984h-6.688v1.984zM10.016 12h16v-1.984h-16v1.984zM10.016 8h16v-1.984h-16v1.984zM14.016 23.008q0 1.824 0.704 3.488t1.92 2.88 2.88 1.92 3.488 0.704 3.488-0.704 2.88-1.92 1.92-2.88 0.704-3.488-0.704-3.488-1.92-2.88-2.88-1.92-3.488-0.704-3.488 0.704-2.88 1.92-1.92 2.88-0.704 3.488zM18.016 23.008q0-2.080 1.44-3.52t3.552-1.472 3.52 1.472 1.472 3.52q0 2.080-1.472 3.52t-3.52 1.472-3.552-1.472-1.44-3.52zM22.016 23.008q0 0.416 0.288 0.704t0.704 0.288h1.984q0.416 0 0.704-0.288t0.32-0.704-0.32-0.704-0.704-0.288h-0.992v-0.992q0-0.416-0.288-0.704t-0.704-0.32-0.704 0.32-0.288 0.704v1.984z"></path> </g></svg>) }

    ];

    const role = localStorage.getItem('role');
    const filteredButtons = role === 'admin' ? buttons : buttons.filter(button => button.name !== 'AUTHORIZATION');

    function buttonsFormat() {
        return filteredButtons.map((nav, index) => {
            return (
                <Link to={nav.to} key={index} className="group flex items-center justify-center border-b-[0.1rem] border-white rounded-xl w-[7rem] h-[2.5rem] xsm:w-[9rem] md:w-[12rem] md:h-[3.5rem] lg:w-0">
                    <div data-tip={nav.name} className="tooltip before:w-[7.5rem] before:bg-[#134083] before:text-white before:font-bold font-poppins before:content-[attr(data-tip)]">
                        <button className='relative z-0 flex space-x-[2rem] text-white items-center stroke-white hover:stroke-[#F9D62B] hover:fill-[#F9D62B] text-[0.6rem] xsm:text-[0.7rem] md:text-[1rem] font-bold justify-start lg:justify-center'>
                            <div className="absolute z-10 w-[1.5rem] h-[1.5rem] md:w-[2.5rem] md:h-[2.5rem] xl:w-[3rem] xl:h-[3rem]">
                                {nav.svg}
                            </div>
                            <div className="w-[5rem] md:w-[10.5rem] lg:invisible lg:w-0">
                                {nav.name}
                            </div>
                        </button>
                    </div>
                </Link>
            );
        });
    }
    

  return (
    <>
    <div className="drawer lg:drawer-open w-[4rem] relative z-1">
        < input id="my-drawer" type="checkbox" className="drawer-toggle " />
        <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className=" drawer-button cursor-pointer lg:invisible">
            <svg className="w-[4rem] h-[4rem] md:w-[7rem] md:h-[7rem] fill-[#F9D62B] hover:fill-white" viewBox="0 0 25.00 25.00" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 11.75C5.08579 11.75 4.75 12.0858 4.75 12.5C4.75 12.9142 5.08579 13.25 5.5 13.25V11.75ZM19.5 13.25C19.9142 13.25 20.25 12.9142 20.25 12.5C20.25 12.0858 19.9142 11.75 19.5 11.75V13.25ZM5.5 7.75C5.08579 7.75 4.75 8.08579 4.75 8.5C4.75 8.91421 5.08579 9.25 5.5 9.25V7.75ZM14.833 9.25C15.2472 9.25 15.583 8.91421 15.583 8.5C15.583 8.08579 15.2472 7.75 14.833 7.75V9.25ZM5.5 15.75C5.08579 15.75 4.75 16.0858 4.75 16.5C4.75 16.9142 5.08579 17.25 5.5 17.25V15.75ZM14.833 17.25C15.2472 17.25 15.583 16.9142 15.583 16.5C15.583 16.0858 15.2472 15.75 14.833 15.75V17.25ZM5.5 13.25H19.5V11.75H5.5V13.25ZM5.5 9.25H14.833V7.75H5.5V9.25ZM5.5 17.25H14.833V15.75H5.5V17.25Z"></path> </g></svg>
        </label>
    </div> 

    <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className=" space-y-[1rem] menu p-2 w-[50%] border-r-[0.2rem] border-[#134083] rounded-r-[6rem] md:rounded-r-[10rem] lg:rounded-r-[6rem] h-screen bg-[#0D1832] flex flex-col items-center pt-[2rem] lg:w-[8rem] xl:w-[10rem]">
            <img className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] lg:w-[5rem] lg:h-[5rem] xl:w-[7rem] xl:h-[7rem]" src='https://res.cloudinary.com/dxjpbwlkh/image/upload/v1709912489/Assets/rtu_logo_5_yz5e6k.png'/>
                <div className="flex flex-col space-y-[0.5rem] md:space-y-[1rem] xl:space-y-[1.5rem]">
                    {buttonsFormat()}
                </div>
                {/*still working on manual user*/}
                <Link to={'/Admin/UserManual'} className="absolute bottom-[4.5rem] lg:bottom-[3rem] flex items-center justify-center border-b-[0.1rem] border-white rounded-xl w-[7rem] h-[2.5rem] xsm:w-[9rem] md:w-[12rem] md:h-[3.5rem] lg:w-0">
                    <div data-tip='USER MANUAL' className="tooltip before:w-[7.5rem] before:bg-[#134083] before:text-white before:font-bold font-poppins before:content-[attr(data-tip)]">
                        <button className='relative flex space-x-[2rem] text-white items-center stroke-white hover:stroke-[#F9D62B] text-[0.6rem] xsm:text-[0.7rem] md:text-[1rem] md:w-[12rem] md:h-[3.5rem] lg:w-0 lg:justify-center font-bold justify-start'>
                            <svg className="absolute z-10 w-[1.5rem] h-[1.5rem] md:w-[2.5rem] md:h-[2.9rem] xl:w-[3.8rem] xl:h-[4rem]" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="2"></path> <path d="M10.5 8.67709C10.8665 8.26188 11.4027 8 12 8C13.1046 8 14 8.89543 14 10C14 10.9337 13.3601 11.718 12.4949 11.9383C12.2273 12.0064 12 12.2239 12 12.5V12.5V13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 16H12.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <div className="w-[5rem] md:w-[10.5rem] lg:invisible">
                                SUPPORT/HELP
                            </div>
                        </button>
                    </div>
  </Link>
           
        </ul>
        </div>
    </div>

</>








           
    );
};

export default Sidebar;