const slider = document.querySelector('[data-slider]');

const video = document.querySelector('.video-frame video');
if (video) {
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.play().catch(() => {});
}

if (slider) {
  const slides = [...slider.querySelectorAll('.slide')];
  const track = slider.querySelector('.slider-track');
  const dotsWrap = document.querySelector('.slider-dots');
  const counter = document.querySelector('.slider-counter strong');
  let current = 0;

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `slider-dot${index === 0 ? ' is-active' : ''}`;
    dot.setAttribute('aria-label', `Afficher la photo ${index + 1}`);
    dot.addEventListener('click', () => goTo(index));
    dotsWrap.append(dot);
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    const gap = window.innerWidth <= 560 ? 8 : window.innerWidth <= 800 ? 6 : 3.5;
    const visibleWidth = window.innerWidth <= 560 ? 82 : window.innerWidth <= 800 ? 47 : 31;
    track.style.transform = `translateX(-${current * (visibleWidth + gap)}%)`;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === current));
    dotsWrap.querySelectorAll('.slider-dot').forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === current));
    counter.textContent = String(current + 1).padStart(2, '0');
  }

  document.querySelector('.slider-prev').addEventListener('click', () => goTo(current - 1));
  document.querySelector('.slider-next').addEventListener('click', () => goTo(current + 1));
}
