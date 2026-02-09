const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");

const redValue = document.getElementById("redValue");
const greenValue = document.getElementById("greenValue");
const blueValue = document.getElementById("blueValue");

const redInput = document.getElementById("redInput");
const greenInput = document.getElementById("greenInput");
const blueInput = document.getElementById("blueInput");

const colorBox = document.getElementById("colorBox");
const rgbText = document.getElementById("rgbText");
const hexText = document.getElementById("hexText");

const copyHexBtn = document.getElementById("copyHexBtn");
const copyMsg = document.getElementById("copyMsg");

function clamp255(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.min(255, Math.max(0, Math.round(n)));
}

function toHex(value) {
  return Number(value).toString(16).padStart(2, "0").toUpperCase();
}

function setAllControls(r, g, b) {
  // sliders
  red.value = r;
  green.value = g;
  blue.value = b;

  // inputs numéricos
  redInput.value = r;
  greenInput.value = g;
  blueInput.value = b;

  // badges
  redValue.textContent = r;
  greenValue.textContent = g;
  blueValue.textContent = b;

  // color + textos
  const rgb = `rgb(${r}, ${g}, ${b})`;
  colorBox.style.backgroundColor = rgb;
  rgbText.value = rgb;
  hexText.value = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  copyMsg.textContent = "";

  document.getElementById("liveHex").textContent = hexText.value;
  document.getElementById("liveRgb").textContent = rgbText.value;

}

function updateFromSliders() {
  const r = clamp255(red.value);
  const g = clamp255(green.value);
  const b = clamp255(blue.value);
  setAllControls(r, g, b);
}

function updateFromInputs() {
  const r = clamp255(redInput.value);
  const g = clamp255(greenInput.value);
  const b = clamp255(blueInput.value);
  setAllControls(r, g, b);
}

// Eventos sliders
[red, green, blue].forEach(input => {
  input.addEventListener("input", updateFromSliders);
});

// Eventos inputs numéricos
// "input" actualiza mientras escribes; "change" por si pega/auto completa
[redInput, greenInput, blueInput].forEach(input => {
  input.addEventListener("input", updateFromInputs);
  input.addEventListener("change", updateFromInputs);
});

// Copiar HEX
copyHexBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(hexText.value);
    copyMsg.textContent = "✅ Copiado al portapapeles";
  } catch {
    hexText.select();
    document.execCommand("copy");
    copyMsg.textContent = "✅ Copiado";
  }
});

const randomBtn = document.getElementById("randomBtn");

function random255() {
  return Math.floor(Math.random() * 256);
}

randomBtn.addEventListener("click", () => {
  const r = random255();
  const g = random255();
  const b = random255();
  setAllControls(r, g, b);
});


// Inicial
setAllControls(0, 0, 0);
