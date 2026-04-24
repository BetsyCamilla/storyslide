/**
 * presentation.js — 完整版
 * 翻页（支持多种过场动画）、入场、交互、鼠标光晕+粒子+水波纹、中英切换
 */

// ===== 翻页系统 =====
(function() {
  var slides = document.querySelectorAll('.slide');
  var total = slides.length;
  var cur = 0;
  var busy = false;
  // 过场类型：'direct' | 'fade' | 'slide' | 'zoom'
  var transition = window.transitionType || 'fade';

  slides.forEach(function(el, i) {
    el.style.visibility = i === 0 ? 'visible' : 'hidden';
    el.style.zIndex = i === 0 ? '1' : '0';
    el.style.position = 'absolute';
    el.style.top = '0'; el.style.left = '0';
    el.style.width = '100%';
    el.style.minHeight = '100vh';
    el.style.overflow = 'hidden';
  });

  function go(i) {
    if (busy || i < 0 || i >= total || i === cur) return;
    busy = true;
    var dir = i > cur ? 1 : -1;
    var outEl = slides[cur];
    var inEl = slides[i];

    if (transition === 'fade') {
      outEl.style.transition = 'opacity 0.3s ease';
      outEl.style.opacity = '0';
      setTimeout(function() {
        outEl.style.visibility = 'hidden'; outEl.style.zIndex = '0';
        inEl.style.opacity = '0';
        inEl.style.transition = 'opacity 0.4s ease';
        inEl.style.visibility = 'visible'; inEl.style.zIndex = '1';
        void inEl.offsetHeight;
        inEl.style.opacity = '1';
        cur = i; busy = false;
        triggerAnim(inEl); updatePage();
      }, 300);
    } else if (transition === 'direct') {
      outEl.style.visibility = 'hidden'; outEl.style.zIndex = '0';
      inEl.style.visibility = 'visible'; inEl.style.zIndex = '1';
      cur = i; busy = false;
      triggerAnim(inEl); updatePage();
    } else if (transition === 'slide') {
      inEl.style.transition = 'none';
      inEl.style.transform = 'translateX(' + (dir * 100) + 'vw)';
      inEl.style.visibility = 'visible'; inEl.style.zIndex = '2';
      void inEl.offsetHeight;
      inEl.style.transition = 'transform 0.4s ease';
      inEl.style.transform = 'translateX(0)';
      outEl.style.transition = 'transform 0.4s ease';
      outEl.style.transform = 'translateX(' + (-dir * 100) + 'vw)';
      setTimeout(function() {
        outEl.style.visibility = 'hidden'; outEl.style.zIndex = '0';
        outEl.style.transform = '';
        inEl.style.zIndex = '1'; inEl.style.transition = '';
        cur = i; busy = false;
        triggerAnim(inEl); updatePage();
      }, 450);
    } else { // zoom
      outEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      outEl.style.opacity = '0'; outEl.style.transform = 'scale(0.95)';
      setTimeout(function() {
        outEl.style.visibility = 'hidden'; outEl.style.zIndex = '0';
        outEl.style.transform = '';
        inEl.style.opacity = '0';
        inEl.style.transition = 'none';
        inEl.style.transform = 'scale(0.85)';
        inEl.style.visibility = 'visible'; inEl.style.zIndex = '1';
        void inEl.offsetHeight;
        inEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        inEl.style.opacity = '1'; inEl.style.transform = 'scale(1)';
        cur = i; busy = false;
        triggerAnim(inEl); updatePage();
      }, 300);
    }
  }

  // 入场动画
  function triggerAnim(el) {
    var items = el.querySelectorAll('.anim-fade-up, .anim-scale');
    items.forEach(function(a, idx) {
      a.style.transition = 'none';
      a.style.opacity = '0';
      if (a.classList.contains('anim-fade-up')) a.style.transform = 'translateY(24px)';
      else a.style.transform = 'scale(0.9)';
      void a.offsetHeight;
      a.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      setTimeout(function() {
        a.style.opacity = '1';
        a.style.transform = 'translateY(0) scale(1)';
      }, idx * 120);
    });
    // 打字动画重置
    if (el.querySelector('.closing-question span')) {
      var sp = el.querySelector('.closing-question span');
      sp.style.animation = 'none';
      void sp.offsetHeight;
      sp.style.animation = '';
    }
  }

  function updatePage() {
    var dots = document.querySelectorAll('.page-dot');
    dots.forEach(function(d, i) { d.classList.toggle('active', i === cur); });
    var pn = document.getElementById('pageNum');
    if (pn) pn.innerHTML = ('0' + (cur + 1)).slice(-2) + ' / ' + ('0' + total).slice(-2);
  }

  window.goTo = go;
  window.prevSlide = function() { go(cur - 1); };
  window.nextSlide = function() { go(cur + 1); };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault(); window.nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault(); window.prevSlide();
    }
  });
  var wt = 0;
  document.addEventListener('wheel', function(e) {
    var now = Date.now();
    if (now - wt < 800) return;
    wt = now;
    if (e.deltaY > 0) window.nextSlide(); else window.prevSlide();
  }, { passive: true });
  (function() {
    var tx = 0;
    document.addEventListener('touchstart', function(e) { tx = e.touches[0].clientX; }, { passive: true });
    document.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) { if (dx < 0) window.nextSlide(); else window.prevSlide(); }
    }, { passive: true });
  })();

  setTimeout(function() {
    triggerAnim(slides[0]); updatePage();
    var hi = document.getElementById('interactionHint');
    if (hi) setTimeout(function() { hi.style.display = 'none'; }, 5000);
  }, 300);
})();

// ===== 内容交互 =====
function toggleCard(el) { var d = el.querySelector('.ev-detail'); if (!d) return; d.classList.toggle('open'); el.classList.toggle('expanded'); }
function toggleTimeline(el) { var d = el.querySelector('.tl-detail'); if (!d) return; d.classList.toggle('open'); el.classList.toggle('expanded'); }
function togglePillar(el) { var d = el.querySelector('.pillar-detail'); if (!d) return; d.classList.toggle('open'); el.classList.toggle('expanded'); }
function switchView(v) {
  document.querySelectorAll('.view-content').forEach(function(el) { el.style.display = 'none'; el.classList.remove('active'); });
  document.querySelectorAll('.view-btn').forEach(function(b) { b.classList.remove('active'); });
  var t = document.getElementById('view-' + v);
  if (t) { t.style.display = 'block'; t.classList.add('active'); }
  var bs = document.querySelectorAll('.view-btn');
  if (v === 'me' || v === 'left') { if (bs[0]) bs[0].classList.add('active'); }
  else { if (bs[1]) bs[1].classList.add('active'); }
}
function revealEasterEgg() {
  var egg = document.getElementById('easter-egg');
  if (!egg) return;
  if (!egg.style.maxHeight || egg.style.maxHeight === '0px' || egg.style.maxHeight === '') {
    egg.style.display = 'block';
    setTimeout(function() { egg.style.maxHeight = '300px'; egg.style.opacity = '1'; }, 10);
  }
}

// ===== 中英切换 =====
window.curLang = window.curLang || 'zh';
window.switchLang = function(l) {
  curLang = l;
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var d = window.i18nData ? window.i18nData[el.getAttribute('data-i18n')] : null;
    if (d && d[l]) el.innerHTML = d[l];
  });
  document.querySelectorAll('.lang-btn').forEach(function(b) {
    b.classList.toggle('active', b.getAttribute('data-lang') === l);
  });
};

// ===== 鼠标特效 =====
(function() {
  var c = document.getElementById('particles-canvas');
  if (!c) return;
  var ctx = c.getContext('2d'), p = [], max = 35;
  function r() { c.width = window.innerWidth; c.height = window.innerHeight; }
  window.addEventListener('resize', r); r();
  document.addEventListener('mousemove', function(e) {
    if (p.length < max) {
      for (var i = 0; i < 3; i++) p.push({ x: e.clientX + (Math.random() - 0.5) * 15, y: e.clientY + (Math.random() - 0.5) * 15, vx: (Math.random() - 0.5) * 2.5, vy: (Math.random() - 0.5) * 2.5 - 0.5, life: 1, size: Math.random() * 4 + 1 });
    }
  });
  function a() {
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = p.length - 1; i >= 0; i--) {
      var pt = p[i]; pt.x += pt.vx; pt.y += pt.vy; pt.life -= 0.018; pt.size *= 0.98;
      if (pt.life <= 0 || pt.size < 0.2) { p.splice(i, 1); continue; }
      ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(167,139,250,' + (pt.life * 0.5) + ')';
      ctx.fill();
    }
    requestAnimationFrame(a);
  }
  a();
})();
(function() {
  var g = document.getElementById('cursor-glow'), co = document.getElementById('cursor-core');
  if (!g || !co) return;
  document.addEventListener('mousemove', function(e) { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; co.style.left = e.clientX + 'px'; co.style.top = e.clientY + 'px'; });
})();
(function() {
  function ripple(e) {
    var d = document.createElement('div'), s = Math.random() * 30 + 20;
    d.style.cssText = 'position:fixed;pointer-events:none;z-index:999996;width:' + s + 'px;height:' + s + 'px;border-radius:50%;border:2px solid rgba(167,139,250,0.3);left:' + (e.clientX - s/2) + 'px;top:' + (e.clientY - s/2) + 'px;transform:scale(0);opacity:1;transition:all 0.6s ease-out';
    document.body.appendChild(d);
    void d.offsetHeight;
    d.style.transform = 'scale(3)'; d.style.opacity = '0';
    setTimeout(function() { if (d.parentNode) d.parentNode.removeChild(d); }, 700);
  }
  document.addEventListener('click', ripple);
})();
