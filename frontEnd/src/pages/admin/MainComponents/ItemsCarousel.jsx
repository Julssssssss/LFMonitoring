import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = ({ url, currentSlide, onNext, onPrev, onClose }) => {
  const handlePrevClick = (e) => {
    e.stopPropagation();
    onPrev();
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    onNext();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center" onClick={onClose}>
      <button className="bg-black pb-[0.4rem] absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-2xl" onClick={handlePrevClick} type="button">
        &lt;
      </button>
      <div className="max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
        <img src={url[currentSlide]} alt={`Image ${currentSlide + 1}`} className="w-[17rem] h-[17rem] sm:w-[22rem] sm:h-[22rem] md:w-[40rem] md:h-[30rem] object-contain" />
      </div>
      <button className="bg-black pb-[0.4rem] absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl" onClick={handleNextClick} type="button">
        &gt;
      </button>
    </div>
  );
};

const ItemsCarousel = ({ imageUrl, item, handleDelete, handleDeleteLink, enableDeleteButton }) => {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openCarousel = (index, images) => {
    setCurrentSlide(index);
    setCarouselOpen(true);
  };

  const closeCarousel = () => {
    setCarouselOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
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
            <ImageCarousel url={images} currentSlide={currentSlide} onNext={nextSlide} onPrev={prevSlide} onClose={closeCarousel} />
          ) : (
            <Carousel showStatus={false} showThumbs={false}>
              {/* Render images from images array */}
              {images.map((url, index) => (
                <div key={index}>
                  <button onClick={() => openCarousel(index, images)}>
                    <img className='object-contain w-[10rem] h-[9rem] xsm:h-[11rem] sm:w-[12rem] sm:h-[10rem] md:h-[12rem] md:w-[12rem]' src={url} alt={`product-${index}`} />
                  </button>
                  {/* Conditionally render delete button based on enableDeleteButton */}
                  {enableDeleteButton && (
                    <button
                      type="button"
                      className="text-white text-[1rem] bg-red-500 rounded-full absolute top-2 right-1 xsm:top-4 sm:top-1"
                      onClick={() => handleDeleteClick(index, index >= imageUrl.length)}
                    >
                      X
                    </button>
                  )}
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
