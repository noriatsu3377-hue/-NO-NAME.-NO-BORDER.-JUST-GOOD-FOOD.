document.addEventListener('DOMContentLoaded', () => {
  // 1. ハンバーガーメニュー
  const hamburger = document.querySelector('.js-hamburger');
  const globalNav = document.querySelector('.js-nav');
  const navLinks = document.querySelectorAll('.js-nav ul li a');

  if (hamburger && globalNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      globalNav.classList.toggle('is-active');
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        globalNav.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. スクロール時のアニメーション (Intersection Observer)
  // htmlタグに 'js-enabled' がある場合のみ .fade-in はCSSで opacity: 0 になっている。
  // Observerが動作する場合は 'is-visible' を付与して opacity: 1 にする。
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // 画面の下から10%のところで発火
        threshold: 0.1
      };

      const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // 一度表示されたら監視を解除（スクロールで消えないようにする）
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      fadeElements.forEach(el => {
        fadeObserver.observe(el);
      });
    } else {
      // IntersectionObserver がサポートされていない場合はすべて即座に表示
      fadeElements.forEach(el => {
        el.classList.add('is-visible');
      });
    }
  }
});
