import { useState } from 'react';
import { axiosSendItem } from '../../../components/api/axios';
import UploadingScreen from '../../404/UploadingScreen';
import ItemsCarousel from './ItemsCarousel';


const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-1 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="z-1 bg-[#134083] border-[0.2rem] border-[#F9D62B] shadow-md w-[18rem] h-[30rem] md:w-[24rem] md:h-[37rem] xl:w-[30rem] xl:h-[45rem] rounded-2xl">
        {children}
      </div>
    </div>
  );
};

const AddItem = () => {
  const [files, setFiles] = useState(null);
  const [nameItem, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [found, setFound] = useState('');
  const [surrenderedBy, setSurrenderedBy] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [imageUrl, setImageUrl] = useState([]);
  const [cooldownActive, setCooldownActive] = useState(false)

  const showWarning = (message) => {
    alert(message);
  };

  const forPic = () => {
    alert('Please attach at least one image.');
  };
  const forPic1 = () => {
    alert('Please add or upload no more than 2 images.');
  };

  const uploadSuccess = () => {
    alert('Uploaded');
    window.location.reload();
  };

  const checker = async () => {
    try {
      if (
        nameItem.trim() === '' ||
        desc.trim() === '' ||
        found.trim() === '' ||
        surrenderedBy.trim() === ''
      ) {
        return showWarning('Please fill out all required fields.');
      } else if (!files || !files.length > 1) {
        return forPic();
      } else if (files.length > 2){
        return forPic1();
      }else {
        setConfirm(true);
      }
    } catch (error) {
      console.error('Error during upload:', error);
      showWarning('An error occurred during image upload.');
    }
  };

  const handleConfirmation = async () => {
    if(!cooldownActive){
      setConfirm(false);
      try {
        setLoading(true)
        console.log('hello', files)
        const formData = new FormData();
        formData.append('nameItem', nameItem);
        formData.append('desc', desc);
        formData.append('found', found);
        formData.append('surrenderedBy', surrenderedBy);
    
        if (files && files.length > 0) {
          for (const file of files) {
            formData.append('image', file);
          }
        }

        await axiosSendItem.put(' ', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res=>{
          setLoading(true);
          uploadSuccess();
          console.log('Backend response:', res.data);

          setCooldownActive(true)

            setTimeout(()=>{
              //console.log('hi')
              setCooldownActive(false)
            }, 5000)

        })
      } 
      catch (error) {
        setLoading(false);
        console.error('Error during confirmation:', error);
        showWarning('An error occurred during confirmation.');
      }
    }
  };
  
  const enableDeleteButton = true
  
    const displayPic = () => {
      if (imageUrl.length === 0) {
        return null;
      }
  
      const handleDelete = (index) => {
        const newImageUrl = [...imageUrl];
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        newImageUrl.splice(index, 1);
        setImageUrl(newImageUrl);
      };
  // send the imageUrl to itemsCarousel
      return <ItemsCarousel imageUrl={imageUrl} handleDelete={handleDelete} enableDeleteButton={enableDeleteButton}/>;
    };
   
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    window.location.reload();
    
  };

  if (loading) {
    return <UploadingScreen />;
  }
  return (
    <div>
      <button
        onClick={openModal}
        className="bg-[#F9D62B] font-poppins text-black text-[0.8rem] w-[8rem] h-[1.5rem] md:h-[2rem] md:text-[1rem] xl:text-[1.5rem] xl:h-[3.5rem] xl:w-[10rem] rounded-xl font-bold md:py-1 hover:bg-[#134083] hover:text-white"
      >
        ADD ITEM
      </button>

      {confirm && (
        <Modal isOpen={confirm} onClose={() => setConfirm(false)}>
          <div className="absolute inset-0 z-20 flex place-self-center h-screen w-screen justify-center bg-black bg-opacity-50">
            <div className="absolute z-40 text-white text-[1rem] border-[0.2rem] border-[#F9D62B] md:text-[2.5rem] font-poppins place-self-center text-center bg-[#134083] p-[1rem] rounded-2xl shadow-md w-[18rem] h-[30rem] md:w-[24rem] md:h-[37rem] xl:h-[50rem] xl:w-[30rem]">
              <div className="flex flex-col h-[30rem] md:h-full space-y-[5rem] justify-center items-center">
                <div>Are you sure you want to submit this information?</div>
                <div className="flex flex-row space-x-[2rem]">
                  <button
                    type="button"
                    className="text-black text-[1rem] bg-[#F9D62B] w-[4rem] h-[2rem] md:w-[8rem] md:h-[3rem] md:text-[1.5rem] rounded-full mr-2"
                    onClick={handleConfirmation}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="text-white text-[1rem] bg-gray-500 w-[4rem] h-[2rem] md:w-[8rem] md:h-[3rem] md:text-[1.5rem] rounded-full ml-2"
                    onClick={() => setConfirm(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} className= "relative z-0">
        <form className="flex flex-col space-y-[0.5rem] xl:space-y-[1rem] font-poppins items-center p-[0.5rem]">
        <button
              className="self-end w-[2rem] h-[2rem] xl:w-[3rem] xl:h-[3rem] stroke-[#F9D62B] hover:stroke-white"
              onClick={closeModal}
            >
             <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 14.9802 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
                    
                  ></path>{' '}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                    
                  ></path>{' '}
                </g>
              </svg>
            </button>
          <div className="h-[10rem] w-[10rem] md:w-[14rem] md:h-[14rem] xl:w-[17rem] xl:h-[17rem] border-[0.3rem] border-[#F9D62B] rounded-xl p-[0.1rem] flex flex-col justify-center">
            {displayPic()}
          </div>

          <input
            type="file"
            className="text-white text-[0.6rem] md:text-[1rem] xl:text-[1.2rem]"
            accept="image/*"
            multiple
            onChange={(e) => {
              const selectedFiles = e.target.files;

          { /*   if (selectedFiles.length > 2) {
                alert('Please add or upload no more than 2 images.');
                return;
              }
            */ }
              const newImageUrls = [];
              const newFiles = [];

              const processFile = (file, index) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                  // Add the new URL to the array
                  newImageUrls.push(reader.result);

                  // If all files are processed, update the state with the new arrays
                  if (newImageUrls.length === selectedFiles.length && newFiles.length === selectedFiles.length) {
                    setFiles((prevFiles) => prevFiles ? [...prevFiles, ...newFiles] : newFiles);
                    setImageUrl((prevUrls) => [...prevUrls, ...newImageUrls]);
                  }
                };

                reader.readAsDataURL(file);
              };

              for (const file of selectedFiles) {
                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                  newFiles.push(file);
                  processFile(file, newFiles.length - 1);
                } else {
                  alert('Only JPEG, PNG, and JPG file types are allowed.');
                }
              }
            }}
          />


          <div className="flex flex-col items-center space-y-[1rem] text-white">
            <input
              type="text"
              className="bg-[#17394C] border-[0.2rem] p-[0.1rem] border-[#F9D62B] rounded-md w-[15rem] h-[2rem] text-[0.7rem] md:text-[1.1rem] md:w-[20rem] md:h-auto xl:text-[1.5rem] xl:w-[23rem]"
              placeholder="Name of item"
              value={nameItem}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="bg-[#17394C] border-[0.2rem] p-[0.1rem] border-[#F9D62B] rounded-md w-[15rem] h-[2rem] text-[0.7rem] md:text-[1.1rem] md:w-[20rem] md:h-auto xl:text-[1.5rem] xl:w-[23rem]"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              type="text"
              className="bg-[#17394C] border-[0.2rem] p-[0.1rem] border-[#F9D62B] rounded-md w-[15rem] h-[2rem] text-[0.7rem] md:text-[1.1rem] md:w-[20rem] md:h-auto xl:text-[1.5rem] xl:w-[23rem]"
              placeholder="Found at"
              value={found}
              onChange={(e) => setFound(e.target.value)}
            />
            <input
              type="text"
              className="bg-[#17394C] border-[0.2rem] p-[0.1rem] border-[#F9D62B] rounded-md w-[15rem] h-[2rem] text-[0.7rem] md:text-[1.1rem] md:w-[20rem] md:h-auto xl:text-[1.5rem] xl:w-[23rem]"
              placeholder="Surrendered by: "
              value={surrenderedBy}
              onChange={(e) => setSurrenderedBy(e.target.value)}
            />
            <button
              type="button"
              className="text-black text-[1rem] hover:bg-[#134083] hover:text-white bg-[#F9D62B] w-[10rem] h-[2rem] rounded-full md:text-[1.4rem] md:h-[2.5rem] xl:text-[1.5rem] font-bold"
              onClick={checker}
            >
              ADD
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddItem;