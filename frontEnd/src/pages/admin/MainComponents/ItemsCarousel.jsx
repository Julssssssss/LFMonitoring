import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ItemsCarousel = ({ imageUrl, item, handleDelete, handleDeleteLink }) => {
  console.log('imageUrl:', imageUrl);
  console.log('item:', item);

  const handleDeleteClick = (index, isItem) => {
    if (isItem) {
      handleDeleteLink(index);
    } else {
      handleDelete(index);
    }
  };

  // If imageUrl is blank or empty, set it to null
  const processedImageUrl = imageUrl && imageUrl.length > 0 ? imageUrl : null;

  return (
    <>
      {processedImageUrl && processedImageUrl.length > 0 && (
        <Carousel showStatus={false} showThumbs={false}>
          {/* Render images from processedImageUrl */}
          {processedImageUrl.map((url, index) => (
            <div key={index}>
              <img className='object-contain w-[25rem] h-[15rem]' src={url} alt={`product-${index}`} />
              <button
                type="button"
                className="text-white text-[1rem] bg-red-500 rounded-full absolute top-2 right-7"
                onClick={() => handleDeleteClick(index, false)}
              >
                X
              </button>
            </div>
          ))}
        </Carousel>
      )}

      {/* Check if item is defined and an array before mapping */}
      {item && Array.isArray(item) && item.length > 0 && (
        <Carousel showStatus={false} showThumbs={false}>
          {item.map((url, index) => (
            <div key={index}>
              <img className='object-contain w-[25rem] h-[15rem]' src={url} alt={`product-${index}`} />
              <button
                type="button"
                className="text-white text-[1rem] bg-red-500 rounded-full absolute top-2 right-7"
                onClick={() => handleDeleteClick(index, true)}
              >
                X
              </button>
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ItemsCarousel;
