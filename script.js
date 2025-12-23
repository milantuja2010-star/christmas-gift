/* ================================
   SNOW EFFECT (BACKGROUND)
================================ */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

for (let i = 0; i < 120; i++) {
  snowflakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    d: Math.random() + 1
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();

  snowflakes.forEach(flake => {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
  });

  ctx.fill();
  moveSnow();
}

let angle = 0;
function moveSnow() {
  angle += 0.01;
  snowflakes.forEach(flake => {
    flake.y += Math.pow(flake.d, 2) + 0.5;
    flake.x += Math.sin(angle) * 0.5;

    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawSnow, 25);

/* ================================
   INTRO → MAIN (STEP 2 LOGIC)
================================ */
const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const music = document.getElementById("music");

startBtn.addEventListener("click", () => {

  // Play music (browser allows because user clicked)
  music.volume = 0.6;
  music.play();

  // Fade out intro
  gsap.to(intro, {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      intro.style.display = "none";
      main.style.display = "flex";

      // Animate main content
      gsap.from("#main h2", {
        opacity: 0,
        y: 40,
        duration: 1
      });

      gsap.from("#main h1", {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.2
      });

      gsap.from(".slogan", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4
      });

      gsap.from(".images img", {
        opacity: 0,
        y: 80,
        stagger: 0.4,
        duration: 1.2,
        delay: 0.6
      });
    }
  });

});
