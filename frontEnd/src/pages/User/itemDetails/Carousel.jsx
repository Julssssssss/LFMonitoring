import { useState } from "react";
import { useLocation } from "react-router-dom";

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

const DisplayImage = ({ url, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <img src={url} alt="Item" className="hover:opacity-75 w-[12rem] h-[12rem] xsm:w-[13rem] xsm:h-[13rem] md:h-[14.5rem] md:w-[14.5rem] lg:h-[16rem] lg:h-[16rem] xl:w-[19rem] xl:h-[19rem] 3xl:h-[28rem] 3xl:w-[28rem] bg-[white] border-[1rem] border-[#17394C] object-contain rounded-2xl" />
    </div>
  );
};

const Carousel = () => {
  const location = useLocation();
  const data = location.state && location.state.el; // Check if location.state is defined

  if (!data) {
    // Handle the case where data is not available
    return <div>No data available.</div>;
  }


  const url = data.url || []; // Use an empty array if data.img is undefined

  const [carouselOpen, setCarouselOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openCarousel = () => {
    setCarouselOpen(true);
  };

  const closeCarousel = () => {
    setCarouselOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % url.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + url.length) % url.length);
  };

  return (
    <div>
      {carouselOpen ? (
        <ImageCarousel
          url={url}
          currentSlide={currentSlide}
          onNext={nextSlide}
          onPrev={prevSlide}
          onClose={closeCarousel}
        />
      ) : (
        <DisplayImage url={url[currentSlide]} onClick={openCarousel} />
      )}
    </div>
  );
};

export default Carousel;
