import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = ({ url, currentSlide, onNext, onPrev, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={onClose}>
      <button
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-2xl"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        &lt;
      </button>
      <div className="max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={url[currentSlide]}
          alt={`Image ${currentSlide + 1}`}
          className="w-[20rem] h-[25rem] object-scale-down"
        />
      </div>
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        &gt;
      </button>
    </div>
  );
};

const ItemsCarousel = ({ imageUrl, item, handleDelete, handleDeleteLink, enableDeleteButton }) => {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openCarousel = () => {
    setCarouselOpen(true);
  };

  const closeCarousel = () => {
    setCarouselOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrl.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + imageUrl.length) % imageUrl.length);
  };

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
        <div>
          {carouselOpen ? (
            <ImageCarousel url={images} currentSlide={currentSlide} onNext={nextSlide} onPrev={prevSlide} onClose={closeCarousel}
            />
          ) : (
            <Carousel showStatus={false} showThumbs={false}>
              {/* Render images from images array */}
              {images.map((url, index) => (
                <div key={index}>
                  <button onClick={() => {
                      setCurrentSlide(index);
                      openCarousel();
                    }}>
                    <img
                      className='object-contain w-[10rem] h-[9rem]'
                      src={url}
                      alt={`product-${index}`}
                    />
                  </button>
                  {/* Call handleDeleteClick with appropriate arguments */}
                  <button
                    type="button"
                    className="text-white text-[1rem] bg-red-500 rounded-full absolute top-2 right-7"
                    onClick={() => handleDeleteClick(index, index >= imageUrl.length)}
                  >
                    X
                  </button>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      )}
    </>
  );
};

export default ItemsCarousel;
