(function () {
  'use strict';

  const nav = document.getElementById('mainNav');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  new Swiper('.hero-swiper', {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    navigation: {
      prevEl: '.hero-swiper .swiper-button-prev',
      nextEl: '.hero-swiper .swiper-button-next',
    },
    pagination: {
      el: '.hero-swiper .swiper-pagination',
      clickable: true,
    },
    a11y: {
      prevSlideMessage: 'Slide anterior',
      nextSlideMessage: 'Slide siguiente',
    },
  });

  new Swiper('#swiper-proximos', {
    loop: true,
    speed: 600,
    spaceBetween: 24,
    slidesPerView: 3,
    grabCursor: true,
    navigation: {
      prevEl: '#swiper-proximos .swiper-button-prev',
      nextEl: '#swiper-proximos .swiper-button-next',
    },
    pagination: {
      el: '#pag-proximos',
      clickable: true,
    },
    breakpoints: {
      0:    { slidesPerView: 1, spaceBetween: 16 },
      480:  { slidesPerView: 1, spaceBetween: 16 },
      768:  { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
    },
    a11y: {
      prevSlideMessage: 'Curso anterior',
      nextSlideMessage: 'Curso siguiente',
    },
  });

  new Swiper('#swiper-destacados', {
    loop: true,
    speed: 600,
    spaceBetween: 24,
    slidesPerView: 3,
    grabCursor: true,
    navigation: {
      prevEl: '#swiper-destacados .swiper-button-prev',
      nextEl: '#swiper-destacados .swiper-button-next',
    },
    pagination: {
      el: '#pag-destacados',
      clickable: true,
    },
    breakpoints: {
      0:    { slidesPerView: 1, spaceBetween: 16 },
      480:  { slidesPerView: 1, spaceBetween: 16 },
      768:  { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
    },
    a11y: {
      prevSlideMessage: 'Curso anterior',
      nextSlideMessage: 'Curso siguiente',
    },
  });

  new Swiper('#swiper-testimonios', {
    loop: true,
    speed: 700,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 32,
    grabCursor: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '#pag-testimonios',
      clickable: true,
    },
    breakpoints: {
      768:  { slidesPerView: 1.25, spaceBetween: 32 },
      1024: { slidesPerView: 1.5,  spaceBetween: 40 },
    },
    a11y: {
      prevSlideMessage: 'Testimonio anterior',
      nextSlideMessage: 'Testimonio siguiente',
    },
  });

  new Swiper('#swiper-blog', {
    loop: true,
    speed: 600,
    spaceBetween: 24,
    slidesPerView: 4,
    grabCursor: true,
    pagination: {
      el: '#pag-blog',
      clickable: true,
    },
    breakpoints: {
      0:    { slidesPerView: 1, spaceBetween: 16 },
      480:  { slidesPerView: 1, spaceBetween: 16 },
      640:  { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
      1280: { slidesPerView: 4, spaceBetween: 24 },
    },
    a11y: {
      prevSlideMessage: 'Artículo anterior',
      nextSlideMessage: 'Artículo siguiente',
    },
  });

  new Swiper('#swiper-alianzas', {
    loop: true,
    speed: 600,
    spaceBetween: 32,
    slidesPerView: 4,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0:    { slidesPerView: 2, spaceBetween: 16 },
      640:  { slidesPerView: 3, spaceBetween: 24 },
      1024: { slidesPerView: 4, spaceBetween: 32 },
    },
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navCollapse = document.getElementById('navMenu');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }

      const offset = nav ? nav.offsetHeight + 8 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  const fadeEls = document.querySelectorAll(
    '.servicio-card, .course-card, .blog-card, .testimonio-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }
})();
