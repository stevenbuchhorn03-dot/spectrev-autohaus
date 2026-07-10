# AutoHaus Spectre – Fahrzeug-Website

Eine eigenständige Autohaus-Website: Fahrzeuge stöbern, filtern, anklicken und Detailinfos ansehen.

## Öffnen

Einfach `index.html` im Browser öffnen – **kein Build, kein Server nötig**. Reines HTML/CSS/JavaScript.

## Funktionen

- **Fahrzeug-Übersicht** als Karten-Grid mit Bild, Preis und Eckdaten
- **Suche** nach Marke/Modell sowie **Filter** nach Kraftstoff und Bauform
- **Sortierung** nach Preis, Baujahr und Kilometerstand
- **Detailansicht** (Klick auf ein Fahrzeug) mit allen technischen Daten, Ausstattung und Kontakt-Buttons
- **Responsive** für Desktop und Mobil, mit Tastaturbedienung (Enter/Esc)

## Dateien

| Datei | Zweck |
|-------|-------|
| `index.html` | Seitenstruktur |
| `styles.css` | Design (Dark Theme) |
| `data.js` | Fahrzeug-Datenbank (hier neue Autos ergänzen) |
| `app.js` | Logik: Rendern, Suche/Filter, Detail-Modal |

## Fahrzeuge anpassen

In `data.js` das Array `CARS` bearbeiten. Jedes Fahrzeug ist ein Objekt mit
`make`, `model`, `year`, `price`, `mileage`, `fuel`, `features` usw. Die
Fahrzeugbilder werden automatisch als farbige Platzhalter erzeugt – für echte
Fotos einfach das `src` in `app.js` durch einen Bildpfad ersetzen.
