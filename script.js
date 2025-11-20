let codes = [];

// ============================
// CSV laden
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
// Code prüfen
// ============================
function check() {
  const input = document.getElementById("input").value.trim();
  const result = document.getElementById("result");

  if (!input) {
    result.innerHTML = "Bitte Code eingeben";
    return;
  }

  if (codes.includes(input)) {
    result.innerHTML = `<span style="color: green;">✔ Code gültig</span>`;
  } else {
    result.innerHTML = `<span style="color: red;">✘ Code ungültig</span>`;
  }
}

// ============================
// URL Auto-Check ?code=XYZ
// ============================
const urlParams = new URLSearchParams(window.location.search);
const urlCode = urlParams.get("code");

if (urlCode) {
  document.getElementById("input").value = urlCode;

  // Warten, bis codes.csv geladen ist
  const wait = setInterval(() => {
    if (codes.length > 0) {
      clearInterval(wait);
      check();
    }
  }, 100);
}
