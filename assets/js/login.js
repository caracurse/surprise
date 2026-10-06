(function makePetals(){
  const layer = document.getElementById('petals');
  for(let i=0;i<18;i++){
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


function toggleHint(){
  document.getElementById('hintTip').classList.toggle('show');
}


const CORRECT_USER = 'принцесса';
const CORRECT_PASS = '250625';


function handleLogin(){
  const user = document.getElementById('userInput').value.trim().toLowerCase();
  const pass = document.getElementById('passInput').value.trim().toLowerCase();
  const btn = document.getElementById('loginBtn');
  const err = document.getElementById('errorMsg');
  const fUser = document.getElementById('fieldUser');
  const fPass = document.getElementById('fieldPass');

  err.classList.remove('show');
  fUser.classList.remove('error');
  fPass.classList.remove('error');

  if(user === CORRECT_USER && pass === CORRECT_PASS){
    btn.textContent = 'Открываю...';
    const card = document.getElementById('loginCard');
    card.classList.add('success-state');

    setTimeout(()=>{
      card.classList.add('leaving');
      window.location.href = './pages/surprise.html';
      setTimeout(()=>{
        card.classList.remove('leaving');
        card.classList.remove('success-state');
        btn.textContent = 'Войти в нашу историю';
        document.querySelector('.success-sub').textContent =
          'тут будет переход на index.html';
      }, 900);
    }, 1600);

  } else {
    if(user !== CORRECT_USER) fUser.classList.add('error');
    if(pass !== CORRECT_PASS) fPass.classList.add('error');
    err.classList.add('show');
    document.getElementById('passInput').value = '';
    setTimeout(()=>{
      fUser.classList.remove('error');
      fPass.classList.remove('error');
    }, 900);
  }
}
