// AutoHaus Spectre – Fahrzeug-Browser
(function () {
  'use strict';

  const grid = document.getElementById('car-grid');
  const searchEl = document.getElementById('search');
  const fuelEl = document.getElementById('filter-fuel');
  const bodyEl = document.getElementById('filter-body');
  const sortEl = document.getElementById('sort');
  const emptyEl = document.getElementById('empty');
  const countEl = document.getElementById('result-count');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');

  const euro = (n) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 });
  const km = (n) => n.toLocaleString('de-DE') + ' km';

  // Filter-Dropdowns aus den Daten befüllen
  function fillFilters() {
    const fuels = [...new Set(CARS.map((c) => c.fuel))].sort();
    const bodies = [...new Set(CARS.map((c) => c.body))].sort();
    fuels.forEach((f) => fuelEl.add(new Option(f, f)));
    bodies.forEach((b) => bodyEl.add(new Option(b, b)));
  }

  function currentList() {
    const q = searchEl.value.trim().toLowerCase();
    let list = CARS.filter((c) => {
      const hay = `${c.make} ${c.model}`.toLowerCase();
      return (
        (!q || hay.includes(q)) &&
        (!fuelEl.value || c.fuel === fuelEl.value) &&
        (!bodyEl.value || c.body === bodyEl.value)
      );
    });

    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'year-desc': (a, b) => b.year - a.year,
      'mileage-asc': (a, b) => a.mileage - b.mileage,
    };
    return list.sort(sorters[sortEl.value] || sorters['price-asc']);
  }

  function cardHTML(c) {
    return `
      <article class="card" data-id="${c.id}" tabindex="0" role="button" aria-label="${c.make} ${c.model} ansehen">
        <img class="card-img" src="${carImage(c.accent, c.make)}" alt="${c.make} ${c.model}" loading="lazy">
        <div class="card-body">
          <h3 class="card-title">${c.make} ${c.model}</h3>
          <p class="card-sub">${c.year} · ${c.body} · ${c.color}</p>
          <div class="card-specs">
            <span class="chip">${km(c.mileage)}</span>
            <span class="chip">${c.fuel}</span>
            <span class="chip">${c.power} PS</span>
            <span class="chip">${c.transmission}</span>
          </div>
          <div class="card-foot">
            <span class="price">${euro(c.price)}</span>
            <span class="card-link">Details ansehen →</span>
          </div>
        </div>
      </article>`;
  }

  function render() {
    const list = currentList();
    grid.innerHTML = list.map(cardHTML).join('');
    emptyEl.hidden = list.length !== 0;
    countEl.textContent = `${list.length} Fahrzeug${list.length === 1 ? '' : 'e'} gefunden`;
  }

  function openDetail(id) {
    const c = CARS.find((x) => x.id === id);
    if (!c) return;
    modalContent.innerHTML = `
      <img class="detail-img" src="${carImage(c.accent, c.make + ' ' + c.model)}" alt="${c.make} ${c.model}">
      <div class="detail-body">
        <div class="detail-head">
          <div>
            <h2>${c.make} ${c.model}</h2>
            <p class="card-sub">${c.year} · ${c.body} · Farbe: ${c.color}</p>
          </div>
          <span class="price">${euro(c.price)}</span>
        </div>
        <p class="detail-desc">${c.description}</p>
        <div class="spec-grid">
          <div class="spec"><small>Erstzulassung</small><b>${c.year}</b></div>
          <div class="spec"><small>Kilometerstand</small><b>${km(c.mileage)}</b></div>
          <div class="spec"><small>Kraftstoff</small><b>${c.fuel}</b></div>
          <div class="spec"><small>Getriebe</small><b>${c.transmission}</b></div>
          <div class="spec"><small>Leistung</small><b>${c.power} PS</b></div>
          <div class="spec"><small>Karosserie</small><b>${c.body}</b></div>
          <div class="spec"><small>Sitzplätze</small><b>${c.seats}</b></div>
          <div class="spec"><small>Farbe</small><b>${c.color}</b></div>
        </div>
        <div class="features">
          <h3>Ausstattung</h3>
          <ul class="feature-list">${c.features.map((f) => `<li>${f}</li>`).join('')}</ul>
        </div>
        <div class="detail-cta">
          <a class="btn btn-primary" href="tel:+4930123456">☎ Probefahrt vereinbaren</a>
          <a class="btn btn-ghost" href="mailto:info@autohaus-spectre.de?subject=${encodeURIComponent('Anfrage: ' + c.make + ' ' + c.model)}">✉ Anfrage senden</a>
        </div>
      </div>`;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeDetail() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  // Events
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) openDetail(Number(card.dataset.id));
  });
  grid.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card')) {
      e.preventDefault();
      openDetail(Number(e.target.dataset.id));
    }
  });
  modal.addEventListener('click', (e) => { if (e.target.dataset.close !== undefined) closeDetail(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeDetail(); });

  [searchEl, fuelEl, bodyEl, sortEl].forEach((el) => el.addEventListener('input', render));

  // Init
  fillFilters();
  render();
  document.getElementById('stat-count').textContent = CARS.length;
  document.getElementById('year').textContent = new Date().getFullYear();
})();
