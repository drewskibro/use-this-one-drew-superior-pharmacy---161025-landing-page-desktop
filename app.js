// Force cache clear
const timestamp = new Date().getTime();
console.log('App loaded at:', timestamp);

document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.main-nav');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
  
  // Desktop dropdown functionality
  const dropdownBtns = document.querySelectorAll('.nav-dropdown-btn');
  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other dropdowns
      dropdownBtns.forEach(otherBtn => {
        if (otherBtn !== this) {
          otherBtn.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current dropdown
      this.setAttribute('aria-expanded', !isExpanded);
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) {
      dropdownBtns.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
  
  // Close dropdown on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      dropdownBtns.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
  
  // Scroll effect for nav
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animate stat numbers
        if (entry.target.classList.contains('stat-number')) {
          animateNumber(entry.target);
        }
      }
    });
  }, observerOptions);
  
  // Observe testimonial section elements
  document.querySelectorAll('.testimonial-text, .testimonial-card-wrapper, .stat-card').forEach(el => {
    observer.observe(el);
  });
  
  // Animate numbers counting up
  function animateNumber(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const number = parseFloat(text);
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        current = number;
        clearInterval(timer);
      }
      
      if (hasPercent) {
        element.textContent = Math.round(current) + '%';
      } else if (text.includes('-')) {
        element.textContent = Math.round(current);
      } else {
        element.textContent = Math.round(current);
      }
    }, duration / steps);
  }
  
  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking links
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && mobileMenu.classList.contains('active')) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  const weightInput = document.getElementById('weight-input');
  const weightSlider = document.getElementById('weight-slider');
  const resultValue = document.querySelector('.result-value');
  const unitButtons = document.querySelectorAll('.unit-btn');
  const unitLabel = document.querySelector('.unit-label');
  
  let currentUnit = 'kg';
  
  function updateResult(weight) {
    const lossPercentage = 0.226;
    const loss = (weight * lossPercentage).toFixed(1);
    resultValue.textContent = `${loss}${currentUnit}`;
  }
  
  function syncValues(value) {
    weightInput.value = value;
    weightSlider.value = value;
    updateResult(value);
    
    const percentage = ((value - weightSlider.min) / (weightSlider.max - weightSlider.min)) * 100;
    weightSlider.style.background = `linear-gradient(to right, var(--primary-teal) 0%, var(--primary-teal) ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
  }
  
  if (weightInput && weightSlider) {
    weightInput.addEventListener('input', (e) => {
      let value = parseInt(e.target.value) || 40;
      value = Math.max(40, Math.min(200, value));
      syncValues(value);
    });
    
    weightSlider.addEventListener('input', (e) => {
      syncValues(e.target.value);
    });
    
    unitButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        unitButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentUnit = this.dataset.unit;
        unitLabel.textContent = currentUnit;
        
        let currentWeight = parseInt(weightInput.value);
        if (currentUnit === 'st') {
          currentWeight = Math.round(currentWeight / 6.35);
          weightSlider.min = 6;
          weightSlider.max = 32;
        } else {
          if (weightSlider.max === 32) {
            currentWeight = Math.round(currentWeight * 6.35);
          }
          weightSlider.min = 40;
          weightSlider.max = 200;
        }
        
        syncValues(currentWeight);
        
        const labels = document.querySelectorAll('.slider-labels span');
        if (currentUnit === 'st') {
          labels[0].textContent = '6st';
          labels[1].textContent = '32st';
        } else {
          labels[0].textContent = '40kg';
          labels[1].textContent = '200kg';
        }
      });
    });
    
    syncValues(80);
  }
  
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    
    summary.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.open = !item.open;
      }
    });
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
