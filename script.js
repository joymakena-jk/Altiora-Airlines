/*==================================================
    ALTIORA AIRLINES — MAIN SCRIPT
==================================================*/

document.addEventListener('DOMContentLoaded', () => {

  initLoader();
  initHeroTyping();
  initParticles();
  initCursorGlow();
  initNav();
  initScrollReveal();
  initStatCounters();
  initLightbox();
  initTestimonialSlider();
  initBookingModal();
  initDestinationButtons();
  initFooterYear();
  initExploreButton();

});

/*==================================================
    HERO — EXPLORE DESTINATIONS BUTTON
==================================================*/
function initExploreButton(){
  const btn = document.getElementById('exploreDestinations');
  const target = document.getElementById('destinations');
  if(!btn || !target) return;

  btn.addEventListener('click', () => {
    target.scrollIntoView({ behavior: 'smooth' });
  });
}

/*==================================================
    LOADER
==================================================*/
function initLoader(){

  const loader = document.getElementById('loader');
  if(!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loader-hidden');
      setTimeout(() => loader.remove(), 700);
    }, 400);
  });
}

/*==================================================
    HERO TITLE TYPING EFFECT
==================================================*/
function initHeroTyping(){

  const target = document.getElementById('heroTitle');
  if(!target) return;

  const text = 'Beyond Horizons';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduceMotion){
    target.textContent = text;
    return;
  }

  let i = 0;
  target.setAttribute('aria-label', text);
  const type = () => {
    if(i <= text.length){
      target.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 55);
    } else {
      target.classList.add('typing-done');
    }
  };
  setTimeout(type, 600);
}

/*==================================================
    FLOATING PARTICLES
==================================================*/
function initParticles(){

  const field = document.getElementById('particles');
  if(!field) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  const count = window.innerWidth < 768 ? 10 : 22;

  for(let n = 0; n < count; n++){
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (10 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    p.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2);
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    field.appendChild(p);
  }
}

/*==================================================
    CURSOR GLOW (desktop / fine-pointer only)
==================================================*/
function initCursorGlow(){

  const glow = document.querySelector('.cursor-glow');
  if(!glow) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if(!canHover){
    glow.style.display = 'none';
    return;
  }

  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    glow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => glow.classList.remove('active'));
}

/*==================================================
    NAVIGATION — mobile toggle + scroll shrink
==================================================*/
function initNav(){

  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');

  if(toggle && links){
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Toggle navigation menu');

    const toggleMenu = () => {
      const isOpen = links.classList.toggle('active');
      toggle.textContent = isOpen ? '✕' : '☰';
      toggle.setAttribute('aria-expanded', String(isOpen));
    };

    toggle.addEventListener('click', toggleMenu);
    toggle.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggleMenu();
      }
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('active');
        toggle.textContent = '☰';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if(nav){
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Highlight active section link
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  if(sections.length && navAnchors.length && 'IntersectionObserver' in window){
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          navAnchors.forEach(a => a.classList.remove('current'));
          const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if(match) match.classList.add('current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(s => spy.observe(s));
  }
}

/*==================================================
    SCROLL REVEAL (fade-up sections)
==================================================*/
function initScrollReveal(){

  const targets = document.querySelectorAll('.fade-up');
  if(!targets.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion){
    targets.forEach(t => t.classList.add('visible'));
    return;
  }

  if(!('IntersectionObserver' in window)){
    targets.forEach(t => t.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(t => observer.observe(t));
}

/*==================================================
    HERO STAT COUNTERS (120+, 28M)
==================================================*/
function initStatCounters(){

  const stats = document.querySelectorAll('.hero-stats h2');
  if(!stats.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animate = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^([\d.]+)(.*)$/);
    if(!match){ return; } // e.g. the star rating, leave untouched

    const target = parseFloat(match[1]);
    const suffix = match[2];

    if(reduceMotion){
      el.textContent = target + suffix;
      return;
    }

    let current = 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      current = target * (1 - Math.pow(1 - progress, 3));
      const display = target % 1 === 0 ? Math.round(current) : current.toFixed(1);
      el.textContent = display + suffix;
      if(progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(s => observer.observe(s));
  } else {
    stats.forEach(animate);
  }
}

/*==================================================
    IMAGE LIGHTBOX — destinations, cabins, fleet
==================================================*/
function initLightbox(){

  const selectors = '.destination-image img, .cabin-image img, .fleet-card img';
  const images = document.querySelectorAll(selectors);
  if(!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close image preview">&times;</button>
    <figure class="lightbox-figure">
      <img src="" alt="" class="lightbox-img">
      <figcaption class="lightbox-caption"></figcaption>
    </figure>
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lightbox-img');
  const captionEl = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');

  const open = (src, alt) => {
    imgEl.src = src;
    imgEl.alt = alt || '';
    captionEl.textContent = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const close = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  images.forEach(img => {
    img.classList.add('clickable-img');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `View larger image of ${img.alt || 'photo'}`);

    img.addEventListener('click', () => open(img.src, img.alt));
    img.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        open(img.src, img.alt);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if(e.target === overlay) close();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && overlay.classList.contains('active')) close();
  });
}

/*==================================================
    TESTIMONIAL SLIDER
==================================================*/
function initTestimonialSlider(){

  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  if(!cards.length || !dots.length) return;

  let index = 0;
  let timer = null;

  const show = (i) => {
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    cards[i].classList.add('active');
    dots[i].classList.add('active');
    index = i;
  };

  const next = () => show((index + 1) % cards.length);

  const startAuto = () => {
    stopAuto();
    timer = setInterval(next, 6000);
  };
  const stopAuto = () => { if(timer) clearInterval(timer); };

  dots.forEach((dot, i) => {
    dot.setAttribute('role', 'button');
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
    dot.addEventListener('click', () => { show(i); startAuto(); });
    dot.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        show(i);
        startAuto();
      }
    });
  });

  const slider = document.querySelector('.testimonial-slider');
  if(slider){
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
  }

  startAuto();
}

/*==================================================
    BOOKING MODAL — Book Flight buttons
==================================================*/
function initBookingModal(){

  const triggers = [
    document.getElementById('bookFlight'),
    document.getElementById('navBook'),
    ...document.querySelectorAll('.journey-overlay button'),
    ...document.querySelectorAll('.contact button')
  ].filter(Boolean);

  if(!triggers.length) return;

  const modal = document.createElement('div');
  modal.className = 'booking-modal-overlay';
  modal.innerHTML = `
    <div class="booking-modal" role="dialog" aria-modal="true" aria-labelledby="bookingTitle">
      <button class="booking-close" aria-label="Close booking form">&times;</button>
      <h3 id="bookingTitle">Book Your Flight</h3>
      <p class="booking-sub">Tell us where you'd like to go and we'll take care of the rest.</p>
      <form id="bookingForm">
        <div class="booking-row">
          <div class="booking-field">
            <label for="fromCity">From</label>
            <input type="text" id="fromCity" placeholder="Departure city" required>
          </div>
          <div class="booking-field">
            <label for="toCity">To</label>
            <input type="text" id="toCity" placeholder="Destination city" required>
          </div>
        </div>
        <div class="booking-row">
          <div class="booking-field">
            <label for="departDate">Departure</label>
            <input type="date" id="departDate" required>
          </div>
          <div class="booking-field">
            <label for="cabinClass">Cabin</label>
            <select id="cabinClass">
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
        </div>
        <button type="submit" class="booking-submit">Search Flights</button>
      </form>
      <p class="booking-confirmation" aria-live="polite"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.booking-close');
  const form = modal.querySelector('#bookingForm');
  const confirmation = modal.querySelector('.booking-confirmation');
  const toInput = modal.querySelector('#toCity');
  const dateInput = modal.querySelector('#departDate');
  dateInput.min = new Date().toISOString().split('T')[0];

  const open = (presetDestination) => {
    form.reset();
    confirmation.textContent = '';
    if(presetDestination) toInput.value = presetDestination;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.querySelector('#fromCity').focus();
  };

  const close = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  triggers.forEach(btn => btn.addEventListener('click', () => open()));

  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if(e.target === modal) close();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('active')) close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = modal.querySelector('#fromCity').value.trim();
    const to = toInput.value.trim();
    const date = dateInput.value;
    confirmation.textContent = `Great news — flights from ${from} to ${to} on ${date} are ready to view. Our team will follow up shortly with the best fares.`;
  });

  // Expose opener for destination/cabin buttons
  window.__openBookingModal = open;
}

/*==================================================
    DESTINATION & CABIN "EXPLORE" BUTTONS
==================================================*/
function initDestinationButtons(){

  document.querySelectorAll('.destination-text button').forEach(btn => {
    const place = btn.closest('.destination-text').querySelector('h3')?.textContent.trim();
    btn.addEventListener('click', () => {
      if(window.__openBookingModal){
        window.__openBookingModal(place);
      }
    });
  });

  document.querySelectorAll('.cabin-text button').forEach(btn => {
    btn.addEventListener('click', () => {
      if(window.__openBookingModal){
        window.__openBookingModal();
      }
    });
  });
}

/*==================================================
    FOOTER YEAR (keeps copyright current)
==================================================*/
function initFooterYear(){
  const el = document.querySelector('.copyright');
  if(!el) return;
  const year = new Date().getFullYear();
  el.innerHTML = el.innerHTML.replace(/©\s*\d{4}/, `© ${year}`);
}
