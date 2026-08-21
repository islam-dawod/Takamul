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
const revealEls = document.querySelectorAll('.reveal, .feature-card, .why-card, .step, .work-card, .section-head, .faq-item, .contact-item');
revealEls.forEach(el => el.classList.add('reveal'));

// Stagger grid children
document.querySelectorAll('.feature-cards, .why-grid, .steps-grid, .portfolio-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = (i * 0.08) + 's';
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

// Contact form submission (demo)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'جارٍ الإرسال...';
    
    // Simulate send
    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = '✅ تم الإرسال بنجاح';
      btn.style.background = '#10b981';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
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
