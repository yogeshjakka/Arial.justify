const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");
const canvas = document.getElementById("canvas");
const bgColor = document.getElementById("bgColor");
const bgImageUpload = document.getElementById("bgImageUpload");
const removeBgBtn = document.getElementById("removeBgBtn");
const textColor = document.getElementById("textColor");

const strokeToggle = document.getElementById("strokeToggle");
const strokeColor = document.getElementById("strokeColor");
const strokeSize = document.getElementById("strokeSize");
const strokeSizeValue = document.getElementById("strokeSizeValue");

const fontSize = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");
const lineHeight = document.getElementById("lineHeight");
const lineHeightValue = document.getElementById("lineHeightValue");
const blurSlider = document.getElementById("blurSlider");
const blurValue = document.getElementById("blurValue");
const rotateSlider = document.getElementById("rotateSlider");
const rotationValue = document.getElementById("rotationValue");

let flipHState = false;
let flipVState = false;
let rotation = 0;
let imageUploaded = false;

textInput.addEventListener("input", () => {
  textDisplay.textContent = textInput.value;
});

bgColor.addEventListener("input", () => {
  if (!imageUploaded) canvas.style.background = bgColor.value;
});

bgImageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    canvas.style.backgroundImage = `url(${e.target.result})`;
    canvas.style.backgroundSize = "cover";
    canvas.style.backgroundPosition = "center";
    imageUploaded = true;
    bgColor.disabled = true;
  };
  reader.readAsDataURL(file);
});

removeBgBtn.addEventListener("click", function () {
  canvas.style.backgroundImage = "none";
  bgImageUpload.value = "";
  imageUploaded = false;
  bgColor.disabled = false;
  canvas.style.background = bgColor.value;
});

function updateStroke() {
  if (!strokeToggle.checked) {
    textDisplay.style.textShadow = "none";
    return;
  }

  const size = parseFloat(strokeSize.value);
  const color = strokeColor.value;

  let shadows = [];
  for (let x = -size; x <= size; x += size) {
    for (let y = -size; y <= size; y += size) {
      if (x !== 0 || y !== 0) {
        shadows.push(`${x}px ${y}px 0 ${color}`);
      }
    }
  }

  textDisplay.style.textShadow = shadows.join(",");
}

strokeToggle.addEventListener("change", updateStroke);
strokeColor.addEventListener("input", updateStroke);
strokeSize.addEventListener("input", () => {
  strokeSizeValue.textContent = strokeSize.value;
  updateStroke();
});

textColor.addEventListener("input", () => {
  textDisplay.style.color = textColor.value;
});

fontSize.addEventListener("input", () => {
  textDisplay.style.fontSize = fontSize.value + "px";
  fontSizeValue.textContent = fontSize.value;
});

lineHeight.addEventListener("input", () => {
  textDisplay.style.lineHeight = lineHeight.value;
  lineHeightValue.textContent = lineHeight.value;
});

blurSlider.addEventListener("input", () => {
  textDisplay.style.filter = `blur(${blurSlider.value}px)`;
  blurValue.textContent = blurSlider.value;
});

rotateSlider.addEventListener("input", () => {
  rotation = rotateSlider.value;
  rotationValue.textContent = rotation;
  updateTransform();
});

function setAlign(btn, type) {
  textDisplay.style.textAlign = type;
  textDisplay.style.textAlignLast = (type === "justify") ? "justify" : "auto";
  document.querySelectorAll(".align-buttons button")
    .forEach(b => b.classList.remove("active-btn"));
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

function clearText() {
  textInput.value = "";
  textDisplay.textContent = "";
}

function downloadImage() {
  const scaleFactor = 4;

  html2canvas(canvas, {
    scale: scaleFactor,
    useCORS: true,
    backgroundColor: null,
    logging: false
  }).then(canvasImg => {
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvasImg.toDataURL("image/png", 1.0);
    link.click();
  });
}
