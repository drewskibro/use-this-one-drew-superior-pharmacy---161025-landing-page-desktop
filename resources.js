document.addEventListener('DOMContentLoaded', function() {
  console.log('Resources script loaded');

  const filterButtons = document.querySelectorAll('.filter-btn');
  const resourceCards = document.querySelectorAll('.resource-card');

  if (filterButtons.length === 0) {
    console.error('No filter buttons found');
    return;
  }

  if (resourceCards.length === 0) {
    console.error('No resource cards found');
    return;
  }

  // Classes for active vs inactive buttons
  // Note: We need to be careful not to overwrite base classes like px-6, py-2.5, rounded-full, font-bold, font-sans, text-sm, transition-all
  const activeStateClasses = ['bg-[#009689]', 'text-white', 'shadow-lg', 'hover:bg-[#007d72]'];
  const inactiveStateClasses = ['bg-white', 'text-[#495565]', 'border', 'border-gray-200', 'hover:border-[#009689]', 'hover:text-[#009689]'];

  function setActiveButton(clickedButton) {
    filterButtons.forEach(btn => {
      // Remove active classes
      btn.classList.remove(...activeStateClasses);
      // Add inactive classes
      btn.classList.add(...inactiveStateClasses);
    });

    // Set clicked button to active
    clickedButton.classList.remove(...inactiveStateClasses);
    clickedButton.classList.add(...activeStateClasses);
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent any default button behavior
      const filterValue = button.getAttribute('data-filter');
      console.log('Filter clicked:', filterValue);

      setActiveButton(button);

      resourceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Reset animation styles for smooth transition
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        if (filterValue === 'all' || category === filterValue) {
          // Show card
          if (card.style.display === 'none') {
             card.style.opacity = '0';
             card.style.transform = 'translateY(20px)';
             card.style.display = 'flex';
             
             // Trigger reflow
             void card.offsetWidth; 

             card.style.opacity = '1';
             card.style.transform = 'translateY(0)';
          } else {
             // Already visible, ensure it stays that way
             card.style.display = 'flex';
             card.style.opacity = '1';
             card.style.transform = 'translateY(0)';
          }
        } else {
          // Hide card
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            if (card.style.opacity === '0') { // Check if still hidden (user didn't click another filter fast)
                card.style.display = 'none';
            }
          }, 300); // Wait for transition to finish
        }
      });
    });
  });
});
