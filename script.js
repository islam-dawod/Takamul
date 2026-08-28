/* ===== TAKAMUL IT Solutions — Scripts ===== */

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
  // Mobile dropdown toggle
  document.querySelectorAll('.nav-item > .nav-link').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.closest('.nav-item').classList.toggle('open');
      }
    });
  });
}

// Header shadow on scroll + progress bar
const header = document.querySelector('.site-header');
const progress = document.createElement('div');
progress.className = 'scroll-progress';
document.body.appendChild(progress);

const onScroll = () => {
  const h = document.documentElement;
  const scrolled = h.scrollTop || document.body.scrollTop;
  const height = h.scrollHeight - h.clientHeight;
  progress.style.width = height > 0 ? (scrolled / height) * 100 + '%' : '0%';
  if (header) header.classList.toggle('scrolled', scrolled > 8);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const revealEls = document.querySelectorAll('.feature-card, .why-item, .step, .work-card, .section-head, .faq-item, .contact-item, .split-col');
revealEls.forEach(el => el.classList.add('reveal'));

// Stagger grid children
document.querySelectorAll('.feature-cards, .why-list, .steps-grid, .portfolio-grid, .faq-list').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.classList.add('reveal');
    child.style.transitionDelay = (i * 0.1) + 's';
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
      setTimeout(() => { entry.target.style.transitionDelay = ''; }, 1200);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    // Toggle current
    if (!wasOpen) item.classList.add('open');
  });
});

// Back to top
document.querySelectorAll('.back-top').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Contact form → WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const budget = document.getElementById('budget').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let text = `مرحباً تكامل 👋`;
    text += `\n\n📩 *بيانات التواصل*:`;
    text += `\n• الاسم: ${name}`;
    text += `\n• الهاتف: ${phone}`;
    text += `\n• البريد: ${email}`;
    text += `\n\n🛠️ *تفاصيل المشروع*:`;
    text += `\n• الخدمة: ${service}`;
    if (budget) text += `\n• الميزانية: ${budget}`;
    text += `\n\n📝 *وصف المشروع*:`;
    text += `\n${message}`;
    
    const whatsappURL = `https://wa.me/970599268700?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, '_blank');
    
    contactForm.reset();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = '✅ تم فتح واتساب';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg> إرسال الطلب';
      btn.style.background = '';
    }, 3000);
  });
}

/* ===== Active Dropdown ===== */
const servicePages = ['service-web.html','service-ecommerce.html','service-apps.html','service-marketing.html','service-seo.html','service-solutions.html','services.html'];
const currentPage = window.location.pathname.split('/').pop();
if (servicePages.includes(currentPage)) {
  const navItem = document.querySelector('.nav-item');
  if (navItem) {
    const link = navItem.querySelector('.nav-link');
    link.classList.add('active');
  }
}

/* ===== PWA Install ===== */
let deferredPrompt = null;
const installBtn = document.getElementById('pwaInstallBtn');
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

// Show install button on iOS (always) or Android (when beforeinstallprompt fires)
if (isIOS && !isStandalone && installBtn) {
  installBtn.style.display = 'inline-block';
}

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn && !isStandalone) installBtn.style.display = 'inline-block';
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  if (installBtn) installBtn.style.display = 'none';
});

function installPWA() {
  // If already installed, do nothing
  if (isStandalone) return;

  if (deferredPrompt) {
    // Android: native install prompt
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      deferredPrompt = null;
      if (installBtn) installBtn.style.display = 'none';
    });
  } else if (isIOS) {
    // iOS: show step-by-step instructions
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);';
    modal.innerHTML = `
      <div style="background:#fff;border-radius:16px;padding:32px;max-width:380px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.3);">
        <div style="font-size:48px;margin-bottom:16px;">📲</div>
        <h3 style="margin:0 0 8px;color:#1e293b;font-size:1.2rem;">إضافة تكامل للشاشة الرئيسية</h3>
        <div style="text-align:right;direction:rtl;margin:20px 0;padding:20px;background:#f1f5f9;border-radius:12px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <span style="background:#2563eb;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:700;">1</span>
            <span style="color:#475569;">اضغط على أيقونة <b>المشاركة</b> <span style="font-size:1.2rem;">⬆️</span> في شريط Safari</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <span style="background:#2563eb;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:700;">2</span>
            <span style="color:#475569;">اختر <b>"إضافة إلى الشاشة الرئيسية"</b></span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="background:#2563eb;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:700;">3</span>
            <span style="color:#475569;">اضغط <b>"إضافة"</b> في الأعلى</span>
          </div>
        </div>
        <button onclick="this.closest('div[style]').parentElement.remove()" style="margin-top:12px;padding:12px 32px;background:#2563eb;color:#fff;border:none;border-radius:10px;cursor:pointer;font-size:1rem;font-weight:600;">فهمت ✓</button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  } else {
    // Android (older browsers without beforeinstallprompt)
    alert('لإضافة تكامل إلى الشاشة الرئيسية:\n\n1. اضغط على النقاط الثلاث (⋮) في المتصفح\n2. اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"');
  }
}
