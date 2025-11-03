const canvas = document.getElementById('petalos');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const petalos = [];

// 👉 Cambia esta ruta por la imagen que quieras (petalo, corazón, etc.)
const petaloImg = new Image();
petaloImg.src = 'cora.png';

class Petalo {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.size = 20 + Math.random() * 25;
    this.speed = 0.5 + Math.random() * 2;
    this.swing = Math.random() * 2; 
    this.angle = Math.random() * Math.PI * 2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
  }
  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * this.swing;
    this.angle += 0.02;
    this.rotation += this.rotationSpeed;

    if (this.y > height + 30) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(petaloImg, -this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

for (let i = 0; i < 50; i++) petalos.push(new Petalo());

function animarPetalos() {
  ctx.clearRect(0, 0, width, height);
  petalos.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animarPetalos);
}

petaloImg.onload = animarPetalos;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
