const photos = [
  ['photo_2023-12-26_20-13-05.jpg', 'من أول الضحك اللي فضل في بالي'],
  ['photo_2023-12-26_20-13-06.jpg', 'مذاكرة ولا وقت حلو وخلاص'],
  ['photo_2024-10-13_19-23-33.jpg', 'ضحكتك في الصورة دي حكاية'],
  ['photo_2025-02-20_21-28-16.jpg', 'حتى الصورة لوحدها بتفكرني بيكي'],
  ['photo_2025-06-23_16-55-40.jpg', 'ورا كل صورة حكاية صغيرة'],
  ['photo_2026-10-02_19-15-14.jpg', 'تفصيلة من يوم بحبه'],
  ['photo_2026-10-02_19-18-38.jpg', 'يوم حلو ووشوش أحلى'],
  ['photo_2026-10-02_19-20-05.jpg', 'السماء كانت حلوة وإنتي أكتر'],
  ['photo_2026-10-02_19-42-34.jpg', 'ملكة اللحظة دي'],
  ['photo_2026-10-02_19-44-01.jpg', 'نسمة هوا وابتسامة منك'],
  ['photo_2026-10-02_19-45-17.jpg', 'إيدك في إيدي والباقي تفاصيل'],
  ['photo_2026-10-02_19-46-25.jpg', 'مشوار عادي اتحول لذكرى'],
  ['photo_2026-10-02_19-56-10.jpg', 'فخورين ببعض من زمان'],
  ['photo_2026-10-02_19-56-26.jpg', 'الليلة اللي بقت من أحلى ليالينا'],
  ['photo_2026-10-02_19-56-57.jpg', 'ضحكتنا في المراية'],
  ['photo_2026-10-02_19-57-11.jpg', 'الصورة اللي فيها كل اللي بحبه']
];

const gallery = document.querySelector('#gallery');
const dialog = document.querySelector('#photoDialog');

photos.forEach(([file, caption], index) => {
  const card = document.createElement('button');
  card.className = 'memory';
  card.type = 'button';
  card.setAttribute('aria-label', caption);
  card.innerHTML = `<img src="assets/${file}" alt="ذكرى من حكايتنا" loading="lazy"><span>${String(index + 1).padStart(2, '0')} · ${caption}</span>`;
  card.addEventListener('click', () => {
    document.querySelector('#dialogImg').src = `assets/${file}`;
    document.querySelector('#dialogCaption').textContent = `${caption} و لسه بحبك كل يوم أكتر من اللي قبله   `;
    dialog.showModal();
  });
  gallery.append(card);
});

document.querySelector('#closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
document.querySelector('#begin').addEventListener('click', () => {
  document.querySelector('#intro').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.flip').forEach((card, index) => {
  const prompt = card.querySelector('span');
  const hint = card.querySelector('b');
  const question = [
    'قد إيه بفرح لما أشوف اسمك',
    'وجودك بيغير يومي إزاي',
    'إيه اللي بيفضل في بالي'
  ][index];
  card.dataset.question = question;
  card.setAttribute('aria-expanded', 'false');
  card.addEventListener('click', () => {
    const isOpen = card.classList.toggle('open');
    prompt.textContent = isOpen ? card.dataset.answer : card.dataset.question;
    hint.textContent = isOpen ? '♡' : 'دوسي واكتشفي ↗';
    card.setAttribute('aria-expanded', String(isOpen));
  });
});

const envelope = document.querySelector('#envelope');
envelope.addEventListener('click', () => {
  const letter = document.querySelector('#secretLetter');
  const isOpen = letter.classList.toggle('show');
  letter.setAttribute('aria-hidden', String(!isOpen));
  envelope.querySelector('span:last-child').textContent = isOpen
    ? 'الرسالة اتفتحت خدي وقتك ♡'
    : 'دوسي عشان تفتحي الرسالة';
});

document.querySelector('#finalBtn').addEventListener('click', () => {
  document.querySelector('#finalMessage').classList.add('show');
  for (let index = 0; index < 20; index += 1) {
    const particle = document.createElement('span');
    particle.textContent = ['♡', '✦', '·'][index % 3];
    particle.style.cssText = `position:fixed;z-index:8;left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;color:${index % 2 ? '#c7a776' : '#bd8884'};font-size:${12 + Math.random() * 24}px;pointer-events:none;animation:up 2.2s ease-out forwards`;
    document.body.append(particle);
    setTimeout(() => particle.remove(), 2300);
  }
});

const backgroundMusic = document.querySelector('#backgroundMusic');
const soundButton = document.querySelector('#soundBtn');
const videos = [...document.querySelectorAll('.film-frame video')];
let musicEnabled = false;
let resumeAfterVideo = false;

function updateMusicButton() {
  const videoPlaying = videos.some(video => !video.paused && !video.ended);
  soundButton.textContent = musicEnabled && !videoPlaying ? 'Ⅱ' : '♫';
  soundButton.setAttribute('aria-label', musicEnabled && !videoPlaying ? 'إيقاف الأغنية' : 'تشغيل الأغنية');
}

function showMusicMessage(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3200);
}

soundButton.addEventListener('click', async () => {
  if (musicEnabled) {
    musicEnabled = false;
    resumeAfterVideo = false;
    backgroundMusic.pause();
    updateMusicButton();
    return;
  }
  musicEnabled = true;
  if (videos.some(video => !video.paused && !video.ended)) {
    resumeAfterVideo = true;
    updateMusicButton();
    showMusicMessage('الأغنية هتشتغل بعد ما الفيديو يخلص');
    return;
  }
  try {
    await backgroundMusic.play();
    updateMusicButton();
  } catch {
    musicEnabled = false;
    updateMusicButton();
    showMusicMessage('المتصفح مش قادر يشغل الأغنية راجعي ملف kol_waadmp3.mp3 جوه مجلد assets');
  }
});

backgroundMusic.addEventListener('error', () => {
  if (musicEnabled) {
    musicEnabled = false;
    resumeAfterVideo = false;
    updateMusicButton();
    showMusicMessage('المتصفح مش قادر يشغل الأغنية راجعي ملف kol_waadmp3.mp3 جوه مجلد assets');
  }
});

videos.forEach(video => {
  video.addEventListener('play', () => {
    if (musicEnabled && !backgroundMusic.paused) resumeAfterVideo = true;
    backgroundMusic.pause();
    updateMusicButton();
  });
  const resumeMusicIfReady = () => {
    const anotherVideoPlaying = videos.some(item => item !== video && !item.paused && !item.ended);
    if (!anotherVideoPlaying && resumeAfterVideo && musicEnabled) {
      resumeAfterVideo = false;
      backgroundMusic.play().then(updateMusicButton).catch(() => {
        musicEnabled = false;
        updateMusicButton();
      });
    } else {
      updateMusicButton();
    }
  };
  video.addEventListener('pause', resumeMusicIfReady);
  video.addEventListener('ended', resumeMusicIfReady);
});
document.querySelectorAll('.film-frame video').forEach(video => {
  const showFallback = () => {
    if (video.parentElement.querySelector('.video-fallback')) return;
    const link = document.createElement('a');
    link.className = 'video-fallback';
    link.href = video.querySelector('source').getAttribute('src');
    link.textContent = 'الفيديو مش مدعوم في المتصفح نزليه وشغليه على جهازك';
    link.setAttribute('download', '');
    video.parentElement.append(link);
  };
  video.addEventListener('error', showFallback);
  if (video.error) showFallback();
});

const progressBar = document.querySelector('#progressBar');
window.addEventListener('scroll', () => {
  const page = document.documentElement;
  const scrollable = page.scrollHeight - page.clientHeight;
  progressBar.style.width = `${scrollable > 0 ? 100 * page.scrollTop / scrollable : 0}%`;
}, { passive: true });

document.body.classList.add('js-ready');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('seen');
  });
}, { threshold: 0.18 });
document.querySelectorAll('.section').forEach(section => sectionObserver.observe(section));

const punctuation = /[.,،؛:!?؟…—–·۔。．\-"“”‘’'()[\]{}]/g;
const cleanVisibleWords = node => {
  if (node.nodeType === Node.TEXT_NODE) {
    const cleaned = node.nodeValue.replace(punctuation, '');
    if (cleaned !== node.nodeValue) node.nodeValue = cleaned;
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE || ['SCRIPT', 'STYLE'].includes(node.tagName)) return;
  ['aria-label', 'alt', 'title'].forEach(attribute => {
    if (node.hasAttribute(attribute)) {
      node.setAttribute(attribute, node.getAttribute(attribute).replace(punctuation, ''));
    }
  });
  node.childNodes.forEach(cleanVisibleWords);
};
cleanVisibleWords(document.body);
new MutationObserver(records => {
  records.forEach(record => {
    if (record.type === 'characterData') cleanVisibleWords(record.target);
    else record.addedNodes.forEach(cleanVisibleWords);
  });
}).observe(document.body, { subtree: true, childList: true, characterData: true });



