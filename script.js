(() => {
  const ctaButtons = document.querySelectorAll('.js-cta');

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
})();
