const textInput = document.getElementById("textInput");
const textDisplay = document.getElementById("textDisplay");
const canvas = document.getElementById("canvas");
const bgColor = document.getElementById("bgColor");
const textColor = document.getElementById("textColor");
const blurSlider = document.getElementById("blurSlider");
const fontSize = document.getElementById("fontSize");
const lineHeight = document.getElementById("lineHeight");
const rotateSlider = document.getElementById("rotateSlider");

const fontSizeValue = document.getElementById("fontSizeValue");
const lineHeightValue = document.getElementById("lineHeightValue");
const blurValue = document.getElementById("blurValue");
const rotationValue = document.getElementById("rotationValue");

const alignButtons = document.querySelectorAll(".align-buttons button");

let flipHState = false;
let flipVState = false;
let rotation = 0;

canvas.style.background = "#000000";
textDisplay.style.color = "#ffffff";

textInput.addEventListener("input", () => {
  textDisplay.textContent = textInput.value;
});

function clearText() {
  textInput.value = "";
  textDisplay.textContent = "";
}

bgColor.addEventListener("input", () => {
  canvas.style.background = bgColor.value;
});

textColor.addEventListener("input", () => {
  textDisplay.style.color = textColor.value;
});

blurSlider.addEventListener("input", () => {
  textDisplay.style.filter = `blur(${blurSlider.value}px)`;
  blurValue.textContent = blurSlider.value;
});

fontSize.addEventListener("input", () => {
  textDisplay.style.fontSize = fontSize.value + "px";
  fontSizeValue.textContent = fontSize.value;
});

lineHeight.addEventListener("input", () => {
  textDisplay.style.lineHeight = lineHeight.value;
  lineHeightValue.textContent = lineHeight.value;
});

rotateSlider.addEventListener("input", () => {
  rotation = rotateSlider.value;
  rotationValue.textContent = rotation;
  updateTransform();
});

function removeActive(group) {
  group.forEach(btn => btn.classList.remove("active-btn"));
}

function setAlign(btn, type) {
  textDisplay.style.textAlign = type;
  textDisplay.style.textAlignLast = (type === "justify") ? "justify" : "auto";
  removeActive(alignButtons);
  btn.classList.add("active-btn");
}

function flipHorizontal(btn) {
  flipHState = !flipHState;
  updateTransform();
  btn.classList.toggle("active-btn", flipHState);
}

function flipVertical(btn) {
  flipVState = !flipVState;
  updateTransform();
  btn.classList.toggle("active-btn", flipVState);
}

function updateTransform() {
  const x = flipHState ? -1 : 1;
  const y = flipVState ? -1 : 1;
  textDisplay.style.transform = `scale(${x}, ${y}) rotate(${rotation}deg)`;
}

function downloadImage() {
  html2canvas(canvas, {
    width: canvas.offsetWidth,
    height: canvas.offsetHeight,
    backgroundColor: window.getComputedStyle(canvas).backgroundColor,
    scale: 2,
    useCORS: true
  }).then(canvasImg => {
    const link = document.createElement("a");
    link.download = "moolanakshatram.png";
    link.href = canvasImg.toDataURL("image/png");
    link.click();
  });
}
