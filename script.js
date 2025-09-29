const runBtn = document.getElementById('runBtn');
const gombalSection = document.getElementById('gombalSection');
const gameSection = document.getElementById('gameSection');
const closingSection = document.getElementById('closingSection');
const gombalText = document.getElementById('gombalText');
const nextGombal = document.getElementById('nextGombal');
const heartContainer = document.getElementById('heartContainer');
const gameMsg = document.getElementById('gameMsg');
const hugBtn = document.getElementById('hugBtn');

const gombals = [
  "Shelin itu kayak donat 🍩 … manisnya bikin aku muter-muter mikirin.",
  "Katanya lagi bad mood, tapi kok tetep imut banget sih? 🤭",
  "Kalau senyum kamu jadi matahari ☀️, aku rela jadi planet yang muter terus.",
  "Shelin, kalau jadi lagu, kamu tuh *top chart* di hatiku 🎶.",
  "Kalau Shelin jadi kopi, aku rela jadi gula biar selalu nyatu ☕️💞."
];

// --- Tombol lari ---
runBtn.addEventListener('mouseover', () => {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 80);
  runBtn.style.position = 'absolute';
  runBtn.style.left = `${x}px`;
  runBtn.style.top = `${y}px`;
});

runBtn.addEventListener('click', () => {
  gombalSection.classList.remove('hidden');
  window.scrollTo({ top: gombalSection.offsetTop, behavior: 'smooth' });
});

// --- Gombal random ---
nextGombal.addEventListener('click', () => {
  const random = Math.floor(Math.random() * gombals.length);
  gombalText.textContent = gombals[random];
  // setelah beberapa gombal, munculkan game
  if (!gameSection.classList.contains('shown') && Math.random() > 0.4) {
    gameSection.classList.remove('hidden');
    gameSection.classList.add('shown');
    spawnHeart();
  }
});

// --- Mini Game ---
function spawnHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * (heartContainer.clientWidth - 40) + 'px';
  heart.style.top = Math.random() * (heartContainer.clientHeight - 40) + 'px';
  heartContainer.appendChild(heart);

  heart.addEventListener('click', () => {
    gameMsg.textContent = "Yay! Dapet cintaku 💞";
    heart.remove();
    setTimeout(() => closingSection.classList.remove('hidden'), 800);
  });

  setTimeout(() => { if (document.body.contains(heart)) heart.remove(); }, 4000);
}

// --- Peluk Virtual ---
hugBtn.addEventListener('click', () => {
  gameMsg.textContent = "🤗 Peluk Virtual Terkirim! 💖";
  confetti();
});

// --- Confetti Effect ---
function confetti() {
  const duration = 1 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    // efek sederhana
    const colors = ['#ff69b4','#ffb6c1','#ffc0cb','#ff80ab'];
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.background = colors[Math.floor(Math.random()*colors.length)];
    particle.style.left = Math.random()*100 + 'vw';
    particle.style.top = '-10px';
    particle.style.opacity = 0.7;
    particle.style.borderRadius = '50%';
    document.body.appendChild(particle);

    const fall = setInterval(() => {
      particle.style.top = parseFloat(particle.style.top)+4 + 'px';
      if(parseFloat(particle.style.top) > window.innerHeight) {
        particle.remove();
        clearInterval(fall);
      }
    },16);

    if (Date.now() < end) requestAnimationFrame(frame);
  }());
}
