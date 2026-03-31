// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !phone || !message) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Phone validation (basic 10 digit check)
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      showNotification('Please enter a valid phone number', 'error');
      return;
    }
    
    // Success
    showNotification('Thank you for your message! We will contact you soon.', 'success');
    contactForm.reset();
  });
}

// Notification function
function showNotification(message, type) {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 2rem;
    background: ${type === 'success' ? '#28a745' : '#dc3545'};
    color: white;
    border-radius: 8px;
    z-index: 10000;
    font-weight: 500;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Menu Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    menuItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeInUp 0.5s ease';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.card, .feature-card, .testimonial-card, .menu-item, .value-card');
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// Add to cart functionality (visual feedback)
document.querySelectorAll('.btn-small').forEach(btn => {
  if (btn.textContent === 'Add to Order') {
    btn.addEventListener('click', function() {
      const originalText = this.textContent;
      this.textContent = 'Added!';
      this.style.background = '#28a745';
      this.style.color = 'white';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
        this.style.color = '';
      }, 1500);
      
      showNotification('Item added to your order!', 'success');
    });
  }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});