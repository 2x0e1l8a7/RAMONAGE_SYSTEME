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
  const previousButton = document.querySelector('.slider-prev');
  const nextButton = document.querySelector('.slider-next');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const autoplayDelay = 5000;
  let current = 0;
  let autoplay;

  slides.forEach((slide, index) => {
    slide.tabIndex = 0;
    slide.setAttribute('role', 'button');
    slide.setAttribute('aria-label', `Afficher la photo ${index + 1}`);
    slide.addEventListener('click', () => {
      goTo(index);
      restartAutoplay();
    });
    slide.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        goTo(index);
        restartAutoplay();
      }
    });

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `slider-dot${index === 0 ? ' is-active' : ''}`;
    dot.setAttribute('aria-label', `Afficher la photo ${index + 1}`);
    dot.addEventListener('click', () => {
      goTo(index);
      restartAutoplay();
    });
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

  function startAutoplay() {
    if (prefersReducedMotion || autoplay) return;
    autoplay = window.setInterval(() => goTo(current + 1), autoplayDelay);
  }

  function stopAutoplay() {
    window.clearInterval(autoplay);
    autoplay = null;
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  previousButton.addEventListener('click', () => {
    goTo(current - 1);
    restartAutoplay();
  });
  nextButton.addEventListener('click', () => {
    goTo(current + 1);
    restartAutoplay();
  });
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', (event) => {
    if (!slider.contains(event.relatedTarget)) startAutoplay();
  });

  startAutoplay();
}
