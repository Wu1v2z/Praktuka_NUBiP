// Простий SPA-перемикач
const routes = ['home','search','profile','chats'];
const navLinks = document.querySelectorAll('nav a');
const startBtn = document.getElementById('startBtn');
const heroStart = document.getElementById('heroStart');
const learnMore = document.getElementById('learnMore');

function showRoute(name){
  routes.forEach(r=>{
    const el = document.getElementById(r);
    if(!el) return;
    el.style.display = (r===name)?'block':'none';
  })
  // highlight nav
  navLinks.forEach(a=>a.style.opacity = (a.dataset.route===name? '1': '0.85'));
}
navLinks.forEach(a=>a.addEventListener('click', e=>{e.preventDefault();showRoute(a.dataset.route)}));
startBtn.addEventListener('click', ()=>showRoute('search'));
heroStart.addEventListener('click', ()=>showRoute('search'));
learnMore.addEventListener('click', ()=>alert('Легко, приємно і безпечно — реєстрація займе кілька хвилин.'));

// sample data
const people = [
  {id:1,name:'Оля',age:27,photo:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&q=60&w=800&fit=crop',bio:'Кавоманка, люблю мандри і котів.'},
  {id:2,name:'Артур',age:18,photo:'https://i.postimg.cc/5tzt1xTy/photo-2025-09-24-00-06-33.jpg',bio:'зібра весь букет,але не квітів'},
  {id:4,name:'Артем',age:18,photo:'https://i.postimg.cc/kMQtKyjG/photo-2025-09-24-00-01-00.jpg',bio:'Люблю гори та фотографію.'},
  {id:5,name:'Денис',age:18,photo:'https://i.postimg.cc/Vk1gX6BQ/photo-2025-09-24-00-01-36.jpg',bio:'готовий до серйозних стосунків'},
  {id:6,name:'Олександр',age:18,photo:'https://i.postimg.cc/3RPNQsfY/photo-2025-09-23-23-45-24.jpg',bio:'шукаю ту саму'}
];

const peopleGrid = document.getElementById('peopleGrid');
const searchInput = document.getElementById('searchInput');
const ageFilter = document.getElementById('ageFilter');

function renderPeople(list){
  peopleGrid.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('div');card.className='person';
    card.innerHTML = `
      <div class="photo" style="background-image:url('${p.photo}')"></div>
      <div class="info"><div>
        <div class="name">${p.name}, ${p.age}</div>
        <div class="bio">${p.bio}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:12px;color:#6b7280">~3 km</div>
      </div></div>
      <div class="actions">
        <button class="btn btn-light" data-id="${p.id}" data-action="view">Переглянути</button>
        <button class="btn btn-like" data-id="${p.id}" data-action="like">❤</button>
        <button class="btn btn-msg" data-id="${p.id}" data-action="msg">✉</button>
      </div>
    `;
    peopleGrid.appendChild(card);
  })
}
renderPeople(people);

// interactions
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  const action = btn.dataset.action;
  const id = Number(btn.dataset.id);
  if(action==='view'){
    const p = people.find(x=>x.id===id);
    if(p){
      document.getElementById('profileAvatar').style.backgroundImage = `url('${p.photo}')`;
      document.getElementById('profileName').textContent = `${p.name}, ${p.age}`;
      document.getElementById('profileBio').textContent = p.bio;
      showRoute('profile');
    }
  } else if(action==='like'){
    btn.animate([{transform:'scale(1)'},{transform:'scale(1.15)'},{transform:'scale(1)'}],{duration:260});
    btn.textContent = '❤️';
  } else if(action==='msg'){
    const p = people.find(x=>x.id===id);
    if(p){
      addChat(p.name, p.photo, 'Привіт! Мені б хотілося познайомитись.');
      showRoute('chats');
    }
  }
})

// search filter
function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const age = ageFilter.value;
  let filtered = people.filter(p=>{
    const matchesQ = !q || p.name.toLowerCase().includes(q) || p.bio.toLowerCase().includes(q);
    let matchesAge = true;
    if(age!=='any'){
      const [min,max]=age.split('-').map(Number);
      matchesAge = p.age>=min && p.age<=max;
    }
    return matchesQ && matchesAge;
  });
  renderPeople(filtered);
}
searchInput.addEventListener('input', applyFilters);
ageFilter.addEventListener('change', applyFilters);

// chats
const chatsList = document.getElementById('chatsList');
const chats = [
  {name:'Оля',last:'Готова зустрітись цього тижня?',photo:people[0].photo},
  {name:'Макс',last:'Я відправив трек — послухай :)',photo:people[1].photo}
];
function renderChats(){
  chatsList.innerHTML='';
  chats.forEach(c=>{
    const it = document.createElement('div');it.className='chat-item';
    it.innerHTML = `<div style="width:56px;height:56px;border-radius:10px;background-image:url('${c.photo}');background-size:cover"></div>
                    <div style="flex:1">
                      <div style="font-weight:700">${c.name}</div>
                      <div class="preview">${c.last}</div>
                    </div>
                    <div style="font-size:12px;color:#9ca3af">15:42</div>`;
    chatsList.appendChild(it);
  })
}
function addChat(name,photo,last){
  chats.unshift({name,photo,last}); if(chats.length>10) chats.pop(); renderChats();
}
renderChats();

// start on home
showRoute('home');
