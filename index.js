const initSlider = () => {
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const sliderScrollbar =document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb =document.querySelector(".container .slider-scrollbar .scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  scrollbarThumb.addEventListener('mousedown', (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    //handle scrollbar position
    const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;


        const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
        const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

        scrollbarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft = scrollPosition;
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove' , handleMouseMove);
        document.removeEventListener('mouseup' , handleMouseUp);
        }

    document.addEventListener('mousemove' , handleMouseMove);
    document.addEventListener('mouseup' , handleMouseUp);
  });
  

  //Slide images when button is clicked
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  //Show-hide buttons
  const handleSlideButtons = () => {
    slideButtons[0].style.display =
      imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
  }

  //Update scrollThumb position

  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;

  }

  imageList.addEventListener("scroll", () => {
    handleSlideButtons();
    updateScrollThumbPosition()
  });

}

window.addEventListener("load", initSlider);
