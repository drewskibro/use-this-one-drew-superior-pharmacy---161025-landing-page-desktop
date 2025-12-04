document.addEventListener('DOMContentLoaded', function() {
  // Removed dosage button interaction logic as per redesign.
  
  const faqItems = document.querySelectorAll('.mounjaro-faq-item');
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    
    summary.addEventListener('click', function(e) {
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.open) {
          otherItem.open = false;
        }
      });
    });
  });
  
  const signupForm = document.querySelector('.mounjaro-signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      alert('Thank you for subscribing! We\'ll send you exclusive weight management insights to ' + email);
      this.reset();
    });
  }
});
