  // carousal moving
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const itemWidth = items[0].offsetWidth; // Get the width of one item
  let currentIndex = 0;
//changing slide
  function slideTo(index) {
    currentIndex = index;
    const newPosition = -currentIndex * itemWidth;
    track.style.transform = `translateX(${newPosition}px)`;
  }
//csetting index
  function slideNext() {
    if (currentIndex < items.length -2) {
      slideTo(currentIndex + 1);
    } else {
      slideTo(0); // Wrap around to the first item
    }
  }
//slide logic
  function slidePrev() {
    if (currentIndex > 0) {
      slideTo(currentIndex - 1);
    } else {
      slideTo(items.length - 1); // Wrap around to the last item
    }
  }

  setInterval(() => {
    slideNext();
  }, 3000);