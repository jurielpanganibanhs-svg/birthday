const flames = document.querySelectorAll(".flame");
const cake = document.getElementById("cake");
const blowBtn = document.getElementById("blowBtn");
const relightBtn = document.getElementById("relightBtn");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
const balloonsContainer = document.getElementById("balloons");

let confetti = [];
let confettiActive = false;
let balloonInterval;

function blowOutCandles() {
  flames.forEach(flame => flame.style.display = "none");
  blowBtn.style.display = "none";
  relightBtn.style.display = "inline-block";
  startConfetti();
  releaseBalloons();
}

function relightCandles() {
  flames.forEach(flame => flame.style.display = "block");
  blowBtn.style.display = "inline-block";
  relightBtn.style.display = "none";
  confetti = [];
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiActive = false;
  clearInterval(balloonInterval);
  balloonsContainer.innerHTML = "";
}

blowBtn.addEventListener("click", blowOutCandles);
cake.addEventListener("click", blowOutCandles);
relightBtn.addEventListener("click", relightCandles);

// 🎉 Confetti Animation
function startConfetti() {
  confetti = Array.from({ length: 100 }).map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 6 + 2,
    d: Math.random() * 1 + 1,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
  }));
  confettiActive = true;
  animateConfetti();
}

function animateConfetti() {
  if (!confettiActive) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
    ctx.fillStyle = c.color;
    ctx.fill();

    c.y += c.d;
    if (c.y > window.innerHeight) {
      c.y = 0;
      c.x = Math.random() * window.innerWidth;
    }
  });

  requestAnimationFrame(animateConfetti);
}

// 🎈 Balloons Animation
function releaseBalloons() {
  balloonInterval = setInterval(() => {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    // Randomize position, color, size, and float duration
    const size = Math.random() * 15 + 25; // 25px - 40px
    const duration = Math.random() * 3 + 5; // 5s - 8s slower float
    const left = Math.random() * 90; // 0vw - 90vw

    balloon.style.width = size + "px";
    balloon.style.height = size * 1.3 + "px";
    balloon.style.left = left + "vw";
    balloon.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
    balloon.style.animationDuration = duration + "s";

    balloonsContainer.appendChild(balloon);

    setTimeout(() => balloon.remove(), duration * 1000);
  }, 400);
}
