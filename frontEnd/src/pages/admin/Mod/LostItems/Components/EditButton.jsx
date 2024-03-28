import { useState, useEffect } from "react";
import { axiosSendUpdate } from "../../../../../components/api/axios";
import UploadingScreen from "../../../../404/UploadingScreen";
import ItemsCarousel from "../../../MainComponents/ItemsCarousel";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-1 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#134083] border-[0.2rem] border-[#F9D62B] shadow-md w-[18rem] h-[31rem] md:w-[24rem] md:h-[38rem] lg:h-[38rem] xl:w-[30rem] xl:h-[45.5rem] rounded-2xl">
        {children}
      </div>
    </div>
  );
};

const EditButton = ({ Info }) => {
  const [files, setFiles] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [item, setItem] = useState([]);
  const [indexToReplace, setIndexToReplace] = useState(0);
  const [cooldownActive, setCooldownActive] = useState(false)

  useEffect (()=>{
    setItem({
      id: Info._id,
      nameItem: Info.nameItem,
      desc: Info.desc,
      found: Info.found,
      surrenderedBy: Info.surrenderedBy,
      url: Info.url,
      datePosted: Info.datePosted,
    })
  }, [Info])

  const showWarning = (message) => {
    alert(message);
  };

  const uploadSuccess = () => {
    alert('Update Complete');
    window.location.reload();
  };

  const checker = async () => {
    try {
      const totalImages = item.url.length + files.length;

      if (
        item.nameItem.trim() === '' ||
        item.desc.trim() === '' ||
        item.found.trim() === '' ||
        item.surrenderedBy.trim() === ''
      ) {
        return showWarning('Please fill out all required fields.');
      } else if (totalImages < 1) {
        return showWarning('Please attach at least one image.');
      } else {
        setConfirm(true);
      }
    } catch (error) {
      console.error('Error during upload:', error);
      showWarning('An error occurred during image upload.');
    }
  };
   

  const saveEdit = async () => {
    setConfirm(false);
  
    try {
        setLoading(true);
        const formData = new FormData();
        formData.append('nameItem', item.nameItem);
        formData.append('desc', item.desc);
        formData.append('found', item.found);
        formData.append('surrenderedBy', item.surrenderedBy);

        for (const oldFile of item.url) {
            formData.append('OldPic', oldFile);
        }

        if (files.length > 0) {
           
            for (const file of files) {
                formData.append('image', file);
            }
        } else {
            console.log('No new images uploaded.');
            
        }
        await axiosSendUpdate.put(`${item.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setLoading(false);
        uploadSuccess();
    } catch (error) {
        console.error('Error during save edit:', error);
    }
};


  const handleDelete = (index) => {
    const newImageUrl = [...imageUrl];
    const newFiles = [...files];

    newFiles.splice(index, 1);
    newImageUrl.splice(index, 1);

    setFiles(newFiles);
    setImageUrl(newImageUrl);
  };

  const handleDeleteLink = (index) => {
    setIndexToReplace(index);
    const newItem = { ...item };
    const newUrlCopy = [...newItem.url];
    newUrlCopy.splice(index, 1);

    setItem({
      ...newItem,
      url: newUrlCopy,
    });
  };

  if (loading) {
    return <UploadingScreen />;
  }
  const enableDeleteButton = true

  const displayPic = () => {
    return item && item.url ? (
      <ItemsCarousel item={item.url} imageUrl={imageUrl} handleDelete={handleDelete} handleDeleteLink={handleDeleteLink} enableDeleteButton={enableDeleteButton}/>
    ) : null;
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="bg-[#F9D62B] hover:bg-[#134083] hover:text-white text-[0.7rem] font-poppins font-bold text-black w-[3.5rem] md:text-[1.2rem] md:w-[5rem] h-auto rounded-full xl:text-[1.5rem] xl:w-[7rem]"
        >
          Edit
        </button>

        {confirm && (
          <Modal isOpen={confirm} onClose={() => setConfirm(false)}>
            <div className="absolute inset-0 flex justify-center bg-black bg-opacity-50">
              <div className="z-50 text-white border-[0.2rem] border-[#F9D62B] text-[1rem] md:text-[2rem] xl:text-[2.2rem] font-poppins place-self-center text-center bg-[#134083] p-[1.5rem] rounded-2xl shadow-md w-[18rem] h-[30rem] md:w-[24rem] md:h-[41rem] lg:h-[38rem] xl:h-[46rem] xl:w-[30rem]">
                <div className="flex flex-col h-[25rem] md:h-full space-y-[5rem] justify-center items-center">
                  <div>Ready to confirm and submit this information?</div>
                  <div className="flex flex-row space-x-[2rem]">
                    <button
                      type="button"
                      className="text-black text-[0.9rem] xl:text-[2rem] bg-[#F9D62B] w-[5rem] h-[2rem] md:w-[8rem] md:h-[3rem] md:text-[1.5rem] rounded-full mr-2"
                      onClick={saveEdit}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="text-white text-[0.9rem] xl:text-[2rem] bg-gray-500 w-[5rem] h-[2rem] md:w-[8rem] md:h-[3rem] md:text-[1.5rem] rounded-full ml-2"
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

        <Modal isOpen={isModalOpen} onClose={closeModal} className="relative z-0">
          <form className="flex flex-col space-y-[0.5rem] xl:space-y-[0.5rem] xl:p-[1rem] items-center p-[0.5rem]">
            <button
              className="w-[2rem] h-[2rem] xl:w-[3rem] xl:h-[3rem] self-end stroke-[#F9D62B] hover:stroke-white"
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
            <div className="h-[10rem] w-[10rem] border-[0.3rem] border-[#F9D62B] rounded-xl p-[0.1rem] flex flex-col justify-center sm:h-[10rem] sm:w-[10rem] md:w-[12rem] md:h-[12rem] lg:w-[12rem] lg:h-[12rem] xl:w-[16rem] xl:h-[16rem]">
              {displayPic()}
            </div>
            
            <input
            type="file"
            className="text-white text-[0.6rem] md:text-[1rem] xl:text-[1.2rem]"
            accept="image/*"
            multiple
            onChange={(e) => {
              const selectedFiles = e.target.files;

              { /*if (selectedFiles.length > 2) {
                alert('Please add or upload no more than 2 images.');
                return;
              }*/}

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

            <div className="flex flex-col font-poppins items-center space-y-[0.2rem] text-white">
              <p className="text-[0.6rem] md:text-[0.9rem] self-start xl:text-[1.1rem]">Name of Item:</p>
              <input
                type="text"
                className="form-control p-[0.2rem] bg-[#17394C] border-[0.2rem] border-[#F9D62B] rounded-md w-[15rem] h-auto text-[0.7rem] md:text-[1rem] md:w-[20rem] xl:w-[23rem] xl:text-[1.1rem]"
                placeholder="Name of item"
                value={item.nameItem}
                onChange={(e) => setItem({ ...item, nameItem: e.target.value })
                }
              />
              <p className="text-[0.6rem] md:text-[0.9rem] self-start xl:text-[1.1rem]">Description:</p>
              <input
                type="text"
                className="bg-[#17394C] p-[0.2rem] border-[0.2rem] border-[#F9D62B] rounded-md w-[15rem] h-auto text-[0.7rem] md:text-[1rem] md:w-[20rem] xl:w-[23rem] xl:text-[1.1rem]"
                placeholder="Description"
                value={item.desc}
                onChange={(e) => setItem({ ...item, desc: e.target.value })}
              />
              <p className="text-[0.6rem] md:text-[0.9rem] self-start xl:text-[1.1rem]">Found at:</p>
              <input
                type="text"
                className="bg-[#17394C] p-[0.2rem] border-[0.2rem] border-[#F9D62B] rounded-md w-[15rem] h-auto text-[0.7rem] md:text-[1rem] md:w-[20rem] xl:w-[23rem] xl:text-[1.1rem]"
                placeholder="Found at"
                value={item.found}
                onChange={(e) => setItem({ ...item, found: e.target.value })}
              />
              <p className="text-[0.6rem] md:text-[0.9rem] self-start xl:text-[1.1rem]">Surrendered by:</p>
              <input
                type="text"
                className="bg-[#17394C] p-[0.2rem] border-[0.2rem] lead-6 border-[#F9D62B] rounded-md w-[15rem] h-auto text-[0.7rem] md:text-[1rem] md:w-[20rem] xl:w-[23rem] xl:text-[1.1rem]"
                placeholder="Surredered by: "
                value={item.surrenderedBy}
                onChange={(e) =>
                  setItem({ ...item, surrenderedBy: e.target.value })
                }
              />
            </div>
            <button
                type="button"
                className="text-black text-[1rem] hover:bg-[#134083] hover:text-white bg-[#F9D62B] w-[8rem] h-auto rounded-full md:text-[1.4rem] xl:text-[1.5rem]"
                onClick={checker}
              >
                SAVE
              </button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default EditButton;
