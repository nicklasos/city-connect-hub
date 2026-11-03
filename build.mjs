import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { englishCities, englishRegions, englishServices, englishFaqs } from './content-en.mjs';
const assetVersion = name => createHash('sha256').update(fs.readFileSync(new URL('./dist/' + name, import.meta.url))).digest('hex').slice(0, 12);
const screenshotPath = name => '/assets/' + name + '.png';

const siteUrl = new URL(process.env.SITE_ORIGIN || 'https://citi-your-everyday-city.nicespark32.chatgpt.site');
if (siteUrl.protocol !== 'https:' || siteUrl.href !== siteUrl.origin + '/') {
  throw new Error('SITE_ORIGIN must be a bare HTTPS origin.');
}
const origin = siteUrl.origin;
const supportEmail = 'info@citi.top';
const appStoreRating = 4.8;
const legal = {privacy: 'https://myciti.app/privacy.html', terms: 'https://myciti.app/tos.html'};
const languages = ['uk', 'en'];
const languagePath = (lang, route = '/') => lang === 'en' ? '/en' + route : route;
const alternates = route => [
  ['uk', origin + languagePath('uk', route)],
  ['en', origin + languagePath('en', route)],
  ['x-default', origin + route],
];
const jsonLd = data => JSON.stringify(data).replaceAll('<', '\\u003c');

function writePage(url, html) {
  const filename = url.endsWith('/') ? path.join('dist', url, 'index.html') : path.join('dist', url);
  fs.mkdirSync(path.dirname(filename), {recursive: true});
  fs.writeFileSync(filename, html);
}

function screenshotSize(name) {
  const png = fs.readFileSync('dist/assets/' + name + '.png');
  return `width="${png.readUInt32BE(16)}" height="${png.readUInt32BE(20)}"`;
}
const apple = 'https://apps.apple.com/ua/app/%D1%81%D1%96%D1%82%D1%96/id6759605321';
const play = 'https://play.google.com/store/apps/details?id=top.citi.app&hl=uk';
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const cities = [
['Черкаси','Черкаська область'],['Полтава','Полтавська область'],['Баштанка','Миколаївська область'],['Бердичів','Житомирська область'],['Білецька громада','с. Біла, Тернопільська область'],['Бурштин','Івано-Франківська область'],['Варковичі','Рівненська область'],['Веселинівка','Миколаївська область'],['Вознесенськ','Миколаївська область'],['Глухів','Сумська область'],['Жовті Води','Дніпропетровська область'],['Здолбунів','Рівненська область'],['Златопіль','Харківська область'],['Золотоноша','Черкаська область'],['Канів','Черкаська область'],['Клевань','Рівненська область'],['Ковель','Волинська область'],['Корнин','Житомирська область'],['Коростень','Житомирська область'],['Лохвиця','Полтавська область'],['Миргород','Полтавська область'],['Новопокровська громада','Новопокровка, Харківська область'],['Охтирка','Сумська область'],['Переяслав','Київська область'],['Петрівсько-Роменська громада','Полтавська область'],['Світловодська громада','Кіровоградська область'],['Семенівська громада','Полтавська область'],['Скороходівська громада','Полтавська область'],['Старокостянтинів','Хмельницька область'],['Тетіїв','Київська область'],['Чуднів','Житомирська область'],['Солотвино','Закарпатська область'],['Берестинська громада','Харківська область'],['Фурсівська громада','Київська область']
].map(([name])=>[name,({'Білецька громада':'с. Біла, Тернопільська область','Новопокровська громада':'Новопокровка, Харківська область','Семенівська громада':'Полтавська область','Солотвино':'Закарпатська область','Фурсівська громада':'Київська область'})[name]||'']).sort((a,b)=>a[0].localeCompare(b[0],'uk'));

const icons = {
 arrow:'<path d="M5 19 19 5M5 5h14v14"/>',
 bus:'<rect x="5" y="3" width="14" height="17" rx="4"/><path d="M5 11h14M8 20v2m8-2v2M8 15h1m6 0h1M9 6h6"/>',
 spark:'<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z"/>',
 bolt:'<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z"/>',
 map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15"/>',
 bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M9 21h6"/>',
 news:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 7h8M8 11h8M8 15h3m3 0h2M8 18h8"/>',
 poll:'<path d="M4 20h16M6 16V9m6 7V4m6 12v-5"/>',
 chat:'<path d="M21 11a9 9 0 0 1-9 9H4l-2 2v-11a9 9 0 0 1 19 0ZM7 10h10M7 14h6"/>',
 parking:'<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
 discount:'<path d="m3 3 9 0 10 10-9 9L3 12V3Z"/><circle cx="8" cy="8" r="1"/><path d="m12 10 5 5"/>',
 air:'<path d="M3 8h12a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h7a3 3 0 1 1-3 3"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 2v6m10-6v6M3 11h18m-13 4h2m4 0h2"/>',
 home:'<path d="m3 10 9-8 9 8v11H3V10Zm6 11v-7h6v7"/>',
 history:'<path d="M3 10h18M5 10v10m5-10v10m4-10v10m5-10v10M2 22h20M3 7l9-5 9 5H3Z"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 apple:'<path d="M16 3c-1 0-3 1-3 3 2 0 3-1 3-3Z"/><path d="M12 8c-4-3-8 0-7 5 1 5 3 8 5 7l2-1 2 1c2 1 4-3 5-5-3-1-4-5-1-7-2-2-4-2-6 0Z"/>',
 play:'<path d="m5 3 15 9-15 9V3Z"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',
 plus:'<path d="M12 4v16M4 12h16"/>'
};
const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.spark}</svg>`;
const ukrainianServices = [
{slug:'transport',icon:'bus',title:'Транспорт онлайн',tag:'Щодня',image:'transport',lead:'Знай, де твій автобус. І коли виходити.',desc:'Стеж за рухом автобусів і тролейбусів, переглядай маршрути та прогноз прибуття на свою зупинку.',benefits:['Рух транспорту на мапі','Маршрути та потрібні зупинки','Прогнозований час прибуття'],body:'Зранку на роботу, вдень у справах або ввечері додому — зручніше виходити до зупинки, коли знаєш, де потрібний транспорт. CITI допомагає побачити маршрут, знайти зупинку та зорієнтуватися в часі прибуття.',scenario:'Збираєшся виходити з дому? Спочатку перевір потрібний маршрут і прогноз прибуття. Так легше спланувати дорогу до зупинки й уникнути зайвого очікування.',note:'Прогноз залежить від руху транспорту та оновлення даних перевізника. Доступність онлайн-відстеження відрізняється за містами.'},
{slug:'ai-assistant',icon:'spark',title:'AI-помічник міста',tag:'Щодня',image:'ai',lead:'Міське питання? Просто запитай.',desc:'Де ЦНАП, як отримати послугу, які документи потрібні — запитуй звичайною мовою.',benefits:['Відповіді на міські запитання','Пояснення послуг і документів','Допомога з пошуком потрібного сервісу'],body:'Не завжди зрозуміло, до якої установи звернутися або з чого почати оформлення послуги. AI-помічник допомагає розібратися в муніципальних питаннях: знайти ЦНАП, дізнатися про послуги та наступні кроки. Можна запитати й про допомогу, доступну людям з інвалідністю або іншим статусом.',scenario:'Потрібна послуга, але не знаєш її офіційної назви? Опиши свою ситуацію своїми словами. Помічник допоможе зорієнтуватися та знайти потрібну інформацію.',note:'Помічник працює з міською інформацією. Умови отримання послуг і перелік документів варто звіряти з установою, яка їх надає.'},
{slug:'power-outages',icon:'bolt',title:'Графіки відключень',tag:'Щодня',image:'power',lead:'Плани на день — з урахуванням світла.',desc:'Переглядай графік відключень і час до очікуваного повернення електропостачання.',benefits:['Графік відключень','Час до очікуваної зміни','Зручне планування щоденних справ'],body:'Робочий дзвінок, приготування вечері чи заряджання техніки простіше планувати, коли графік під рукою. У CITI можна подивитися періоди відключень та зорієнтуватися, коли за графіком має з’явитися світло.',scenario:'Плануєш працювати з дому? Перевір періоди зі світлом, заздалегідь заряди пристрої та перенеси справи, для яких потрібне електропостачання.',note:'Графіки можуть змінюватися. Час відновлення є очікуваним за графіком і не враховує непередбачені аварійні ситуації.'},
{slug:'city-maps',icon:'map',title:'Мапи міських сервісів',tag:'Безпека',image:'map',lead:'Потрібне місце — ближче, ніж здається.',desc:'Укриття, пункти незламності, питна вода, електрозарядки та інші корисні точки з фільтрами.',benefits:['Укриття та пункти незламності','Питна вода й зарядки для електромобілів','Фільтри за категоріями об’єктів'],body:'Міські сервіси не мають губитися серед десятків вкладок і повідомлень. На інтерактивній мапі CITI можна обрати потрібні категорії та побачити розташування корисних об’єктів: від укриттів і пунктів незламності до води та зарядних станцій.',scenario:'Опинився в незнайомій частині міста? Відкрий мапу й увімкни потрібний фільтр, щоб знайти об’єкт, який шукаєш.',note:'Категорії та наповнення мап залежать від даних, доступних у конкретній громаді.'},
{slug:'air-alerts',icon:'bell',title:'Повітряні тривоги',tag:'Безпека',image:'alerts',lead:'Важливий статус — перед очима.',desc:'Різні рівні повітряної тривоги та статус на екрані блокування iPhone через Live Activities.',benefits:['Підтримка різних рівнів тривоги','Live Activities на iOS','Поточний статус без відкриття застосунку'],body:'CITI підтримує різні рівні повітряної тривоги, зокрема жовтий і червоний. На сумісних iPhone статус можна бачити через Live Activities на екрані блокування — без необхідності щоразу відкривати застосунок.',scenario:'Телефон заблоковано, а тобі потрібно перевірити поточний статус? Live Activities допомагає побачити його з одного погляду.',note:'Live Activities доступні на сумісних пристроях iOS і залежать від системних налаштувань. Статуси в макетах сайту — приклади інтерфейсу, а не повідомлення про поточну ситуацію.'},
{slug:'city-news',icon:'news',title:'Новини та події',tag:'Щодня',image:'citi-city-news-feed',lead:'Знай, чим живе твоє місто.',desc:'Останні новини, важливі місцеві оголошення та події — в одній стрічці.',benefits:['Новини міста','Анонси та міські події','Важливі місцеві оголошення'],body:'Що змінилося в місті, які події готуються та на що варто звернути увагу? Стрічка CITI допомагає бути в курсі місцевого життя й знаходити актуальну інформацію в одному застосунку.',scenario:'Хочеш дізнатися, що відбувається поруч? Відкрий новини свого міста й переглянь останні публікації та анонси.',note:'Новини та оголошення наповнюються для конкретної громади.'},
{slug:'city-polls',icon:'poll',title:'Міські опитування',tag:'Участь',image:'polls',lead:'Твоя думка має місце в місті.',desc:'Бери участь у голосуваннях, ділися своєю позицією та долучайся до міських змін.',benefits:['Опитування від міста','Участь у голосуваннях','Можливість висловити свою думку'],body:'Коли місто запитує думку мешканців, відповісти можна через CITI. Опитування допомагають поділитися позицією щодо місцевих питань і долучитися до обговорення того, яким має бути місто.',scenario:'Місто збирає думки про події або місцеву ініціативу? Прочитай опис опитування та обери відповідь, яка відображає твою позицію.',note:'Перелік активних опитувань і правила участі визначаються конкретною громадою. Участь не означає автоматичного ухвалення обраного рішення.'},
{slug:'city-requests',icon:'chat',title:'Звернення до міста',tag:'Участь',image:'requests',lead:'Бачиш проблему? Повідом місту.',desc:'Не працює освітлення чи пошкоджена дорога? Надішли звернення до мерії та отримай відповідь.',benefits:['Повідомлення про міські проблеми','Звернення до мерії','Зворотний зв’язок щодо звернення'],body:'Відсутнє вуличне освітлення, пошкоджене дорожнє покриття або інша проблема міського простору — через CITI можна звернути увагу міста на ситуацію та отримати відповідь.',scenario:'Помітив проблему дорогою додому? Опиши, що сталося та де саме, щоб команда міста могла зрозуміти суть звернення.',note:'Порядок розгляду та відповіді залежать від роботи відповідальних служб громади.'},
{slug:'parking',icon:'parking',title:'Паркування',tag:'Незабаром',status:'Тестується',image:'parking',lead:'Знайти паркінг. Оформити. Піти у справах.',desc:'Безкоштовні й платні, міські та приватні парковки. Вибір паркінгу й швидке оформлення.',benefits:['Платні та безкоштовні парковки','Міські та приватні паркінги','Швидке оформлення паркування'],body:'Сервіс паркування об’єднає пошук і оформлення в одному місці. Можна буде переглядати міські та приватні парковки, обирати потрібний паркінг і швидко оформлювати паркування в застосунку.',scenario:'Приїхав у справах до центру? Знайди потрібний паркінг, переглянь його умови та оформи паркування.',note:'Сервіс тестується. Запуск і доступні можливості залежать від міста та оператора паркування.'},
{slug:'city-discounts',icon:'discount',title:'Знижки для містян',tag:'Щодня',image:'discounts',lead:'Жити у своєму місті — ще й вигідно.',desc:'Знаходь ексклюзивні місцеві знижки та спеціальні пропозиції у своєму місті.',benefits:['Місцеві спеціальні пропозиції','Ексклюзивні знижки','Умови пропозицій у застосунку'],body:'У CITI можна переглядати спеціальні пропозиції для містян і знаходити можливості заощадити у своєму місті. Усі доступні знижки зібрані в окремому розділі застосунку.',scenario:'Плануєш покупки чи інші витрати в місті? Переглянь доступні пропозиції та їхні умови перед тим, як скористатися знижкою.',note:'Пропозиції, строки дії та умови визначають їхні організатори. Наявність знижок відрізняється за містами.'},
{slug:'air-quality',icon:'air',title:'Якість повітря',tag:'Щодня',image:'air',lead:'Відкрити вікно? Спочатку подивись на повітря.',desc:'Перевір індекс якості повітря, щоб обрати час для провітрювання або прогулянки.',benefits:['Індекс якості повітря в місті','Орієнтир для провітрювання','Планування прогулянок і вигулу собаки'],body:'Іноді перед прогулянкою корисно перевірити не лише погоду. Індекс якості повітря в CITI допомагає зорієнтуватися в поточних умовах у місті та обрати час для виходу надвір або провітрювання.',scenario:'Збираєшся на прогулянку із собакою чи хочеш відкрити вікна? Переглянь доступні показники якості повітря, щоб мати більше інформації для рішення.',note:'Індекс є інформаційним орієнтиром. Показники залежать від джерел даних і розташування вимірювальних станцій.'},
{slug:'cnap',icon:'calendar',title:'Онлайн-запис до ЦНАПу',tag:'Незабаром',status:'У розробці',image:'cnap',lead:'Свій час — для своїх справ.',desc:'Онлайн-запис на прийом, електронний квиток та оплата послуг — незабаром у CITI.',benefits:['Запис на прийом онлайн','Електронний квиток','Оплата послуг'],body:'Готуємо сервіс, який допоможе планувати візит до ЦНАПу через застосунок: записатися на прийом, отримати електронний квиток і сплатити послуги.',scenario:'Потрібно відвідати ЦНАП? Після запуску сервісу можна буде оформити запис у застосунку й зберегти електронний квиток.',note:'Сервіс у розробці. Доступність після запуску залежатиме від підключення ЦНАПів у конкретній громаді.'},
{slug:'utilities',icon:'home',title:'Комунальні послуги',tag:'Незабаром',status:'Незабаром',image:'utilities',lead:'Рахунки й показання — в одному місці.',desc:'Перевірка заборгованості, оплата комуналки та передавання показань лічильників.',benefits:['Перегляд заборгованості','Оплата комунальних послуг','Передавання показань лічильників'],body:'Готуємо комунальні послуги в CITI, щоб щомісячні справи було зручніше виконувати в одному застосунку. Сервіс дозволить переглядати заборгованість, сплачувати рахунки та передавати показання лічильників.',scenario:'Наприкінці місяця потрібно передати показання й перевірити рахунки? Після запуску сервісу ці дії будуть доступні в розділі комунальних послуг.',note:'Сервіс незабаром з’явиться. Набір доступних постачальників і можливостей залежатиме від підключень у громаді.'},
{slug:'city-history',icon:'history',title:'Історія міста',tag:'Щодня',image:'history',lead:'Знайоме місто. Нові відкриття.',desc:'Дізнавайся про минуле міста, його особливості та цікаві факти, про які мало хто знає.',benefits:['Історія свого міста','Маловідомі цікаві факти','Нове знайомство з місцевими історіями'],body:'Навіть у місті, де живеш роками, залишається багато невідомого. У CITI можна більше дізнатися про його минуле, особливості та цікаві факти, які допоможуть побачити знайомі місця по-новому.',scenario:'Хочеш ближче познайомитися зі своїм містом або розповісти про нього друзям? Зазирни в розділ про місто та відкрий для себе його історії.',note:'Наповнення розділу залежить від матеріалів конкретної громади.'}
];

const ukrainianFaqs=[
['Що таке CITI?','CITI — застосунок, який об’єднує міську інформацію та сервіси: транспорт, новини, мапи, опитування, звернення, повітряні тривоги й інші можливості. Обери свою громаду, щоб побачити доступні для неї сервіси.'],
['Чи всі функції доступні в моєму місті?','Набір сервісів залежить від громади та підключених джерел даних. Частина можливостей уже працює, інші тестуються або готуються до запуску. Актуальний набір можна переглянути в застосунку після вибору громади.'],
['Як знайти своє місто?','Перевір список громад на цьому сайті. Він включає громади, з якими CITI вже працює або починає роботу. Потім завантаж застосунок і знайди свою громаду. Її присутність у списку співпраці ще не означає, що всі сервіси вже запущені.'],
['Чи є застосунок для iPhone та Android?','Так, CITI можна завантажити з App Store та Google Play. Live Activities для статусу тривоги доступні на сумісних пристроях iOS.'],
['Коли з’являться комунальні послуги та запис до ЦНАПу?','Ці сервіси готуються до запуску. Паркування проходить тестування. Строки та доступність залежать від підключень у конкретній громаді; стеж за оновленнями CITI.'],
['Що робити, якщо моя громада ще не підключена?','Якщо ти представляєш громаду або хочеш ініціювати підключення CITI у своєму місті, перейди на сайт для цифрових лідерів і зв’яжися з командою. Там можна дізнатися про платформу та процес запуску.']
];

function buildLanguage(lang) {
const isEnglish = lang === 'en';
const t = (ukrainian, english) => isEnglish ? english : ukrainian;
const routeTo = route => languagePath(lang, route);
const home = routeTo('/');
const services = ukrainianServices.map(service => {
  if (!isEnglish) return service;
  if (!englishServices[service.slug]) throw new Error('Missing translation for ' + service.slug);
  return {...service, ...englishServices[service.slug]};
});
const faqs = isEnglish ? englishFaqs : ukrainianFaqs;
const cityName = name => isEnglish ? englishCities[name] : name;
const cityRegion = region => isEnglish && region ? englishRegions[region] : region;
const ratingText = new Intl.NumberFormat(lang, {minimumFractionDigits: 1}).format(appStoreRating);
const rating = `<a class="store-rating" href="${apple}" target="_blank" rel="noopener" aria-label="${t('Оцінка в App Store', 'App Store rating')} ${ratingText} ${t('із 5', 'out of 5')}"><span aria-hidden="true">★</span> <strong>${ratingText}</strong><span class="rating-store">App Store</span></a>`;
const appLinks=(cls='')=>`<div class="store-links ${cls}"><a class="store-button" href="${apple}" target="_blank" rel="noopener">${icon('apple')}<span><small>${t("Завантажити в", "Download on")}</small>App Store</span>${icon('arrow')}</a><a class="store-button" href="${play}" target="_blank" rel="noopener">${icon('play')}<span><small>${t("Завантажити в", "Download on")}</small>Google Play</span>${icon('arrow')}</a></div>`;
const logo=`<img class="brand-logo" src="/assets/citi-logo.png" alt="CITI" width="100" height="100"><span class="brand-text">${t("твоє місто поруч", "your city, closer")}</span>`;
const header = route => `<a class="skip" href="#main">${t('Перейти до вмісту', 'Skip to content')}</a>
<header class="header"><div class="nav-wrap">
  <a class="brand" href="${home}" aria-label="${t('CITI — на головну', 'CITI home')}">${logo}</a>
  <nav id="navigation" aria-label="${t('Основна навігація', 'Main navigation')}">
    <a href="${home}#features">${t('Можливості', 'Features')}</a>
    <a href="${home}#communities">${t('Громади', 'Communities')}</a>
    <a href="${home}#start">${t('Як почати', 'Get started')}</a>
    <a href="${home}#faq">${t('Питання', 'FAQ')}</a>
  </nav>
  <div class="nav-actions">
    <a class="nav-leaders" href="https://citi.org.ua/" target="_blank" rel="noopener">${t('Для громад', 'For municipalities')} ${icon('arrow')}</a>
    <div class="language-switch" role="group" aria-label="${t('Мова сайту', 'Site language')}">
      ${languages.map(language => language === lang
        ? `<span aria-current="page" lang="${language}">${language === 'uk' ? 'UA' : 'EN'}</span>`
        : `<a href="${languagePath(language, route)}" data-language-link lang="${language}" hreflang="${language}" aria-label="${language === 'uk' ? 'Українська' : 'English'}">${language === 'uk' ? 'UA' : 'EN'}</a>`).join('')}
    </div>
    <a class="button small" href="${home}#download">${t('Завантажити', 'Download')} ${icon('arrow')}</a>
    <button class="menu-toggle" aria-label="${t('Відкрити меню', 'Open menu')}" aria-expanded="false" aria-controls="navigation"><span></span><span></span></button>
  </div>
</div></header>`;

const footer = () => `<footer class="footer wrap">
  <div class="footer-top">
    <a class="brand" href="${home}">${logo}</a>
    <p>${t('Зручніше жити у своєму місті.', 'Make everyday life in your city easier.')}</p>
    <a href="mailto:${supportEmail}">${supportEmail} ${icon('arrow')}</a>
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} CITI</span>
    <a href="${legal.privacy}" hreflang="uk">${t('Політика конфіденційності', 'Privacy Policy')}</a>
    <a href="${legal.terms}" hreflang="uk">${t('Умови користування', 'Terms of Use')}</a>
    <a href="https://citi.org.ua/" target="_blank" rel="noopener">${t('CITI для громад', 'CITI for municipalities')} ${icon('arrow')}</a>
    <a href="#main">${t('На початок', 'Back to top')} ↑</a>
  </div>
</footer><a class="mobile-download" href="${home}#download">${t('Завантажити CITI', 'Download CITI')} ${icon('arrow')}</a>`;

const contact = () => `<section class="contact-section wrap" id="contact" aria-labelledby="contact-heading">
  <div><div class="eyebrow">${t('КОНТАКТИ', 'CONTACT')}</div>
    <h2 id="contact-heading">${t('Є питання? Напишіть нам.', 'Questions? Get in touch.')}</h2>
    <p>${t('Допоможемо розібратися із застосунком і підкажемо, які сервіси доступні у твоїй громаді.', 'We can help you use the app and find out which services are available in your community.')}</p>
  </div>
  <a class="button outline" href="mailto:${supportEmail}">${supportEmail} ${icon('arrow')}</a>
</section>`;
const download=()=>`<section class="download" id="download" aria-labelledby="download-heading"><div class="wrap download-inner"><div class="download-copy"><div class="eyebrow light">CITI · iOS & Android</div><h2 id="download-heading">${t("Твоє місто.", "Your city.")}<br>${t("Завжди ", "Always ")}<span>${t("поруч.", "close by.")}</span></h2><p>${t("Завантаж CITI, обери свою громаду", "Download CITI, choose your community")}<br class="desktop">${t(" й відкрий сервіси для свого дня.", " and discover the services available to you.")}</p>${appLinks()}${rating}<small class="availability">${t("Доступність сервісів залежить від громади.", "Services vary by community.")}</small></div><div class="download-qr-panel"><h3>${t("Наведи камеру.", "Point your camera.")}<br><span>${t("Місто вже поруч.", "Your city is right here.")}</span></h3><p>${t("Відскануй QR-код своїм телефоном", "Scan the QR code with your phone")}<br>${t("і завантаж CITI.", "to download CITI.")}</p><div class="qr-cards"><a class="qr-card" href="${apple}" target="_blank" rel="noopener" aria-label="${t("QR-код для завантаження CITI в App Store", "QR code to download CITI on the App Store")}"><img src="/assets/qr-app-store.svg" width="176" height="176" alt="${t("QR-код: CITI в App Store", "QR code for CITI on the App Store")}" loading="lazy"><span>${icon('apple')}<span><small>${t("Для iPhone", "For iPhone")}</small>App Store</span>${icon('arrow')}</span></a><a class="qr-card" href="${play}" target="_blank" rel="noopener" aria-label="${t("QR-код для завантаження CITI в Google Play", "QR code to download CITI on Google Play")}"><img src="/assets/qr-google-play.svg" width="176" height="176" alt="${t("QR-код: CITI в Google Play", "QR code for CITI on Google Play")}" loading="lazy"><span>${icon('play')}<span><small>${t("Для Android", "For Android")}</small>Google Play</span>${icon('arrow')}</span></a></div></div></div></section>`;
const page = (title, description, body, route = '/', {notFound = false, schema = []} = {}) => {
  const url = origin + routeTo(route);
  const social = origin + '/assets/social-' + lang + '.png';
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#172b25">
<link rel="icon" type="image/png" href="/assets/citi-logo.png">
${notFound ? '<meta name="robots" content="noindex,follow">' : `<link rel="canonical" href="${esc(url)}">
${alternates(route).map(([code, href]) => `<link rel="alternate" hreflang="${code}" href="${esc(href)}">`).join('\n')}`}
<meta property="og:type" content="website">
<meta property="og:locale" content="${t('uk_UA', 'en_US')}">
<meta property="og:locale:alternate" content="${t('en_US', 'uk_UA')}">
<meta property="og:site_name" content="CITI">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(social)}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${t('CITI — міські сервіси у смартфоні', 'CITI — city services on your phone')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(social)}">
<link rel="stylesheet" href="/styles.css?v=${assetVersion('styles.css')}">
<script src="/app.js?v=${assetVersion('app.js')}" defer></script>
${schema.length ? `<script type="application/ld+json">${jsonLd({'@context': 'https://schema.org', '@graph': schema})}</script>` : ''}
</head>
<body>${header(route)}<main id="main">${body}</main>${footer()}</body>
</html>`;
};

const cards=services.map((s,i)=>`<article class="feature-card feature-tone-${i%5}" id="feature-${s.slug}" aria-labelledby="feature-title-${s.slug}"><div class="feature-copy"><div class="feature-card-top"><span class="feature-icon">${icon(s.icon)}</span><span class="feature-number">${String(i+1).padStart(2,'0')} / 14</span>${s.status?`<span class="badge soon">${s.status}</span>`:''}</div><h3 id="feature-title-${s.slug}">${esc(s.title)}</h3><p class="feature-description">${esc(s.desc)}</p><ul class="feature-benefits">${s.benefits.map(b=>`<li>${icon('check')}<span>${esc(b)}</span></li>`).join('')}</ul><a class="text-link feature-link" href="${routeTo('/services/'+s.slug+'/')}" aria-label="${t("Детальніше: ", "Learn more: ")}${esc(s.title)}">${t("Більше про сервіс ", "Explore this feature ")}${icon('arrow')}</a></div><figure class="feature-visual"><div class="phone feature-phone"><img src="${screenshotPath(s.image)}" alt="${esc(s.title)}${t(" — екран застосунку CITI", " in the CITI app")}" loading="lazy" decoding="async" ${screenshotSize(s.image)}></div></figure></article>`).join('');

const locations=JSON.parse(fs.readFileSync('community-locations.json','utf8'));
const mapSvg=fs.readFileSync('ukraine-map.svg','utf8').replace('id="map-grid"','id="citi-map-grid"').replace('url(#map-grid)','url(#citi-map-grid)').replace('aria-label="Карта громад України"', `aria-label="${t('Схематична мапа громад України', 'Illustrative map of CITI communities in Ukraine')}"`);
const selectedCity=cities.findIndex(([name])=>name==='Черкаси');
const mapPins=cities.map(([name,region],i)=>{const [lon,lat]=locations[name];return `<button class="community-pin ${i===selectedCity?'selected':''}" type="button" style="left:${((lon-21.4)/20*100).toFixed(3)}%;top:${((53-lat)/9.1*100).toFixed(3)}%" data-map-index="${i}" data-map-name="${esc(cityName(name))}" data-map-region="${esc(cityRegion(region))}" aria-label="${esc(cityName(name))}${t(' — громада у співпраці з CITI', ' — community working with CITI')}" aria-pressed="${i===selectedCity}"><span class="pin-dot"></span><span class="pin-label">${esc(cityName(name))}</span></button>`}).join('');
const cityChips=cities.map(([name],i)=>`<button type="button" class="community-chip ${i===selectedCity?'selected':''}" data-city-choice="${i}" data-search-name="${esc(name + ' ' + cityName(name))}" aria-pressed="${i===selectedCity}">${esc(cityName(name))}</button>`).join('');



const body=`
<section class="hero"><div class="wrap hero-grid"><div class="hero-copy"><div class="eyebrow"><span class="live-dot"></span>${t("МІСЬКІ СЕРВІСИ У ТВОЇЙ КИШЕНІ", "CITY SERVICES IN YOUR POCKET")}</div><h1>${t("Міські справи.", "City life.")}<br><span>${t("У твоєму", "On your")}<br>${t("смартфоні.", "phone.")}</span></h1><p class="hero-intro">${t("Встигай на транспорт, будь у курсі подій міста й вирішуй міські справи в одному застосунку.", "Catch your ride, keep up with local events and take care of city errands in one app.")}</p><div class="hero-ctas"><a class="button" href="#download">${t("Завантажити CITI ", "Download CITI ")}${icon('arrow')}</a><a class="hero-secondary" href="#features">${t("Що вміє CITI ", "Explore CITI ")}<span>↓</span></a></div><div class="hero-platforms">${rating}<span class="platform-label">${t("Для iOS та Android", "For iOS and Android")}</span></div></div><div class="hero-art"><div class="hero-circle"></div><div class="hero-word" aria-hidden="true">CITI</div><div class="phone hero-phone-back"><img src="/assets/transport.png" alt="${t("Маршрути громадського транспорту в CITI", "Public transport routes in CITI")}" ${screenshotSize("transport")}></div><div class="phone hero-phone-front"><img src="/assets/home.png" alt="${t("Головний екран CITI: новини, опитування та міські сповіщення", "CITI home screen with news, polls and local alerts")}" ${screenshotSize("home")} fetchpriority="high"></div><div class="hero-sticker sticker-one">${icon('map')}<span>${t("Усе місто.", "Your city.")}<br><strong>${t("В одному застосунку.", "In one app.")}</strong></span></div><div class="hero-sticker sticker-two">${icon('bus')}<span>${t("Менше чекати.", "Less waiting.")}<br><strong>${t("Більше встигати.", "More time for your day.")}</strong></span></div><div class="hero-sticker sticker-three">${icon('bolt')}<span>${t("Коли буде світло?", "When is the power back?")}<br><strong>${t("Графік завжди поруч.", "Check the schedule.")}</strong></span></div><div class="hero-sticker sticker-four">${icon('discount')}<span>${t("Знижки для своїх.", "Local offers.")}<br><strong>${t("Відкривай вигідне.", "Find a deal nearby.")}</strong></span></div></div></div><div class="hero-bottom wrap"><span>${t("Менше пошуку. Більше життя.", "Less searching. More living.")}</span><a href="#features">${t("Поглянь, як це працює ", "See how it works ")}<span>↓</span></a></div></section>

<section class="intro-strip wrap reveal"><div class="intro-statement">${t("Менше клопотів.", "Less hassle.")}<br><span>${t("Більше часу на своє.", "More time for what matters.")}</span></div><div class="strip-fact"><strong>14</strong><span>${t("напрямів сервісів", "service areas")}<br>${t("працюють або розвиваються", "available or in development")}</span></div><div class="strip-fact"><strong>${cities.length}</strong><span>${t("громади", "communities")}<br>${t("у співпраці з CITI", "working with CITI")}</span></div></section>

<section class="section wrap all-features" id="features" aria-labelledby="features-heading"><div class="section-heading reveal"><div><div class="eyebrow">${t("УСІ МОЖЛИВОСТІ CITI", "EXPLORE CITI")}</div><h2 id="features-heading">${t("Усе, що потрібно містянину.", "Everyday city services.")}<br><span>${t("В одному застосунку.", "In one app.")}</span></h2></div><p>${t("Транспорт, світло, міські сервіси й участь у житті громади. Подивись, що CITI може зробити для тебе.", "Check public transport, plan around power outages and stay connected with your community.")}</p></div><p class="features-availability">${t("Можливості CITI різняться від міста до міста. Вибери свою громаду в застосунку, щоб побачити доступні сервіси.", "CITI features vary by city. Choose your community in the app to see what’s available.")}</p><div class="features-collection">${cards}</div></section>

<section class="section communities-section" id="communities"><div class="wrap"><div class="section-heading reveal"><div><div class="eyebrow">${t("МЕРЕЖА ГРОМАД CITI", "THE CITI COMMUNITY NETWORK")}</div><h2>${t("Знайди своє місто.", "Find your city.")}<br><span>${t("Відкрий свій CITI.", "Discover CITI near you.")}</span></h2></div><div class="community-count"><strong>${cities.length}</strong><span>${t("громади у співпраці", "partner communities")}</span></div></div><div class="community-map"><div class="community-map-left"><div class="community-map-canvas">${mapSvg}<div class="community-map-pins" aria-label="${t("Громади на мапі", "Communities on the map")}">${mapPins}</div></div><div class="map-legend"><i></i>${t("Працюємо або готуємо запуск", "Available or preparing to launch")}</div><p class="map-caption">${t("Натисни на точку, щоб переглянути громаду. Розташування показано схематично.", "Select a map point to view its community. Locations are approximate.")}</p></div><aside class="community-map-card" aria-labelledby="map-city-name"><div class="eyebrow light">${t("ТВОЯ ГРОМАДА В CITI", "YOUR COMMUNITY IN CITI")}</div><span class="map-city-counter" id="map-city-counter">${String(selectedCity+1).padStart(2,'0')} / ${cities.length}</span><div aria-live="polite" aria-atomic="true"><h3 id="map-city-name">${esc(cityName(cities[selectedCity][0]))}</h3><p id="map-city-region">${esc(cityRegion(cities[selectedCity][1]) || t("Громада у співпраці з CITI", "Community working with CITI"))}</p></div><span class="cooperation-badge">${t("У співпраці з CITI", "Working with CITI")}</span><div class="map-city-story"><p>${t("Новини, міські сервіси та зв’язок із громадою — ближче до тебе.", "Local news, city services and a way to stay in touch with your community.")}</p><p class="map-availability">${t("CITI вже працює або готується до запуску. Доступність застосунку та набір сервісів залежать від громади.", "CITI is available or preparing to launch. Service availability varies by community.")}</p></div><a class="button map-download" href="#download">${t("Завантажити CITI ", "Download CITI ")}${icon('arrow')}</a><div class="map-card-controls"><button type="button" id="map-city-prev" aria-label="${t("Попередня громада", "Previous community")}">←</button><button type="button" id="map-city-next" aria-label="${t("Наступна громада", "Next community")}">→</button></div></aside></div><details class="community-directory"><summary>${t("Усі ", "All ")}${cities.length} ${t("громади", "communities")} ${icon('plus')}</summary><div class="community-directory-body"><label class="city-search">${icon('search')}<input id="city-search" type="search" placeholder="${t("Назва твоєї громади", "Enter a community name")}" aria-label="${t("Пошук громади", "Search communities")}"></label><p class="city-results" id="city-results" aria-live="polite">${t("Усі ", "All ")}${cities.length} ${t("громади", "communities")}</p><div class="community-chips">${cityChips}</div><p class="city-empty" hidden>${t("Не знайшли такої назви. Спробуй інший запит.", "No communities found. Try a different search.")}</p></div></details><p class="section-note">${t("Мапа охоплює громади на різних етапах співпраці. Не всі можливості поки доступні в кожному місті.", "The map includes communities at different stages of launch. Available features vary by city.")}</p></div></section>

<section class="section wrap start-web" id="start"><div class="section-heading reveal"><div><div class="eyebrow">${t("ПЕРШИЙ КРОК — ПРОСТИЙ", "GETTING STARTED")}</div><h2>${t("Твої справи.", "Your everyday errands.")}<br><span>${t("Новий рівень зручності.", "A little easier.")}</span></h2></div><p>${t("Почни з того, що потрібно саме зараз. До міських сервісів — кілька простих кроків.", "Get to the city services you need in a few simple steps.")}</p></div><ol class="getting-started"><li class="start-card"><div class="start-card-top"><span>01</span>${icon('play')}</div><div class="start-card-art install-art" aria-hidden="true"><img src="/assets/citi-logo.png" alt="" width="100" height="100"><span class="install-arrow">↓</span><span class="mini-platform">iOS / Android</span></div><h3>${t("Завантаж CITI", "Download CITI")}</h3><p>${t("Відкрий App Store чи Google Play. А якщо ти за комп’ютером — відскануй QR-код телефоном.", "Open the App Store or Google Play. On a computer? Scan the QR code with your phone.")}</p><a href="#download" class="text-link">${t("До завантаження ", "Go to downloads ")}${icon('arrow')}</a></li><li class="start-card"><div class="start-card-top"><span>02</span>${icon('map')}</div><div class="start-card-art choose-art" aria-hidden="true"><span class="mini-city">${icon('map')}${t("Твоя громада", "Your community")}</span><span class="mini-city chosen">${icon('check')}${t("Твоє місто", "Your city")}</span><span class="mini-city">${icon('map')}${t("Твої сервіси", "Your services")}</span></div><h3>${t("Знайди своє місто", "Find your city")}</h3><p>${t("Обери громаду в застосунку — і побачиш новини та сервіси, доступні саме для неї.", "Select your community in the app to see its local news and available services.")}</p><a href="#communities" class="text-link">${t("Громади CITI ", "CITI communities ")}${icon('arrow')}</a></li><li class="start-card"><div class="start-card-top"><span>03</span>${icon('bus')}</div><div class="start-card-art services-art" aria-hidden="true"><span>${icon('bus')}${t("Транспорт", "Transport")}</span><span>${icon('news')}${t("Новини", "News")}</span><span>${icon('bolt')}${t("Світло", "Power schedule")}</span><span>${icon('chat')}${t("Звернення", "Report an issue")}</span></div><h3>${t("Вирішуй свої справи", "Take care of your errands")}</h3><p>${t("Перевір, де автобус, прочитай новини або повідом про проблему. Почни з корисного для себе.", "Check where your bus is, read the news or report a local issue. Start with what you need today.")}</p><a href="#features" class="text-link">${t("Можливості CITI ", "CITI features ")}${icon('arrow')}</a></li></ol><div class="start-web-footer"><p>${t("Одне встановлення — багато можливостей для міського дня.", "One app for your everyday city errands.")}</p><a href="#download" class="button">${t("Спробувати CITI ", "Try CITI ")}${icon('arrow')}</a></div></section>

${stories()}

<section class="section wrap faq-section" id="faq"><div class="faq-heading"><div class="eyebrow">${t("ЩО ЩЕ ВАРТО ЗНАТИ", "GOOD TO KNOW")}</div><h2>${t("Є питання?", "Questions?")}<br><span>${t("Маємо відповіді.", "Find your answer.")}</span></h2></div><div class="faq-list">${faqs.map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${esc(q)}${icon('plus')}</summary><div class="faq-answer"><p>${esc(a)}${i===5?` <a href="https://citi.org.ua/" target="_blank" rel="noopener">${t("CITI для громад ↗", "CITI for municipalities ↗")}</a>`:''}</p></div></details>`).join('')}</div></section>

<section class="leaders wrap reveal"><div><div class="eyebrow">${t("ДЛЯ ТИХ, ХТО РОЗВИВАЄ ГРОМАДИ", "FOR LOCAL GOVERNMENT TEAMS")}</div><h2>${t("Хочеш зробити", "Want to bring CITI")}<br>${t("своє місто кращим?", "to your community?")}</h2><p>${t("Ти мер, цифровий лідер або ініціюєш зміни у своїй громаді? Дізнайся, як запустити CITI для її мешканців.", "Work in local government or want to help bring CITI to your city? Learn how to launch it for residents.")}</p></div><a class="button outline" href="https://citi.org.ua/" target="_blank" rel="noopener">${t("CITI для громад ", "CITI for municipalities ")}${icon('arrow')}</a><span class="leaders-mark" aria-hidden="true">↗</span></section>
${download()}
${contact()}
`;

function stories() {
  const examples = [
    {
      slug: 'transport', icon: 'bus', colors: ['#e1f2e9', '#d79d77', '#2d2924', '#3f7661'],
      city: 'Бердичів',
      title: t('Виходжу саме вчасно', 'I leave at just the right time'),
      text: t('Перед виходом дивлюся в СІТІ, за скільки хвилин приїде автобус. Тепер виходжу з дому саме вчасно й не пропускаю свій рейс.', 'Before I leave, I check CITI to see how many minutes away my bus is. I leave at just the right time and catch my ride.'),
    },
    {
      slug: 'city-requests', icon: 'chat', colors: ['#faeddb', '#bf8967', '#3a2823', '#a45c40'],
      city: 'Коростень',
      title: t('У під’їзді знову є світло', 'The lights are back on in our building'),
      text: t('У під’їзді кілька днів не працювало світло. Я надіслав звернення через СІТІ, отримав відповідь, а згодом освітлення полагодили.', 'The lights in our building entrance were out for a few days. I reported it through CITI, got a reply, and the lights were fixed later.'),
    },
    {
      slug: 'city-news', icon: 'news', colors: ['#eee9f7', '#a66d55', '#332625', '#6d5990'],
      city: 'Золотоноша',
      title: t('Знаю, що відбувається в місті', 'I know what’s happening in town'),
      text: t('Зранку відкриваю СІТІ й за кілька хвилин читаю головні новини. А перед вихідними дивлюся, які події будуть у місті.', 'I open CITI in the morning and catch up on the main local stories in a few minutes. Before the weekend, I check what’s happening around town.'),
    },
  ];
  const hairstyles = [
    'M13 35V23a17 17 0 0 1 34 0v12l-6-5V23c-11 0-16-5-16-5s-2 6-7 7v7Z',
    'M15 28v-6a15 15 0 0 1 30 0v6l-4-4-2-7c-4 3-11 5-19 5l-1 5Z',
    'M12 37V23a18 18 0 0 1 36 0v14l-7-5v-9c-4-1-7-4-9-8-2 5-7 9-13 10v7Z',
  ];

  return `<section class="section wrap stories-section" id="stories" aria-labelledby="stories-heading">
    <div class="section-heading"><div>
      <div class="eyebrow">${t('ПРИКЛАДИ З ЖИТТЯ МІСТА', 'EVERYDAY CITY SCENARIOS')}</div>
      <h2 id="stories-heading">${t('Як CITI допомагає', 'How CITI helps')}<br><span>${t('у звичайний день.', 'on an ordinary day.')}</span></h2>
    </div></div>
    <div class="stories-grid">${examples.map(({slug, icon: serviceIcon, colors, city, title, text}, i) => {
      const [background, skin, hair, shirt] = colors;
      const service = services.find(item => item.slug === slug);
      return `<article class="story-card">
        <div class="story-card-art">
          <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">
            <circle cx="30" cy="30" r="30" fill="${background}"/>
            <path d="M8 51a22 18 0 0 1 44 0 30 30 0 0 1-44 0Z" fill="${shirt}"/>
            <path d="M25 34h10v9a5 4 0 0 1-10 0Z" fill="${skin}"/>
            <ellipse cx="30" cy="27" rx="12" ry="15" fill="${skin}"/>
            <path d="${hairstyles[i]}" fill="${hair}"/>
            <path d="M26 32q4 4 8 0" fill="none" stroke="${hair}" stroke-width="1.2" stroke-linecap="round"/>
            <circle cx="25" cy="27" r="1" fill="${hair}"/><circle cx="35" cy="27" r="1" fill="${hair}"/>
          </svg>
          <span class="story-service-icon">${icon(serviceIcon)}</span>
        </div>
        <h3>${title}</h3>
        <p class="story-city">${esc(cityName(city))} · ${t('Ілюстративна історія', 'Illustrative story')}</p>
        <p><q>${text}</q></p>
        <a class="text-link" href="${routeTo('/services/' + slug + '/')}">${esc(service.title)} ${icon('arrow')}</a>
      </article>`;
    }).join('')}</div>
    <p class="stories-note">${t('Вигадані історії та аватарки ілюструють, як можна користуватися СІТІ.', 'The stories and avatars are fictional examples of how the app works.')}</p>
  </section>`;
}

const name = t('CITI — міські сервіси в одному застосунку', 'CITI — city services in one app');
const description = t(
  'Транспорт онлайн, графіки відключень, міські новини, мапи й AI-помічник у CITI. Перевір сервіси своєї громади та завантаж застосунок для iOS і Android.',
  'Track public transport, check power outage schedules and see city news, maps and services in CITI. Find your community and download the app for iOS or Android.',
);
const websiteId = origin + home + '#website';
const organizationId = origin + '/#organization';
const applicationId = origin + home + '#app';
const schema = [
  {'@type':'WebSite', '@id':websiteId, name:'CITI', url:origin + home, inLanguage:lang, publisher:{'@id':organizationId}},
  {
    '@type':'Organization', '@id':organizationId, name:'CITI', url:origin + '/',
    logo:origin + '/assets/citi-logo.png', email:supportEmail,
    contactPoint:{'@type':'ContactPoint', contactType:'customer support', email:supportEmail},
  },
  {
    '@type':'SoftwareApplication', '@id':applicationId, name:'CITI', url:origin + home,
    description, inLanguage:lang, applicationCategory:'LifestyleApplication',
    operatingSystem:['iOS', 'Android'], downloadUrl:[apple, play],
    publisher:{'@id':organizationId}, image:origin + '/assets/citi-logo.png',
  },
];

writePage(home, page(name, description, body, '/', {schema}));

for (const s of services) {
  const route = '/services/' + s.slug + '/';
  const url = origin + routeTo(route);
  const related = services.filter(item => item.slug !== s.slug && (item.tag === s.tag || item.slug === 'transport')).slice(0, 3);
  const content = `<section class="detail-hero wrap">
    <nav class="breadcrumbs" aria-label="${t('Навігаційний ланцюжок', 'Breadcrumb')}">
      <a href="${home}">CITI</a><span aria-hidden="true">/</span>
      <a href="${home}#features">${t('Можливості', 'Features')}</a><span aria-hidden="true">/</span>
      <span aria-current="page">${esc(s.title)}</span>
    </nav>
    <div class="detail-grid">
      <div class="detail-copy">
        <div class="eyebrow">${icon(s.icon)}${t('МОЖЛИВОСТІ CITI', 'CITI FEATURES')}</div>
        ${s.status ? `<span class="badge soon detail-badge">${esc(s.status)}</span>` : ''}
        <h1>${esc(s.title)}</h1>
        <p class="detail-lead">${esc(s.lead)}</p>
        <p class="detail-intro">${esc(s.desc)}</p>
        <ul class="check-list">${s.benefits.map(benefit => `<li>${icon('check')}${esc(benefit)}</li>`).join('')}</ul>
        <a class="button" href="#download">${s.status ? t('Завантажити CITI', 'Download CITI') : t('Спробувати в CITI', 'Try it in CITI')} ${icon('arrow')}</a>
        <p class="detail-availability">${t('Доступність сервісу залежить від громади.', 'Service availability varies by community.')}</p>
      </div>
      <div class="detail-visual"><div class="phone detail-phone">
        <img src="${screenshotPath(s.image)}" alt="${esc(s.title)} — ${t('екран застосунку CITI', 'CITI app screen')}" ${screenshotSize(s.image)} fetchpriority="high">
      </div></div>
    </div>
  </section>
  <section class="detail-story wrap">
    <div><div class="eyebrow">${t('ЯК ЦЕ ДОПОМАГАЄ', 'HOW IT HELPS')}</div>
      <h2>${t('Як це працює', 'How it works')}<br><span>${t('у твоєму дні.', 'in everyday life.')}</span></h2></div>
    <div><p>${esc(s.body)}</p><h3>${t('Коли стане у пригоді', 'When it comes in handy')}</h3><p>${esc(s.scenario)}</p>
      <aside class="detail-note">${esc(s.note)}</aside></div>
  </section>
  <section class="section wrap">
    <div class="section-heading">
      <h2>${t('Ще корисне', 'More to explore')}<br><span>${t('у CITI.', 'in CITI.')}</span></h2>
      <a class="text-link" href="${home}#features">${t('Усі можливості', 'All features')} ${icon('arrow')}</a>
    </div>
    <div class="related-grid">${related.map(item => `<a class="related-card" href="${routeTo('/services/' + item.slug + '/')}">
      ${icon(item.icon)}<h3>${esc(item.title)}</h3><p>${esc(item.desc)}</p>${icon('arrow')}</a>`).join('')}</div>
  </section>${download()}`;

  writePage(routeTo(route), page(s.title + ' — CITI', s.desc, content, route, {schema:[
    {
      '@type':'WebPage', '@id':url + '#webpage', url, name:s.title + ' — CITI',
      description:s.desc, inLanguage:lang, isPartOf:{'@id':websiteId},
      breadcrumb:{'@id':url + '#breadcrumbs'}, about:{'@id':applicationId},
    },
    {
      '@type':'BreadcrumbList', '@id':url + '#breadcrumbs',
      itemListElement:[
        {'@type':'ListItem', position:1, name:'CITI', item:origin + home},
        {'@type':'ListItem', position:2, name:s.title, item:url},
      ],
    },
  ]}));
}

writePage(routeTo('/404.html'), page(
  t('Сторінку не знайдено — CITI', 'Page not found — CITI'),
  t('Повернися до міських сервісів CITI.', 'Return to CITI city services.'),
  `<section class="not-found wrap"><div class="eyebrow">404</div>
    <h1>${t('Сторінку не знайдено', 'Page not found')}</h1>
    <p>${t('Перейди на головну, щоб знайти потрібний сервіс CITI.', 'Head back to the homepage to find the CITI service you need.')}</p>
    <a class="button" href="${home}">${t('На головну', 'Back to home')} ${icon('arrow')}</a>
  </section>`, '/404.html', {notFound:true},
));
}

for (const lang of languages) buildLanguage(lang);

const routes = ['/', ...ukrainianServices.map(service => '/services/' + service.slug + '/')];
const sitemap = languages.flatMap(lang => routes.map(route =>
  `  <url><loc>${esc(origin + languagePath(lang, route))}</loc>
${alternates(route).map(([code, href]) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${esc(href)}"/>`).join('\n')}
  </url>`));
fs.writeFileSync('dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap.join('\n')}
</urlset>
`);
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync('site-content.json', JSON.stringify({cities, services:ukrainianServices}, null, 2));
console.log(`Built ${sitemap.length} indexable pages across ${languages.length} languages, ${ukrainianServices.length} services and ${cities.length} communities.`);
