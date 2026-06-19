const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const menuButtons = document.querySelectorAll('.carousel-menu button');
const modal = document.getElementById('layoutModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');
const carousel = document.querySelector(".carousel-container");
const resetTime = 45000; // 45 seconds

let counter = 0;
let size;
let startX = 0;
let endX = 0;
let inactivityTimer;


window.addEventListener("load", () => {
    size = images[0].clientWidth;
    //force a recalc after images fully render
    setTimeout(() => {
        size = images[0].clientWidth;
        slide.style.transform = `translateX(${-size * counter}px)`;
    }, 100);
});

menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const slideIndex = parseInt(btn.dataset.slide);
        counter = slideIndex;
        size = images[0].clientWidth; // recalc just in case
        slide.style.transform = `translateX(${-size * counter}px)`;
    });
});

nextBtn.addEventListener('click', () => {
    size = images[0].clientWidth; // recalc just in case
    if (counter >= images.length - 1) return;
    counter++;
    if (counter > images.length - 1) {
        counter = images.length - 1;
    }
    slide.style.transform = `translateX(${-size * counter}px)`;
});

prevBtn.addEventListener('click', () => {
    size = images[0].clientWidth; // recalc just in case
    counter--;
    if (counter <= 0) {
        counter = 0;
    };
    
    slide.style.transform = `translateX(${-size * counter}px)`;
});

document.querySelectorAll(".carousel-image").forEach(img => {
  img.addEventListener("click", () => {
    const zoomImg = img.getAttribute("data-zoom");
    if (zoomImg) {
      modal.style.display = "block";
      modalImg.src = zoomImg;
    }
  });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = 'none';
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

//touch start

carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

//touch end')
carousel.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = endX - startX;
//swipe right -> previous slide
    if (swipeDistance > 50) {
        prevBtn.click();
    }
//swipe left -> next slide
    if (swipeDistance < -50) {
        nextBtn.click();
    }
}

//Reset timer on any interaction
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(resetToFirstSlide, resetTime);
}

//Listen for touch or click anywhere
document.addEventListener("click", resetInactivityTimer);
document.addEventListener("touchstart", resetInactivityTimer);

//Start timer on load
resetInactivityTimer();

function resetToFirstSlide() {
    counter = 0;
    size = images[0].clientWidth; // recalc just in case
    slide.style.transform = `translateX(0px)`;
}