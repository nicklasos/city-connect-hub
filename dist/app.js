const isEnglish = document.documentElement.lang === 'en';
const openMenuLabel = isEnglish ? 'Open menu' : 'Відкрити меню';
const closeMenuLabel = isEnglish ? 'Close menu' : 'Закрити меню';
const communityLabel = isEnglish ? 'Community working with CITI' : 'Громада у співпраці з CITI';
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function setMenuOpen(open) {
  menu?.setAttribute('aria-expanded', String(open));
  menu?.setAttribute('aria-label', open ? closeMenuLabel : openMenuLabel);
  navigation?.classList.toggle('open', open);
}

menu?.addEventListener('click', () => setMenuOpen(menu.getAttribute('aria-expanded') !== 'true'));
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menu.focus();
  }
});

const languageLink = document.querySelector('[data-language-link]');
if (languageLink) {
  const target = new URL(languageLink.href);
  function updateLanguageLink() {
    target.hash = window.location.hash;
    languageLink.href = target.href;
  }
  window.addEventListener('hashchange', updateLanguageLink);
  updateLanguageLink();
}

const mapPins=[...document.querySelectorAll('[data-map-index]')];
const cityChoices=[...document.querySelectorAll('[data-city-choice]')];
let selectedCity=Number(mapPins.find(p=>p.classList.contains('selected'))?.dataset.mapIndex||0);
function selectCity(index){if(!mapPins.length)return;selectedCity=(index+mapPins.length)%mapPins.length;const pin=mapPins[selectedCity];mapPins.forEach(p=>{const active=p===pin;p.classList.toggle('selected',active);p.setAttribute('aria-pressed',String(active))});cityChoices.forEach(c=>{const active=Number(c.dataset.cityChoice)===selectedCity;c.classList.toggle('selected',active);c.setAttribute('aria-pressed',String(active))});document.getElementById('map-city-name').textContent=pin.dataset.mapName;document.getElementById('map-city-region').textContent=pin.dataset.mapRegion || communityLabel;document.getElementById('map-city-counter').textContent=String(selectedCity+1).padStart(2,'0')+' / '+mapPins.length;}
mapPins.forEach(p=>{p.addEventListener('click',()=>selectCity(Number(p.dataset.mapIndex)));p.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();selectCity(selectedCity+(['ArrowLeft','ArrowUp'].includes(e.key)?-1:1));mapPins[selectedCity].focus()}})});
cityChoices.forEach(c=>c.addEventListener('click',()=>selectCity(Number(c.dataset.cityChoice))));
document.getElementById('map-city-prev')?.addEventListener('click',()=>selectCity(selectedCity-1));
document.getElementById('map-city-next')?.addEventListener('click',()=>selectCity(selectedCity+1));
if(mapPins.length)selectCity(selectedCity);
const cityInput=document.getElementById('city-search');
const normalize=s=>s.toLocaleLowerCase('uk').replace(/[’'ʼ\-]/g,'').replace(/\s+/g,' ').trim();
cityInput?.addEventListener('input',()=>{const query=normalize(cityInput.value);let count=0;cityChoices.forEach(c=>{const match=normalize(c.dataset.searchName).includes(query);c.hidden=!match;if(match)count++});document.getElementById('city-results').textContent=query ? (isEnglish ? `Communities found: ${count}` : `Знайдено громад: ${count}`) : (isEnglish ? `All ${cityChoices.length} communities` : `Усі ${cityChoices.length} громади`);document.querySelector('.city-empty').hidden=count!==0});

if('IntersectionObserver'in window){
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(!reduced){document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}
 const download=document.getElementById('download'),mobile=document.querySelector('.mobile-download');if(download&&mobile){const observer=new IntersectionObserver(entries=>entries.forEach(e=>mobile.classList.toggle('offscreen',e.isIntersecting)),{threshold:.05});observer.observe(download)}
}
