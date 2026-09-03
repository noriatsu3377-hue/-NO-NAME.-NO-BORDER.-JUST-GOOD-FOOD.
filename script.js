document.addEventListener('DOMContentLoaded', () => {
  // 1. ハンバーガーメニューとナビゲーションの制御
  const hamburger = document.getElementById('hamburger');
  const globalNav = document.getElementById('global-nav');
  const navLinks = document.querySelectorAll('.global-nav ul li a');

  if (hamburger && globalNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      globalNav.classList.toggle('is-active');
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
      hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    // ナビゲーション内のリンクをクリックしたらメニューを閉じる
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        globalNav.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. ヘッダーのスクロール時のスタイル変更
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  // 3. スクロール時のフェードインアニメーション (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-up');
  
  if (fadeElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px', // 画面の下から10%のところで発火
      threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 一度表示されたら監視を解除（フェードインしたままにする）
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => {
      fadeObserver.observe(el);
    });
  }
});
