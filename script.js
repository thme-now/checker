let codes = [];

// ============================
// CODES CSV LADEN
// ============================
fetch("codes.csv")
  .then(r => r.text())
  .then(text => {
    codes = text
      .split(/\r?\n/)      // in Zeilen zerlegen
      .map(x => x.trim())  // trimmen
      .filter(Boolean);    // Leerzeilen entfernen
  });

// ============================
// CODE PRÜFEN
// ============================
function check() {
  const input = document.getElementById("input").value.trim();
  const result = document.getElementById("result");

  if (!input) {
    result.innerHTML = "Bitte Code eingeben";
    return;
  }

  // Treffer?
  if (codes.includes(input)) {
    result.innerHTML = `<span style="color: green;">✔ Code gültig</span>`;
  } else {
    result.innerHTML = `<span style="color: red;">✘ Code ungültig</span>`;
  }
}

// ============================
// URL AUTO-CHECK
// ============================
//
// Beispiel:
// https://deineseite.de/?code=12345
//
const urlParams = new URLSearchParams(window.location.search);
const urlCode = urlParams.get("code");

if (urlCode) {
  document.getElementById("input").value = urlCode;

  // prüfen, aber warten bis CSV geladen ist
  const wait = setInterval(() => {
    if (codes.length > 0) {
      clearInterval(wait);
      check();
    }
  }, 100);
}
