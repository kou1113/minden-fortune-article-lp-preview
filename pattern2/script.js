(() => {
  const ctaButtons = document.querySelectorAll('.js-cta');
  const sticky = document.querySelector('.sticky-cta');
  const stickyLink = sticky?.querySelector('a');
  const footer = document.querySelector('#footer');
  let footerVisible = false;
  let ticking = false;

  const trackAffiliateClick = (button) => {
    console.log({
      event: "affiliate_cta_click",
      location: button.dataset.ctaLocation
    });
  };

  ctaButtons.forEach((button) => {
    button.addEventListener('click', () => trackAffiliateClick(button));
  });

  document.querySelectorAll('.faq-list details').forEach((details) => {
    const summary = details.querySelector('summary');
    summary?.setAttribute('aria-expanded', String(details.open));
    details.addEventListener('toggle', () => {
      summary?.setAttribute('aria-expanded', String(details.open));
    });
  });

  const updateSticky = () => {
    ticking = false;
    if (!sticky || !stickyLink) return;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? window.scrollY / documentHeight : 0;
    const visible = progress >= 0.18 && !footerVisible;
    sticky.classList.toggle('is-visible', visible);
    sticky.setAttribute('aria-hidden', String(!visible));
    stickyLink.tabIndex = visible ? 0 : -1;
  };

  const requestStickyUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateSticky);
  };

  if ('IntersectionObserver' in window && footer) {
    const footerObserver = new IntersectionObserver((entries) => {
      footerVisible = entries[0]?.isIntersecting ?? false;
      updateSticky();
    }, { threshold: 0.01 });
    footerObserver.observe(footer);
  }

  window.addEventListener('scroll', requestStickyUpdate, { passive: true });
  window.addEventListener('resize', requestStickyUpdate, { passive: true });
  updateSticky();
})();
