document.addEventListener('DOMContentLoaded', function() {
  // Form submission handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you within 24 hours.');
      contactForm.reset();
    });
  }

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.contact-faq-item');
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    
    summary.addEventListener('click', function(e) {
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.open) {
          otherItem.open = false;
        }
      });
    });
  });
});
