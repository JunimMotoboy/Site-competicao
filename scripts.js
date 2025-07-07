
  const track = document.querySelector('.carousel-track');
  const leftBtn = document.querySelector('.arrow.left');
  const rightBtn = document.querySelector('.arrow.right');

  let currentIndex = 0;
  const cardWidth = 140; // Largura do card + gap

  rightBtn.addEventListener('click', () => {
    const totalCards = track.children.length;
    const visible = Math.floor(track.parentElement.offsetWidth / cardWidth);
    if (currentIndex < totalCards - visible) {
      currentIndex++;
      updateCarousel();
    }
  });

  leftBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  function updateCarousel() {
    const offset = currentIndex * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

