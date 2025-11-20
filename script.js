let codes = [];

// CSV laden
fetch("codes.csv")
  .then(r => r.text())
  .then(text => {
    codes = text
      .split(/\r?\n/)
      .map(x => x.trim())
      .filter(Boolean);
  });

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

// URL Auto-Check ?code=123456
const urlParams = new URLSearchParams(window.location.search);
const urlCode = urlParams.get("code");

if (urlCode) {
  document.getElementById("input").value = urlCode;
  check();
}
