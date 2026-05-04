const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const yearElement = document.querySelector('[data-year]');

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

const heroCarousel = document.querySelector('.parts-carousel');

if (heroCarousel) {
  const track = heroCarousel.querySelector('.carousel-track');
  const slides = heroCarousel.querySelectorAll('.carousel-slide');
  const dotsContainer = heroCarousel.querySelector('.carousel-dots');
  const prevBtn = heroCarousel.querySelector('.carousel-btn--prev');
  const nextBtn = heroCarousel.querySelector('.carousel-btn--next');
  const total = slides.length;
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Imagem ${i + 1} de ${total}`);
    dot.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4500);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  heroCarousel.addEventListener('mouseenter', () => clearInterval(timer));
  heroCarousel.addEventListener('mouseleave', resetTimer);

  heroCarousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { goTo(current - 1); resetTimer(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetTimer(); }
  });

  resetTimer();
}
