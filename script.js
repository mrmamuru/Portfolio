const categories = [
  {
    id: 'alixa',
    label: 'Alixa',
    sub: 'Perfume Brand',
    image: 'images/card-alixa.jpg',
    icon: '&#10022;',
    desc: 'A signature scent line carrying its own identity — where fragrance becomes a personal statement.',
    lead: 'Alixa is more than a bottle on a shelf — it is an extension of story-telling into scent. Every note is chosen the way a scene is composed: with intention.',
    subs: [
      { tag:'Collection', title:'Signature Line', text:'The core fragrance collection — top, heart, and base notes crafted for lasting character.', image:'images/alixa-collection.jpg' },
      { tag:'Story', title:'Brand Story', text:'Why Alixa exists, and the philosophy behind every bottle.', image:'images/alixa-story.jpg' },
      { tag:'Campaign', title:'Launch Campaign', text:'Visual and film campaign built to introduce Alixa to the world.', image:'images/alixa-campaign.jpg' },
      { tag:'Shop', title:'Where to Buy', text:'Links and details on getting your hands on Alixa.', image:'images/alixa-shop.jpg' }
    ]
  },
  {
    id: 'creator',
    label: 'Content Creator',
    sub: 'Cinematic Brand Content',
    image: 'images/card-creator.jpg',
    icon: '&#127916;',
    desc: 'Cinematic content created personally for major brands — Lifebuoy, Dettol, Bkash, and more.',
    lead: 'As a content creator, every project is shot and edited personally — cinematic direction applied to brand storytelling at scale.',
    subs: [
      { tag:'Campaign', title:'Lifebuoy', text:'Cinematic brand content created for Lifebuoy.', image:'images/creator-lifebuoy.jpg' },
      { tag:'Campaign', title:'Dettol', text:'Cinematic brand content created for Dettol.', image:'images/creator-dettol.jpg' },
      { tag:'Campaign', title:'Bkash', text:'Cinematic brand content created for Bkash.', image:'images/creator-bkash.jpg' },
      { tag:'More', title:'Other Brand Work', text:'Additional collaborations and cinematic campaigns.', image:'images/creator-more.jpg' }
    ]
  },
  {
    id: 'whoami',
    label: 'Mahmud Mamuru Zaman',
    sub: 'Content Creator · Founder · Perfumer',
    image: 'images/card-whoami.jpg',
    icon: '&#9679;',
    desc: 'Bangladesh\'s first luxury perfumer, a content creator, and a production house owner — building stories, brands, and a scent, one project at a time.',
    lead: '"I always wanted to create something different. While others followed trends, I stayed awake nights dreaming of how to make Bangladesh proud." From his early days as a content creator to becoming Bangladesh\'s first luxury perfumer, Mamuru\'s journey has been one of relentless innovation.',
    subs: [
      { tag:'Bio', title:'My Journey', text:'From early days behind the camera to founding Alixa — a journey driven by the pursuit of something different, and a dream to make Bangladesh proud on a global stage.', image:'images/whoami-journey.jpg' },
      { tag:'Skills', title:'What I Do', text:'A content creator and production house owner — directing, shooting, and editing cinematic brand content, while running a house that delivers the same for other brands at scale.', image:'images/whoami-skills.jpg' },
      { tag:'Vision', title:'The Alixa Vision', text:'Alixa fuses traditional Bangladeshi craftsmanship with modern perfumery — fragrances built to carry Bangladesh\'s story to the world.', image:'images/whoami-recognition.jpg' }
    ]
  },
  {
    id: 'production',
    label: 'Production House',
    sub: 'Client Shoots · Promos · Editing',
    image: 'images/card-production.jpg',
    icon: '&#127909;',
    desc: 'A production house delivering shoots, promotions, and full editing services for brands.',
    lead: 'The production house handles client work at scale — full shoots, brand promotion, and post-production editing delivered as a service.',
    subs: [
      { tag:'Service', title:'Shoot & Cinematography', text:'On-location and studio shoots for client brands.', image:'images/production-shoot.jpg' },
      { tag:'Service', title:'Brand Promotion', text:'Promotional content built for client campaigns.', image:'images/production-promotion.jpg' },
      { tag:'Service', title:'Editing', text:'Full post-production and editing services.', image:'images/production-editing.jpg' },
      { tag:'Clients', title:'Case Studies', text:'A look at projects delivered for past clients.', image:'images/production-clients.jpg' }
    ]
  },
  {
    id: 'contact',
    label: 'Contact',
    sub: "Let's Work Together",
    image: 'images/card-contact.jpg',
    icon: '&#9993;',
    desc: 'Ready to collaborate? Reach out for content, production, or brand partnerships.',
    lead: 'Whether it is a brand campaign, a production project, or a partnership with Alixa — here is how to get in touch.',
    subs: [
      { tag:'Email', title:'Email', text:'your@email.com' },
      { tag:'Social', title:'Instagram', text:'@yourhandle' },
      { tag:'Direct', title:'WhatsApp', text:'Add your number here' }
    ]
  }
];

let active = 2; // Who I Am centered by default
let dragOffset = 0;
let isDragging = false;
let justDragged = false;
const track = document.getElementById('track');

function buildCards(){
  track.innerHTML = '';
  categories.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = i;
    if (c.image) {
      const test = new Image();
      test.onload = () => {
        card.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.85) 100%), url('${c.image}')`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
      };
      test.src = c.image; // if this 404s, the card just keeps its default gold gradient
    }
    card.innerHTML = `<div class="icon">${c.icon}</div><div class="cat-label">${c.label}</div><div class="cat-sub">${c.sub}</div>`;
    card.addEventListener('click', () => {
      if (justDragged) return;
      if (i === active) openOverlay(i);
      else goTo(i);
    });
    track.appendChild(card);
  });
}

function render(withTextFade){
  const cards = track.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.classList.toggle('is-active', i === active);
    const offset = i - active;
    const abs = Math.abs(offset);
    const dragPx = isDragging ? dragOffset : 0;
    let x = offset * 190 + dragPx * 0.9;
    let scale = 1 - abs * 0.18;
    let z = 100 - abs;
    let opacity = abs > 2 ? 0 : 1 - abs * 0.28;
    let rot = offset * -8;
    card.style.transform = `translateX(${x}px) scale(${Math.max(scale,0.55)}) rotateY(${rot}deg)`;
    card.style.opacity = opacity;
    card.style.zIndex = z;
    card.style.filter = abs === 0 ? 'none' : `brightness(${1 - abs*0.18})`;
  });

  const c = categories[active];
  const titleEl = document.getElementById('infoTitle');
  const descEl = document.getElementById('infoDesc');
  const thumbEl = document.getElementById('barThumb');
  const iconEl = document.getElementById('barIcon');
  const indexEl = document.getElementById('barIndex');

  indexEl.textContent = String(active + 1).padStart(2,'0') + ' / ' + String(categories.length).padStart(2,'0');

  if (c.image) {
    const test = new Image();
    test.onload = () => {
      thumbEl.style.backgroundImage = `url('${c.image}')`;
      iconEl.style.display = 'none';
    };
    test.onerror = () => {
      thumbEl.style.backgroundImage = 'none';
      iconEl.style.display = 'block';
      iconEl.innerHTML = c.icon;
    };
    test.src = c.image;
  } else {
    thumbEl.style.backgroundImage = 'none';
    iconEl.style.display = 'block';
    iconEl.innerHTML = c.icon;
  }

  if (withTextFade === false) {
    titleEl.textContent = c.label;
    descEl.textContent = c.sub;
    return;
  }
  titleEl.style.opacity = 0;
  descEl.style.opacity = 0;
  setTimeout(() => {
    titleEl.textContent = c.label;
    descEl.textContent = c.sub;
    titleEl.style.opacity = 1;
    descEl.style.opacity = 1;
  }, 180);
}

function goTo(i){
  active = ((i % categories.length) + categories.length) % categories.length;
  render();
}

document.getElementById('barPrev').addEventListener('click', ()=> goTo(active - 1));
document.getElementById('barNext').addEventListener('click', ()=> goTo(active + 1));
document.getElementById('viewBtn').addEventListener('click', ()=> openOverlay(active));

// keyboard nav
document.addEventListener('keydown', (e)=>{
  if(document.getElementById('overlay').classList.contains('open')){
    if(e.key === 'Escape') closeOverlay();
    return;
  }
  if(e.key === 'ArrowLeft'){ goTo(active - 1); }
  if(e.key === 'ArrowRight'){ goTo(active + 1); }
});

// ===== Unified drag (mouse + touch) via Pointer Events =====
let pointerStartX = null;
const DRAG_THRESHOLD = 60;

track.addEventListener('pointerdown', (e) => {
  pointerStartX = e.clientX;
  isDragging = true;
  dragOffset = 0;
  track.classList.add('dragging');
  track.setPointerCapture(e.pointerId);
});

track.addEventListener('pointermove', (e) => {
  if (!isDragging || pointerStartX === null) return;
  dragOffset = e.clientX - pointerStartX;
  render(false);
});

function endDrag(){
  if (!isDragging) return;
  isDragging = false;
  track.classList.remove('dragging');
  if (Math.abs(dragOffset) > 8) {
    justDragged = true;
    setTimeout(() => { justDragged = false; }, 50);
  }
  if (dragOffset > DRAG_THRESHOLD) goTo(active - 1);
  else if (dragOffset < -DRAG_THRESHOLD) goTo(active + 1);
  else render(false);
  dragOffset = 0;
  pointerStartX = null;
}

track.addEventListener('pointerup', endDrag);
track.addEventListener('pointercancel', endDrag);
track.addEventListener('pointerleave', (e) => { if (isDragging) endDrag(); });

// overlay
const overlay = document.getElementById('overlay');
const overlayPanel = document.getElementById('overlayPanel');

function openOverlay(i){
  const c = categories[i];
  overlayPanel.innerHTML = `
    <div class="overlay-eyebrow">${c.sub}</div>
    <div class="overlay-title">${c.label}</div>
    <p class="overlay-lead">${c.lead}</p>
    <div class="sub-grid">
      ${c.subs.map((s, idx) => `
        <div class="sub-item">
          <div class="sub-tag">${s.tag}</div>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
          <div class="placeholder-thumb" data-image="${s.image || ''}" id="thumb-${c.id}-${idx}">Add Image / Video</div>
        </div>
      `).join('')}
    </div>
    ${c.id === 'contact' ? `
    <div class="contact-form">
      <div class="form-eyebrow">Send a Message</div>
      <form id="contactForm">
        <input type="text" id="cf-name" placeholder="Your Name" required>
        <input type="email" id="cf-email" placeholder="Your Email" required>
        <textarea id="cf-message" placeholder="Tell me about your project..." required></textarea>
        <button type="submit">Send Message</button>
        <div class="form-note">This opens your email app with the message pre-filled — replace the address in script.js with your real email.</div>
      </form>
    </div>` : ''}
  `;

  // lazy-load sub-item images, fall back to placeholder text if missing
  c.subs.forEach((s, idx) => {
    if (!s.image) return;
    const el = document.getElementById(`thumb-${c.id}-${idx}`);
    const test = new Image();
    test.onload = () => {
      el.style.backgroundImage = `url('${s.image}')`;
      el.textContent = '';
    };
    test.src = s.image;
  });

  if (c.id === 'contact') {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value;
      const email = document.getElementById('cf-email').value;
      const message = document.getElementById('cf-message').value;
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
    });
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeOverlay(){
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('closeOverlay').addEventListener('click', closeOverlay);
overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeOverlay(); });

// aperture blades (decorative)
const bladesGroup = document.getElementById('blades');
for(let i=0;i<10;i++){
  const angle = (360/10)*i;
  const line = document.createElementNS('http://www.w3.org/2000/svg','line');
  line.setAttribute('x1', 100 + 70*Math.cos(angle*Math.PI/180));
  line.setAttribute('y1', 100 + 70*Math.sin(angle*Math.PI/180));
  line.setAttribute('x2', 100 + 92*Math.cos(angle*Math.PI/180));
  line.setAttribute('y2', 100 + 92*Math.sin(angle*Math.PI/180));
  bladesGroup.appendChild(line);
}

buildCards();
render();

// ===== custom cursor ring =====
const cursorRing = document.getElementById('cursorRing');
if (cursorRing && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    cursorRing.classList.add('active');
  });
  document.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
  document.querySelectorAll('.card, .player-nav, .player-explore, .sub-item, .overlay-close, .social-icon, .contact-form button').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('grow'));
  });
  // re-bind whenever new cards are drawn
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('grow'));
    });
  });
  observer.observe(track, { childList: true });
}
