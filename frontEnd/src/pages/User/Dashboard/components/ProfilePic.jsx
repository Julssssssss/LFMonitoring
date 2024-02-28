import { Link } from "react-router-dom";


const Profile = ({User}) => {
  return (
    <>
      {/* Parent profile */}
      
      <Link to={{pathname:`/Profile`}}
        state={{User}}
      >
        <div style={{backgroundImage:`url(${User[0].picture})`}} className={`bg-contain cursor-pointer rounded-full bg-center h-[3rem] w-[3rem] absolute z-20`}></div>
      </Link>
    </>
  );
}

export default Profile;