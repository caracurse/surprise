(function makePetals(){
  const layer = document.getElementById('petals');
  for(let i=0;i<20;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random()*100 + '%';
    p.style.animationDuration = (12 + Math.random()*14) + 's';
    p.style.animationDelay = (Math.random()*18) + 's';
    p.style.setProperty('--drift', (Math.random()*160 - 80) + 'px');
    p.style.opacity = 0.25 + Math.random()*0.5;
    p.style.transform = `scale(${0.5 + Math.random()*0.9})`;
    layer.appendChild(p);
  }
})();


function goTo(n){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const target = document.querySelector(`.screen[data-step="${n}"]`);
  if(target) target.classList.add('active');

  // прогресс
  const progress = document.getElementById('progress');
  progress.classList.toggle('show', n >= 1 && n <= 4);
  document.querySelectorAll('.dot').forEach(d=>{
    d.classList.toggle('active', +d.dataset.step <= n);
  });


  if(n === 2) startHeartsGame();
  if(n === 4) startFinalLetter();
}

function next(n){ goTo(n); }


function openLetter(){
  const card = document.getElementById('sealedCard');
  if(card.classList.contains('opening')) return;
  card.classList.add('opening');
  setTimeout(()=>{
    goTo(1);
    typeText('greetTitle', 'Привет, любимая', 90);
  }, 1000);
}

function typeText(id, text, speed=80){
  const el = document.getElementById(id);
  el.textContent = '';
  let i = 0;
  const interval = setInterval(()=>{
    el.textContent += text[i];
    i++;
    if(i >= text.length) clearInterval(interval);
  }, speed);
}


let heartsFound = 0;
let heartsGameStarted = false;

function startHeartsGame(){
  if(heartsGameStarted) return;
  heartsGameStarted = true;
  heartsFound = 0;
  document.getElementById('foundCount').textContent = '0';
  document.getElementById('counter').classList.add('show');
  document.getElementById('heartsNext').classList.remove('show');
  document.getElementById('heartsNext').style.display = 'none';


  const positions = [
    {x: 8,  y: 18},
    {x: 88, y: 22},
    {x: 14, y: 78},
    {x: 85, y: 74},
    {x: 50, y: 90}
  ];

  const layer = document.createElement('div');
  layer.className = 'hearts-layer';
  layer.id = 'heartsLayer';
  document.body.appendChild(layer);

  positions.forEach((pos, i)=>{
    const h = document.createElement('div');
    h.className = 'hidden-heart';
    h.style.left = pos.x + '%';
    h.style.top = pos.y + '%';
    h.style.animationDelay = (i * 0.4) + 's';
    h.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
        <path d="M12 21s-7.5-4.8-9.8-9.2C.6 8.4 2.3 4.8 5.6 4.1 8 3.6 10.2 4.8 12 7c1.8-2.2 4-3.4 6.4-2.9 3.3.7 5 4.3 3.4 7.7C19.5 16.2 12 21 12 21z"/>
      </svg>`;
    h.onclick = () => collectHeart(h);
    setTimeout(()=> h.classList.add('revealed'), 400 + i * 250);
    layer.appendChild(h);
  });
}

function collectHeart(el){
  if(el.classList.contains('found')) return;
  el.classList.add('found');
  heartsFound++;
  document.getElementById('foundCount').textContent = heartsFound;

  if(heartsFound === 5){
    setTimeout(()=>{
      const btn = document.getElementById('heartsNext');
      btn.style.display = 'inline-block';
      requestAnimationFrame(()=> btn.classList.add('show'));
      document.getElementById('counter').classList.remove('show');
    }, 700);
  }
}


let finalStarted = false;
function startFinalLetter(){
  if(finalStarted) return;
  finalStarted = true;

  const text = `Я не всегда умею находить правильные слова вслух.\n\nНо я знаю точно: с тобой даже обычный серый день становится тёплым и ярким.\n\nСпасибо, что ты рядом.\n\nЯ очень сильно тебя люблю и счастлив, что ты у меня есть ❤️`;
  const el = document.getElementById('finalText');
  el.innerHTML = '<span class="cursor"></span>';

  let i = 0;
  const speed = 38;
  const interval = setInterval(()=>{
    if(i < text.length){
      const cursor = el.querySelector('.cursor');
      if(text[i] === '\n'){
        cursor.insertAdjacentHTML('beforebegin','<br>');
      } else {
        cursor.insertAdjacentText('beforebegin', text[i]);
      }
      i++;
    } else {
      clearInterval(interval);
      const cursor = el.querySelector('.cursor');
      setTimeout(()=> cursor && cursor.remove(), 1500);
      document.getElementById('hintBox').classList.add('show');
    }
  }, speed);
}

function restart(){
  heartsGameStarted = false;
  heartsFound = 0;
  finalStarted = false;
  const layer = document.getElementById('heartsLayer');
  if(layer) layer.remove();
  document.getElementById('finalText').innerHTML = '';
  document.getElementById('hintBox').classList.remove('show');
  document.getElementById('counter').classList.remove('show');
  const card = document.getElementById('sealedCard');
  card.classList.remove('opening');
  document.getElementById('greetTitle').textContent = '';

  goTo(0); 
}