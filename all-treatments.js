document.addEventListener('DOMContentLoaded', function() {
  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const treatmentCards = document.querySelectorAll('.treatment-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      
      // Filter cards
      treatmentCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'flex';
        } else {
          const categories = card.dataset.category.split(' ');
          if (categories.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
  
  // FAQ functionality
  const faqItems = document.querySelectorAll('.treatments-faq-item');
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
