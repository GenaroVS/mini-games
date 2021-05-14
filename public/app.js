const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const rightBtn = document.querySelector('.right');
const leftBtn = document.querySelector('.left');
const nav = document.querySelector('.carousel-nav');
const navBtns = Array.from(nav.children);
const titleHeader = document.querySelector('.game-title')

const slideWidth = slides[0].getBoundingClientRect().width;
let currentIdx = 0;
const gameTitles = ['Tic Tac Toe', 'Minesweeper', 'More coming soon'];

const slideCarousel = (track, target) => {
  track.style.transform = `translateX(-${target.style.left})`;
};

const updateNavStyles = (current, target) => {
  current.classList.remove('current-dot');
  target.classList.add('current-dot');
}

const updateArrows = (index) => {
  if (index === slides.length - 1) {
    rightBtn.style.visibility = 'hidden';
  }
  if (index < slides.length - 1) {
    rightBtn.style.visibility = 'visible';
  }
  if (index === 0) {
    leftBtn.style.visibility = 'hidden';
  }
  if (index > 0) {
    leftBtn.style.visibility = 'visible';
  }
}

leftBtn.addEventListener('click', () => {
  let prev = slides[currentIdx].previousElementSibling
  slideCarousel(track, prev);
  updateNavStyles(navBtns[currentIdx], navBtns[currentIdx - 1]);
  currentIdx -= 1;
  updateArrows(currentIdx);
  titleHeader.textContent = gameTitles[currentIdx];
});

rightBtn.addEventListener('click', () => {
  let next = slides[currentIdx].nextElementSibling
  slideCarousel(track, next);
  updateNavStyles(navBtns[currentIdx], navBtns[currentIdx + 1]);
  currentIdx += 1;
  updateArrows(currentIdx);
  titleHeader.textContent = gameTitles[currentIdx];
});

nav.addEventListener('click', (e) => {
  let currentBtn = navBtns[currentIdx];
  let targetBtn = e.target.closest('button');
  if (!targetBtn) return;
  navBtns.forEach((btn, i) => {
    if (targetBtn === btn) currentIdx = i;
  });

  slideCarousel(track, slides[currentIdx]);
  updateNavStyles(currentBtn, targetBtn);
  updateArrows(currentIdx);
  titleHeader.textContent = gameTitles[currentIdx];
});


slides.forEach((slide, idx) => {
  slide.style.left = slideWidth * idx + 'px';
})

leftBtn.style.visibility = 'hidden';
titleHeader.textContent = gameTitles[0];