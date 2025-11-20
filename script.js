let codes = [];

// ============================
// CODES CSV LADEN
// ============================
fetch("codes.csv")
  .then(r => r.text())
  .then(text => {
    codes = text
      .split(/\r?\n/)      // Zeilen trennen
      .map(x => x.trim())  // Leerzeichen entfernen
      .filter(Boolean);    // Leere Zeilen raus
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
// https://DEINNAME.github.io/qr-checker/?code=123
//
const urlParams = new URLSearchParams(window.location.search);
const urlCode = urlParams.get("code");

if (urlCode) {
  // In Eingabefeld setzen
  document.getElementById("input").value = urlCode;

  // W
