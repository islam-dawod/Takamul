const fs = require('fs');
const glob = require('path');

const DROPDOWN = `<div class="nav-item"><a href="services.html" class="nav-link">خدماتنا</a><div class="dropdown-menu"><a href="service-web.html"><span class="dd-icon">🖥️</span><span class="dd-label">تصميم وتطوير المواقع<span class="dd-desc">مواقع احترافية ومتجاوبة</span></span></a><a href="service-ecommerce.html"><span class="dd-icon">🛒</span><span class="dd-label">المتاجر الإلكترونية<span class="dd-desc">متاجر متكاملة للبيع عبر الإنترنت</span></span></a><a href="service-apps.html"><span class="dd-icon">📱</span><span class="dd-label">تطبيقات الهاتف<span class="dd-desc">Android و iOS</span></span></a><a href="service-marketing.html"><span class="dd-icon">📈</span><span class="dd-label">التسويق الإلكتروني<span class="dd-desc">حملات وإعلانات رقمية</span></span></a><a href="service-seo.html"><span class="dd-icon">🔍</span><span class="dd-label">تحسين محركات البحث<span class="dd-desc">SEO وتحسين الظهور</span></span></a><a href="service-solutions.html"><span class="dd-icon">🧩</span><span class="dd-label">الحلول الرقمية<span class="dd-desc">أنظمة مخصصة وربط الأنظمة</span></span></a></div></div>`;

const patterns = [
  '<a href="services.html" class="active">خدماتنا</a>',
  '<a href="services.html">خدماتنا</a>',
];

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  for (const pat of patterns) {
    if (content.includes(pat)) {
      content = content.replace(pat, DROPDOWN);
      changed = true;
      break;
    }
  }
  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated:', f);
  } else {
    console.log('Skipped:', f);
  }
});
