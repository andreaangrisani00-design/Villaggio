/* =============================================
   VILLAGGIO VILLAMARINA — Main JS
   ============================================= */

/* --- Sticky Header --- */
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      if (header.dataset.transparent === 'true') header.classList.add('transparent');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Nav --- */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileClose = document.querySelector('.mobile-nav-close');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  if (mobileClose) {
    mobileClose.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Scroll Reveal --- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}

/* --- Lightbox --- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
if (lightbox && lightboxImg) {
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      lightboxImg.src = el.dataset.lightbox || el.src || el.querySelector('img')?.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* --- Quote Form --- */
const quoteForm = document.querySelector('.quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = quoteForm.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Richiesta inviata! ✓';
    btn.style.background = '#27ae60';
    btn.disabled = true;
    // Show success message
    const msg = document.createElement('p');
    msg.style.cssText = 'text-align:center;color:#27ae60;font-weight:600;margin-top:1rem';
    msg.textContent = 'Grazie! Ti risponderemo al più presto.';
    quoteForm.appendChild(msg);
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      msg.remove();
      quoteForm.reset();
    }, 5000);
  });
}

/* --- Hero booking bar quick scroll --- */
const heroBookBtn = document.querySelector('.hero-book-btn');
if (heroBookBtn) {
  heroBookBtn.addEventListener('click', () => {
    const section = document.querySelector('#preventivo');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });
}

/* --- Smooth scroll for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* --- Active nav link highlighting --- */
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href && currentPath.includes(href.replace('.html', ''))) {
    link.classList.add('active');
  }
});

/* --- Gallery auto-size fix on load --- */
window.addEventListener('load', () => {
  document.querySelectorAll('.gallery-grid img').forEach(img => {
    if (!img.complete) img.addEventListener('load', () => img.closest('.gallery-item')?.classList.add('loaded'));
    else img.closest('.gallery-item')?.classList.add('loaded');
  });
});
