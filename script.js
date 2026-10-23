
const EVENTS_DATA = [
  {
    id: "evt-1",
    title: "Dream Wedding Expo",
    category: "Wedding",
    city: "Tiruchirappalli",
    day: "30",
    mon: "OCT",
    price: "From ₹1.5L",
    image: "images/06-beach-wedding.jpg"
  },
  {
    id: "evt-2",
    title: "Carnival Birthday Bash",
    category: "Birthday",
    city: "Tiruchirappalli",
    day: "25",
    mon: "OCT",
    price: "From ₹15k",
    image: "images/02-birthday-party.jpg"
  },
  {
    id: "evt-3",
    title: "TN Tech Summit 2026",
    category: "Corporate",
    city: "Chennai",
    day: "10",
    mon: "NOV",
    price: "Free Entry",
    image: "images/03-audience-seating.jpg"
  },
  {
    id: "evt-4",
    title: "Live Electro Festival",
    category: "Concert",
    city: "Coimbatore",
    day: "18",
    mon: "NOV",
    price: "From ₹5L",
    image: "images/01-concert.jpg"
  }
];


let savedEventIds = [];
try {
  savedEventIds = JSON.parse(localStorage.getItem('eventease_saved') || '[]');
} catch (err) {
  savedEventIds = [];
}

const savedCountBadge = document.getElementById('savedCount');
const eventGrid = document.getElementById('eventGrid');
const searchInput = document.getElementById('searchInput');
const filterPills = document.querySelectorAll('.filter-pill');

function updateSavedCount() {
  savedCountBadge.textContent = savedEventIds.length;
}

function toggleSave(id) {
  if (savedEventIds.includes(id)) {
    savedEventIds = savedEventIds.filter(item => item !== id);
  } else {
    savedEventIds.push(id);
  }
  try {
    localStorage.setItem('eventease_saved', JSON.stringify(savedEventIds));
  } catch (err) {
    
  }
  updateSavedCount();
  renderCards();
}


let activeCategory = 'all';
let searchQuery = '';

function renderCards() {
  const filtered = EVENTS_DATA.filter(evt => {
    const matchCat = activeCategory === 'all' || evt.category.toLowerCase() === activeCategory.toLowerCase();
    const matchQuery = evt.title.toLowerCase().includes(searchQuery) || evt.city.toLowerCase().includes(searchQuery);
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    eventGrid.innerHTML = `<div class="no-events"><p>No events found matching your criteria.</p></div>`;
    return;
  }

  eventGrid.innerHTML = filtered.map(evt => {
    const isSaved = savedEventIds.includes(evt.id);
    return `
      <article class="event-card">
        <div class="event-media">
          <img src="${evt.image}" alt="${evt.title}" loading="lazy" />
          <div class="event-date">
            <div class="day">${evt.day}</div>
            <div class="mon">${evt.mon}</div>
          </div>
          <button class="event-fav ${isSaved ? 'is-saved' : ''}" onclick="toggleSave('${evt.id}')" aria-label="Bookmark">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>
        <div class="event-body">
          <h3>${evt.title}</h3>
          <p class="event-loc">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z"/></svg>
            ${evt.city}
          </p>
          <div class="event-meta">
            <span class="event-price">${evt.price}</span>
            <button class="event-btn" onclick="openBookingModal('${evt.title}')">
              Reserve
              <svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10h12M11 5l5 5-5 5"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    filterPills.forEach(p => p.classList.remove('is-active'));
    pill.classList.add('is-active');
    activeCategory = pill.dataset.cat;
    renderCards();
  });
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderCards();
});


const slides = document.querySelectorAll('.hero-slide');
const dotsWrap = document.getElementById('heroDots');
let currentSlide = 0;
let heroTimer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('is-active');
  dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});
const dots = document.querySelectorAll('.hero-dots button');

function goToSlide(i) {
  slides[currentSlide].classList.remove('is-active');
  dots[currentSlide].classList.remove('is-active');
  currentSlide = (i + slides.length) % slides.length;
  slides[currentSlide].classList.add('is-active');
  dots[currentSlide].classList.add('is-active');
  resetHeroTimer();
}

function resetHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
}

document.querySelector('.hero-arrow.next').addEventListener('click', () => goToSlide(currentSlide + 1));
document.querySelector('.hero-arrow.prev').addEventListener('click', () => goToSlide(currentSlide - 1));


const modal = document.getElementById('bookingModal');
const formEventName = document.getElementById('formEventName');

function openBookingModal(eventName) {
  formEventName.value = eventName;
  modal.showModal();
}

function closeBookingModal() {
  modal.close();
}

function handleFormSubmit(e) {
  e.preventDefault();

  alert(
    "Demo only: No booking has been saved or submitted."
  );

  modal.close();
}

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('is-open');
});


updateSavedCount();
renderCards();
resetHeroTimer();
