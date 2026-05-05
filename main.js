/* =========================================
   Muhammad Anas Portfolio — main.js
   ========================================= */

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});
setInterval(() => {
  trail.style.left = mouseX + 'px';
  trail.style.top  = mouseY + 'px';
}, 80);
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0'; trail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1'; trail.style.opacity = '1';
});

// ---- NAV SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

// ---- HAMBURGER ----
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobileMenu');
const mobileLinks  = document.querySelectorAll('.mobile-link');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileLinks.forEach(l => l.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
}));

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ---- TYPED TEXT ----
const roles = [
  'Data Analyst',
  'Network Administration',
  'Web Developer',
  'Computer Science Graduate',
  'Problem Solver'
];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = roles[rIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, cIdx + 1);
    cIdx++;
    if (cIdx === current.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    typedEl.textContent = current.slice(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger children within the same parent
      const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), Math.min(delay, 400));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ---- COUNTER ANIMATION ----
function animateCount(el, target) {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('.stat-num[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target, parseInt(entry.target.dataset.count));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

// ---- SKILL BARS & LANG BARS ----
const barFills = document.querySelectorAll('.sb-fill, .lang-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
barFills.forEach(el => barObserver.observe(el));

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    formNote.textContent = 'Message sent! I\'ll get back to you soon.';
    formNote.style.color = '#22c55e';
    contactForm.reset();
    setTimeout(() => formNote.textContent = '', 5000);
    // To make the form actually send, connect it to EmailJS or Formspree:
    // 1. EmailJS: https://www.emailjs.com/
    // 2. Formspree: change <form> action="https://formspree.io/f/YOUR_ID" method="POST"
  });
}

// ---- ACTIVE NAV HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--neon)' : '';
  });
}, { passive: true });

// ---- GLITCH EFFECT on name (subtle) ----
const heroName = document.querySelector('.hero-name .line2');
if (heroName) {
  setInterval(() => {
    heroName.style.textShadow = '2px 0 rgba(0,200,255,0.4), -2px 0 rgba(0,100,255,0.4)';
    setTimeout(() => heroName.style.textShadow = '', 80);
  }, 4000);
}