// Fahrzeug-Datenbank des Autohauses.
// Bilder werden als farbige SVG-Platzhalter generiert, damit die Seite
// komplett offline (ohne externe Ressourcen) funktioniert.

function carImage(color, label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${color}"/>
          <stop offset="1" stop-color="#0b1220"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#g)"/>
      <g fill="none" stroke="rgba(255,255,255,.85)" stroke-width="10" stroke-linejoin="round" stroke-linecap="round">
        <path d="M120 300 q30 -90 110 -100 h180 q60 0 110 60 l90 20 q60 12 60 60 v40 h-560 z"/>
        <circle cx="250" cy="360" r="46" fill="#0b1220"/>
        <circle cx="560" cy="360" r="46" fill="#0b1220"/>
        <path d="M250 200 h150 l40 60 h-190 z" fill="rgba(255,255,255,.15)"/>
      </g>
      <text x="400" y="460" fill="rgba(255,255,255,.9)" font-family="Arial" font-size="34" font-weight="700" text-anchor="middle">${label}</text>
    </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

const CARS = [
  {
    id: 1,
    make: 'BMW',
    model: '330i M Sport',
    year: 2023,
    price: 44900,
    mileage: 18500,
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 245,
    color: 'Mineralgrau',
    body: 'Limousine',
    seats: 5,
    accent: '#1f6feb',
    features: ['LED-Scheinwerfer', 'Navigationssystem', 'Sitzheizung', 'Rückfahrkamera', 'Apple CarPlay', 'Tempomat'],
    description: 'Sportlich-elegante Limousine mit M-Sport-Paket. Scheckheftgepflegt, unfallfrei und aus erster Hand.'
  },
  {
    id: 2,
    make: 'Audi',
    model: 'A4 Avant 40 TDI',
    year: 2022,
    price: 39800,
    mileage: 32100,
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: 204,
    color: 'Gletscherweiß',
    body: 'Kombi',
    seats: 5,
    accent: '#e34d4d',
    features: ['Virtual Cockpit', 'Matrix-LED', 'Anhängerkupplung', 'Panoramadach', 'Keyless Go', 'DAB+'],
    description: 'Geräumiger Kombi mit sparsamem Dieselmotor. Ideal für Familie und lange Strecken.'
  },
  {
    id: 3,
    make: 'Mercedes-Benz',
    model: 'C 200 AMG Line',
    year: 2023,
    price: 48500,
    mileage: 12400,
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 204,
    color: 'Obsidianschwarz',
    body: 'Limousine',
    seats: 5,
    accent: '#8b5cf6',
    features: ['AMG-Line', 'MBUX', 'Ambientebeleuchtung', 'Totwinkel-Assistent', 'Wireless Charging', 'Burmester Sound'],
    description: 'Neuwertige C-Klasse mit AMG-Line Ausstattung und modernstem MBUX-Infotainment.'
  },
  {
    id: 4,
    make: 'Volkswagen',
    model: 'Golf 8 GTI',
    year: 2021,
    price: 34900,
    mileage: 41000,
    fuel: 'Benzin',
    transmission: 'Manuell',
    power: 245,
    color: 'Tornadorot',
    body: 'Kompakt',
    seats: 5,
    accent: '#f59e0b',
    features: ['GTI-Paket', 'Digital Cockpit', 'Sportfahrwerk', 'Klimaautomatik', 'Sportsitze', 'LED-Matrix'],
    description: 'Der Kult-Kompaktsportler. Kräftiger Turbo, knackiges Schaltgetriebe und viel Fahrspaß.'
  },
  {
    id: 5,
    make: 'Tesla',
    model: 'Model 3 Long Range',
    year: 2023,
    price: 42900,
    mileage: 9800,
    fuel: 'Elektro',
    transmission: 'Automatik',
    power: 366,
    color: 'Perlweiß',
    body: 'Limousine',
    seats: 5,
    accent: '#10b981',
    features: ['Autopilot', 'Glasdach', 'Wärmepumpe', '15" Touchscreen', 'Über-Luft-Updates', 'Premium-Audio'],
    description: 'Elektrische Reichweiten-Limousine mit über 600 km Reichweite und blitzschneller Beschleunigung.'
  },
  {
    id: 6,
    make: 'Porsche',
    model: '911 Carrera',
    year: 2022,
    price: 118000,
    mileage: 15600,
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 385,
    color: 'Racinggelb',
    body: 'Coupé',
    seats: 4,
    accent: '#eab308',
    features: ['Sport Chrono', 'PASM Sportfahrwerk', 'Bose Surround', 'Sport-Auspuff', 'LED-Matrix', 'Ledervollausstattung'],
    description: 'Ikonischer Sportwagen. Perfekt gepflegt, aus erster Hand mit lückenlosem Porsche-Scheckheft.'
  },
  {
    id: 7,
    make: 'Skoda',
    model: 'Octavia Combi 1.5 TSI',
    year: 2022,
    price: 26900,
    mileage: 28700,
    fuel: 'Benzin',
    transmission: 'Manuell',
    power: 150,
    color: 'Stahlgrau',
    body: 'Kombi',
    seats: 5,
    accent: '#38bdf8',
    features: ['Full-LED', 'Navigation', 'Sitzheizung', 'PDC vorn/hinten', 'Klimaautomatik', 'Smart-Link'],
    description: 'Extrem praktischer Familienkombi mit riesigem Kofferraum und moderner Technik.'
  },
  {
    id: 8,
    make: 'Ford',
    model: 'Puma ST-Line',
    year: 2023,
    price: 27500,
    mileage: 14200,
    fuel: 'Benzin',
    transmission: 'Automatik',
    power: 155,
    color: 'Desert-Island-Blau',
    body: 'SUV',
    seats: 5,
    accent: '#6366f1',
    features: ['ST-Line', 'B&O Sound', 'Digitales Cockpit', 'Rückfahrkamera', 'Spurhalteassistent', 'Klimaautomatik'],
    description: 'Kompaktes, stylisches SUV mit Mild-Hybrid-Technik und sportlicher ST-Line Optik.'
  },
  {
    id: 9,
    make: 'Volvo',
    model: 'XC60 B4 Momentum',
    year: 2021,
    price: 45900,
    mileage: 46800,
    fuel: 'Diesel',
    transmission: 'Automatik',
    power: 197,
    color: 'Denim-Blau',
    body: 'SUV',
    seats: 5,
    accent: '#0ea5e9',
    features: ['Pilot Assist', 'Panoramadach', 'Leder', 'Harman Kardon', 'Head-up-Display', '360°-Kamera'],
    description: 'Sicheres, komfortables Premium-SUV aus Schweden mit umfangreichen Assistenzsystemen.'
  }
];
