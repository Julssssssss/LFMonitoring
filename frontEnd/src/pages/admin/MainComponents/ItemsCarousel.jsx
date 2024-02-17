import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const ItemsCarousel = ({ imageUrl, item, handleDelete, handleDeleteLink, enableDeleteButton }) => {
 
  const handleDeleteClick = (index, isItem) => {
    if (enableDeleteButton) {
      if (isItem) {
        handleDeleteLink(index);
      } else {
        handleDelete(index);
      }
    } else {
      alert('Cannot modify. Delete button disabled.');
    }
  };

  // Combine imageUrl and item into a single array
  const images = imageUrl ? [...imageUrl] : [];
  if (item && Array.isArray(item)) {
    images.push(...item);
  }

  return (
    <>
      {images.length > 0 && (
        <Carousel showStatus={false} showThumbs={false}>
          {/* Render images from images array */}
          {images.map((url, index) => (
            <div key={index}>
              <img className='object-contain w-[25rem] h-[15rem]' src={url} alt={`product-${index}`} />
              {/* Call handleDeleteClick with appropriate arguments */}
              <button
                type="button"
                className="text-white text-[1rem] bg-red-500 rounded-full absolute top-2 right-7"
                onClick={() => handleDeleteClick(index, index >= (imageUrl ? imageUrl.length : 0))}

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