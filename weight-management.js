document.addEventListener('DOMContentLoaded', function() {
  const weightSlider = document.getElementById('wm-weight-slider');
  const weightDisplay = document.getElementById('wm-weight-display');
  const resultValue = document.getElementById('wm-result-value');
  
  if (weightSlider && weightDisplay && resultValue) {
    function updateCalculator() {
      const weight = parseInt(weightSlider.value);
      weightDisplay.textContent = weight;
      
      const lossPercentage = 0.15;
      const loss = (weight * lossPercentage).toFixed(1);
      resultValue.textContent = `${loss} kg`;
      
      const percentage = ((weight - 50) / (200 - 50)) * 100;
      weightSlider.style.background = `linear-gradient(to right, var(--primary-teal) 0%, var(--primary-teal) ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
    }
    
    weightSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }
  
  const faqItems = document.querySelectorAll('.wm-faq-item');
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
});
