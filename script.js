const sweperWrapper = document.querySelector('.sweper-wrapper');
const sweperSlider = document.querySelectorAll('.sweper-slider');

let currentIndex = 0;
let intervalID = null;

function moveSweperSlider() {
  const sweperSliderWidth = sweperSlider[currentIndex].offsetWidth;
  const offsets = -currentIndex * sweperSliderWidth;
  sweperWrapper.style.transform = `translateX(${offsets}px)`;
}

function startInterval() {
  intervalID = setInterval(() => {
    if (currentIndex < sweperSlider.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    moveSweperSlider();
  }, 3500);
}

startInterval();

sweperSlider.forEach((slider) => {
  slider.addEventListener('mouseenter', () => {
    clearInterval(intervalID);
  });

  slider.addEventListener('mouseleave', () => {
    startInterval();
  });

  let touchstartX = 0;
  let touchendX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchstartX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    touchendX = e.changedTouches[0].clientX;
    handleSwipe(slider);
  });

  function handleSwipe(slider) {
    const minSwipeDistance = 50; // Jarak minimum untuk dianggap sebagai swipe

    const swipeDistance = touchendX - touchstartX;

    if (swipeDistance > minSwipeDistance) {
      // Swipe ke kanan (ke slide sebelumnya)
      currentIndex = [...sweperSlider].indexOf(slider);
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = sweperSlider.length - 1;
      }
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe ke kiri (ke slide berikutnya)
      currentIndex = [...sweperSlider].indexOf(slider);
      if (currentIndex < sweperSlider.length - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }

    moveSweperSlider();
  }
});
// Fungsi untuk mengatur gambar latar belakang slider
function setSliderBackground() {
  sweperSlider.forEach((slider, index) => {
    const imageUrl = slider.getAttribute('data-image');
    slider.style.backgroundImage = `url(${imageUrl})`;
  });
}

// Panggil fungsi untuk mengatur gambar latar belakang slider
setSliderBackground();

const slider = document.querySelector('.slider');
const leftButton = document.getElementById('prevBtn');
const rightButton = document.getElementById('nextBtn');
const slideList = document.querySelectorAll('.slide');
let index = 0;
console.log(slideList.length);

rightButton.addEventListener('click', () => {
  if (index < slideList.length - 1) {
    index++;
  } else {
    index = 0;
  }
  moveSlider();
});

leftButton.addEventListener('click', () => {
  if (index > 0) {
    index--;
  } else {
    index = slideList.length - 1;
  }
  moveSlider();
});

function moveSlider() {
  const slideWidth = slideList[index].offsetWidth;
  const offset = -index * slideWidth;
  slider.style.transform = `translateX(${offset}px)`;
}

// const intervalID4 = setInterval(() => {
//   if (index < slideList.length - 1) {
//     index++;
//   } else {
//     index = 0;
//   }
//   moveSlider();
// }, 2000);
