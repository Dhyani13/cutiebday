// =============================
// FULL FINAL script.js
// =============================

const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let w, h, stars = [], moon;
let saturnRotation = 0; // For Saturn's rotation

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function init() {
  stars = [];
  for(let i = 0; i < 250; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.8 + 0.5,
      brightness: 0.6 + Math.random() * 0.4
    });
  }
  moon = { x: w * 0.15, y: h * 0.20, r: Math.min(w, h) * 0.19 };
}
init();

// ========================
// PHOTOREALISTIC FULL MOON
// ========================
function drawMoon() {
  const mx = moon.x;
  const my = moon.y;
  const mr = moon.r;

  // Base moon — realistic grayish tone like actual moon
  const base = ctx.createRadialGradient(mx - mr*0.33, my - mr*0.33, 0, mx, my, mr);
  base.addColorStop(0,    '#f2f2f2');
  base.addColorStop(0.4,  '#e8e8e8');
  base.addColorStop(0.75, '#dddddd');
  base.addColorStop(1,    '#d3d3d3');
  ctx.fillStyle = base;
  ctx.beginPath();
  ctx.arc(mx, my, mr, 0, Math.PI*2);
  ctx.fill();

  // Detailed lunar features (lighter maria and main craters only - carefully positioned to avoid overlap)
  const features = [
    // Major maria (now LIGHTER as requested)
    {x:0.30,y:0.30,r:0.20,c:'#b8b8b8', type:'mare'}, // Mare Imbrium (repositioned to avoid overlap)
    {x:0.60,y:0.30,r:0.13,c:'#bababa', type:'mare'}, // Mare Serenitatis (repositioned to avoid overlap)
    {x:0.65,y:0.45,r:0.12,c:'#bcbcbc', type:'mare'}, // Mare Tranquillitatis (repositioned to avoid overlap)
    {x:0.20,y:0.60,r:0.20,c:'#b6b6b6', type:'mare'}, // Oceanus Procellarum (repositioned to avoid overlap)
    {x:0.70,y:0.70,r:0.10,c:'#bebebe', type:'mare'}, // Mare Humorum (repositioned to avoid overlap)
    
    // Major craters (lighter for realism - repositioned to avoid overlap)
    {x:0.25,y:0.25,r:0.070,c:'#d0d0d0', type:'crater'},// Copernicus (repositioned)
    {x:0.70,y:0.85,r:0.09, c:'#cecece', type:'crater'},// Tycho (repositioned)
    {x:0.15,y:0.20,r:0.055,c:'#d2d2d2', type:'crater'},// Aristarchus (repositioned)
    {x:0.45,y:0.15,r:0.050,c:'#d1d1d1', type:'crater'},// Plato (repositioned)
    {x:0.35,y:0.50,r:0.075,c:'#d0d0d0', type:'crater'},// Kepler (repositioned)
  ];

  features.forEach(f => {
    const gx = mx + (f.x - 0.5) * mr * 1.95;
    const gy = my + (f.y - 0.5) * mr * 1.95;

    // All features now use simple, non-overlapping circles with no highlights
    ctx.fillStyle = f.c;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(gx, gy, f.r * mr, 0, Math.PI*2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Subtle natural glow/halo around the moon
  const halo = ctx.createRadialGradient(mx, my, mr*0.9, mx, my, mr*1.1);
  halo.addColorStop(0, 'rgba(240, 240, 240, 0.08)');
  halo.addColorStop(1, 'rgba(240, 240, 240, 0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(mx, my, mr*1.1, 0, Math.PI*2);
  ctx.fill();
}

function draw() {
  ctx.fillStyle = 'rgba(0,0,0,0.07)';
  ctx.fillRect(0, 0, w, h);

  // Stars + twinkle
  stars.forEach(s => {
    const twinkle = Math.sin(Date.now() * 0.002 + s.x * 0.01) * 0.4 + 0.6;
    ctx.fillStyle = `rgba(255,255,255,${s.brightness * twinkle})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
    ctx.fill();
  });

  drawMoon();

  // Update Saturn rotation (slow rotation: full turn every ~75 seconds)
  saturnRotation += 0.00023; // (2*PI) / (75 * 60) approximately

  // Draw Saturn in the top-right area
  drawSaturn();

  // Giant faint "M" in the sky
  ctx.font = 'bold ' + (w * 0.18) + 'px Georgia';
  ctx.fillStyle = 'rgba(180,140,255,0.07)';
  ctx.textAlign = 'center';
  ctx.fillText('M', w/2, h*0.28);

  requestAnimationFrame(draw);
}

// ========================
// PHOTO-REALISTIC SATURN WITH GLOWING TILTED RINGS
// ========================
function drawSaturn() {
  // Saturn position - top-right area, slightly bigger and lower
  const saturnX = w * 0.85;  // Top-right
  const saturnY = h * 0.55;  // Shifted down
  const saturnRadius = Math.min(w, h) * 0.06; // Bigger than before

  // Draw Saturn with subtle rotation
  ctx.save();
  ctx.translate(saturnX, saturnY);
  ctx.rotate(saturnRotation); // Slow rotation

  // Saturn body - soft creamy color with subtle bands
  const saturnBody = ctx.createRadialGradient(
    -saturnRadius * 0.3, -saturnRadius * 0.3, 0,
    0, 0, saturnRadius
  );
  saturnBody.addColorStop(0,    '#f0e4c3'); // Lighter center
  saturnBody.addColorStop(0.3,  '#e6d8b0'); // Mid tone
  saturnBody.addColorStop(0.6,  '#d9c99e'); // Band 1
  saturnBody.addColorStop(0.8,  '#d2bc94'); // Band 2
  saturnBody.addColorStop(1,    '#c8ac81'); // Outer edge
  ctx.fillStyle = saturnBody;
  ctx.beginPath();
  ctx.arc(0, 0, saturnRadius, 0, Math.PI*2);
  ctx.fill();

  // Saturn's tilted rings - glowing softly in purple-white
  ctx.rotate(0.436); // ~25 degrees tilt in radians

  // Main rings with subtle transparency and glow
  // Outer A ring
  ctx.strokeStyle = 'rgba(225, 200, 180, 0.6)';
  ctx.lineWidth = saturnRadius * 0.15;
  ctx.beginPath();
  ctx.ellipse(0, 0, saturnRadius * 1.8, saturnRadius * 0.4, 0, 0, Math.PI*2);
  ctx.stroke();

  // B ring (darker middle)
  ctx.strokeStyle = 'rgba(200, 170, 150, 0.7)';
  ctx.lineWidth = saturnRadius * 0.1;
  ctx.beginPath();
  ctx.ellipse(0, 0, saturnRadius * 1.5, saturnRadius * 0.35, 0, 0, Math.PI*2);
  ctx.stroke();

  // C ring (innermost, faint)
  ctx.strokeStyle = 'rgba(180, 155, 135, 0.5)';
  ctx.lineWidth = saturnRadius * 0.08;
  ctx.beginPath();
  ctx.ellipse(0, 0, saturnRadius * 1.25, saturnRadius * 0.3, 0, 0, Math.PI*2);
  ctx.stroke();

  // Cassini Division (gap between A and B rings)
  ctx.strokeStyle = 'rgba(150, 130, 110, 0.5)';
  ctx.lineWidth = saturnRadius * 0.03;
  ctx.beginPath();
  ctx.ellipse(0, 0, saturnRadius * 1.65, saturnRadius * 0.38, 0, 0, Math.PI*2);
  ctx.stroke();

  // Subtle shadow effect on rings from planet
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.beginPath();
  ctx.ellipse(0, 0, saturnRadius * 1.8, saturnRadius * 0.4, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.globalCompositeOperation = 'source-over';

  ctx.restore();

  // Add a small shine to Saturn's surface
  // Shine spot on planet surface
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.arc(
    saturnX - saturnRadius * 0.4,
    saturnY - saturnRadius * 0.4,
    saturnRadius * 0.15,
    0, Math.PI*2
  );
  ctx.fill();
}
draw();

// More visible, frequent, beautiful floating hearts
setInterval(() => {
  const heart = document.createElement('div');
  heart.innerHTML = '♡';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.bottom = '-60px';
  heart.style.fontSize = Math.random() * 25 + 25 + 'px';  // bigger
  heart.style.color = Math.random() > 0.3 ? '#e0b0ff' : '#ffb3d1';
  heart.style.opacity = Math.random() * 0.4 + 0.4;       // 0.4~0.8
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '2';
  heart.style.animation = 'floatHeart 10s linear forwards';
  document.body.appendChild(heart);
  
  setTimeout(() => heart.remove(), 10000);
}, 1200); // every 1.2 seconds instead of 1.8

// Drifting purple particles
setInterval(() => {
  const p = document.createElement('div');
  p.style.position = 'fixed';
  p.style.width = p.style.height = '4px';
  p.style.background = 'rgba(224,176,255,0.6)';
  p.style.borderRadius = '50%';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.bottom = '-10px';
  p.style.pointerEvents = 'none';
  p.style.boxShadow = '0 0 10px #e0b0ff';
  p.style.animation = 'drift 20s linear forwards';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 20000);
}, 900);

// ========================
// COUNTDOWN + MUSIC + POPUP
// ========================

function updateCountdown() {
  // Get the current time in Peru (UTC-5)
  const now = new Date();
  const options = { timeZone: 'America/Lima' };
  const peruTime = new Date(now.toLocaleString('en-US', options));

  let birthday = new Date(peruTime.getFullYear(), 10, 26); // Nov 26 in Peru time
  if (birthday < peruTime) birthday.setFullYear(peruTime.getFullYear() + 1);
  const diff = birthday - peruTime;
  if (diff > 0) {
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const m = Math.floor((diff % (1000*60*60)) / (1000*60));
    const s = Math.floor((diff % (1000*60)) / 1000);
    document.getElementById('days').textContent = d.toString().padStart(2,'0');
    document.getElementById('hours').textContent = h.toString().padStart(2,'0');
    document.getElementById('minutes').textContent = m.toString().padStart(2,'0');
    document.getElementById('seconds').textContent = s.toString().padStart(2,'0');
  } else {
    document.querySelector('.countdown h3').textContent = 'Happy Birthday, M ♡';
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

function openPopup() { document.getElementById('popup').style.display = 'flex'; }
function closePopup() { document.getElementById('popup').style.display = 'none'; }
function closeCakePopup() { document.getElementById('cake-popup').style.display = 'none'; }
function toggleMusic() {
  const music = document.getElementById('bg-music');
  // Set volume to 0.55 (55%)
  music.volume = 0.55;
  music.paused ? music.play() : music.pause();
}

// Initialize music volume
document.addEventListener('DOMContentLoaded', function() {
  const music = document.getElementById('bg-music');
  if (music) {
    music.volume = 0.55; // Set volume to 55%
  }
});

// Auto-unlock audio on first interaction (mobile fix)
document.body.addEventListener('click', function unlock() {
  const music = document.getElementById('bg-music');
  if (music) {
    music.volume = 0.55; // Ensure volume is set to 55%
    music.play().catch(() => {});
  }
  document.body.removeEventListener('click', unlock);
}, { once: true });

// Add event listener for the birthday cake
document.addEventListener('DOMContentLoaded', function() {
  const cakeElement = document.getElementById('birthday-cake');
  if (cakeElement) {
    cakeElement.addEventListener('click', function() {
      document.getElementById('cake-popup').style.display = 'flex';

      // Create minimal confetti effect
      createMinimalConfetti();
    });
  }
});

// Minimal confetti effect for cake
function createMinimalConfetti() {
  for(let i = 0; i < 15; i++) { // Only 15 pieces instead of 150
    const confetti = document.createElement('div');
    confetti.innerHTML = ['🎂', '♡'][Math.floor(Math.random() * 2)];
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-20px';
    confetti.style.fontSize = Math.random() * 15 + 15 + 'px';
    confetti.style.color = ['#e0b0ff', '#ffb3d1'][Math.floor(Math.random() * 2)];
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Create a subtle shooting star occasionally
let lastShootingStarTime = 0;
function createShootingStar() {
  const now = Date.now();
  if (now - lastShootingStarTime > 5000) { // At least 5 seconds between stars
    lastShootingStarTime = now;

    const star = document.createElement('div');
    star.innerHTML = '✨';
    star.style.position = 'fixed';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 30 + 'vh'; // Higher up
    star.style.fontSize = '20px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '1';
    star.style.animation = 'shoot 1.5s linear forwards';
    document.body.appendChild(star);

    setTimeout(() => star.remove(), 1500);
  }
}

// Create shooting stars occasionally
setInterval(createShootingStar, 8000); // Every 8 seconds

// "I love you" message that appears at mouse position when user stops moving it
let loveTimeout;
let mouseX = 0;
let mouseY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  clearTimeout(loveTimeout);
  loveTimeout = setTimeout(() => {
    const msg = document.createElement('div');
    msg.textContent = 'I love you';
    msg.style.position = 'fixed';
    msg.style.left = mouseX + 'px';
    msg.style.top = (mouseY - 40) + 'px'; // Position above the mouse
    msg.style.font = 'italic 28px Georgia';
    msg.style.color = 'rgba(224,176,255,0.6)'; // More visible
    msg.style.pointerEvents = 'none';
    msg.style.opacity = '0';
    msg.style.animation = 'fadeInFloat 6s forwards';
    msg.style.zIndex = '1000'; // Very high z-index
    msg.style.textShadow = '0 0 15px rgba(147,112,219,0.8)'; // Stronger glow
    msg.style.whiteSpace = 'nowrap';
    msg.style.transform = 'translateX(-50%)'; // Center text on mouse
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 7000);
  }, 200); // Appears after 0.2 second of stillness
});


// ========================
// CSS ANIMATIONS (inject once)
// ========================
const styles = document.createElement('style');
styles.innerHTML = `
  @keyframes floatHeart { to { transform: translateY(-110vh) rotate(360deg); opacity: 0; } }
  @keyframes sparkleFade { 0% { transform: translate(-50%,-50%) scale(0); opacity: 0.8; } 100% { transform: translate(-50%,-50%) scale(3); opacity: 0; } }
  @keyframes drift { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.2; } 100% { transform: translateY(-110vh) translateX(80px); opacity: 0; } }
  @keyframes shoot {
    0% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateX(100vw) translateY(100px) rotate(180deg); opacity: 0; }
  }
  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
  }
  @keyframes fadeIn { from {opacity:0; transform:translateY(20px)} to {opacity:0.35; transform:translateY(0)} }
  @keyframes fadeInFloat {
    0% {opacity:0; transform:translateX(-50%) translateY(0) scale(0.8); }
    50% {opacity:0.6; transform:translateX(-50%) translateY(-20px) scale(1); }
    100% {opacity:0; transform:translateX(-50%) translateY(-40px) scale(0.8); }
  }
`;
document.head.appendChild(styles);

// Big heart popup functionality
function openHeartPopup() {
  document.getElementById('heart-popup').style.display = 'flex';
  createHeartConfetti();
}

function closeHeartPopup() {
  document.getElementById('heart-popup').style.display = 'none';
}

// Add event listener to the big heart
document.addEventListener('DOMContentLoaded', function() {
  const heart = document.getElementById('bigHeart');
  if (heart) {
    heart.addEventListener('click', openHeartPopup);
  }
});

// Create confetti effect when heart is clicked
function createHeartConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    const emojis = ['💖', '💕', '💗', '💓', '💞', '💘', '💝', '💟', '♡', '💜', '💞', '💟'];
    confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.style.position = 'fixed';
    confetti.style.left = '50%';
    confetti.style.top = '50%';
    confetti.style.fontSize = Math.random() * 20 + 20 + 'px';
    confetti.style.opacity = '0';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(confetti);

    // Animate the confetti
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 100;
    const duration = Math.random() * 1000 + 1000;

    confetti.animate([
      {
        opacity: 1,
        transform: 'translate(-50%, -50%)'
      },
      {
        opacity: 0.8,
        transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px))`
      },
      {
        opacity: 0,
        transform: `translate(calc(-50% + ${Math.cos(angle) * distance * 1.5}px), calc(-50% + ${Math.sin(angle) * distance * 1.5}px))`
      }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      fill: 'forwards'
    });

    setTimeout(() => confetti.remove(), duration);
  }
}