// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav')) {
      navLinks.classList.remove('active');
    }
  });

  // Set current year in footer
  const yearElement = document.getElementById('y');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile menu if open
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      field.addEventListener('blur', validateField);
      field.addEventListener('input', clearFieldError);
    });
  }
});

// Form Validation
function validateField(e) {
  const field = e.target;
  const fieldId = field.id;
  const errorElement = document.getElementById(fieldId + '-error');
  
  // Clear previous error
  clearFieldError(e);
  
  // Check if required field is empty
  if (field.hasAttribute('required') && !field.value.trim()) {
    showFieldError(field, errorElement, getRequiredMessage(fieldId));
    return false;
  }
  
  // Email validation
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      showFieldError(field, errorElement, 'Please enter a valid email address');
      return false;
    }
  }
  
  return true;
}

function clearFieldError(e) {
  const field = e.target;
  const fieldId = field.id;
  const errorElement = document.getElementById(fieldId + '-error');
  
  if (errorElement) {
    errorElement.textContent = '';
  }
  field.closest('.form-group')?.classList.remove('error');
}

function showFieldError(field, errorElement, message) {
  if (errorElement) {
    errorElement.textContent = message;
  }
  field.closest('.form-group')?.classList.add('error');
}

function getRequiredMessage(fieldId) {
  const messages = {
    'name': 'Please enter your name',
    'email': 'Please enter a valid email address',
    'project': 'Please tell us about your project',
    'privacy': 'Please agree to be contacted'
  };
  return messages[fieldId] || 'This field is required';
}

// Form Submission
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = document.getElementById('submitBtn');
  const messagesDiv = document.getElementById('formMessages');
  
  // Validate all required fields
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    const fieldId = field.id;
    const errorElement = document.getElementById(fieldId + '-error');
    
    if (!field.value.trim()) {
      showFieldError(field, errorElement, getRequiredMessage(fieldId));
      isValid = false;
    } else if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        showFieldError(field, errorElement, 'Please enter a valid email address');
        isValid = false;
      }
    }
  });
  
  // Check honeypot (spam protection)
  const honeypot = form.querySelector('input[name="website"]');
  if (honeypot && honeypot.value) {
    // Bot detected, silently fail
    return;
  }
  
  if (!isValid) {
    showMessage(messagesDiv, 'Please check the form and fix any errors.', 'error');
    return;
  }
  
  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  try {
    // In a real implementation, you would send this to your backend
    // For now, we'll simulate a successful submission
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success message
    showMessage(messagesDiv, 'Thanks! We\'ll reply within 24 hours. Check your email for confirmation.', 'success');
    form.reset();
    
    // In production, you would:
    // 1. Send data to your backend API
    // 2. Send confirmation email to user
    // 3. Send notification to Haegeum team
    // 4. Store submission in database/CRM
    
    console.log('Form submitted:', data);
    
  } catch (error) {
    console.error('Form submission error:', error);
    showMessage(messagesDiv, 'Something went wrong. Please check your information and try again, or email us directly at hello@haegeum.in', 'error');
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Book a free 20-minute call';
  }
}

function showMessage(element, message, type) {
  if (!element) return;
  
  element.textContent = message;
  element.className = 'form-messages ' + type;
  element.setAttribute('role', 'alert');
  
  // Scroll to message
  element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Clear message after 10 seconds for errors
  if (type === 'error') {
    setTimeout(() => {
      element.textContent = '';
      element.className = 'form-messages';
    }, 10000);
  }
}

// Service Tabs Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const serviceContents = document.querySelectorAll('.service-content');

function switchServiceTab(tabId) {
  // Remove active class from all tabs
  tabButtons.forEach(btn => btn.classList.remove('active'));
  // Add active class to clicked tab
  const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Hide all service contents
  serviceContents.forEach(content => content.classList.remove('active'));
  // Show selected service content
  const targetContent = document.getElementById(tabId + '-content');
  if (targetContent) {
    targetContent.classList.add('active');
  }
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab;
    switchServiceTab(tabId);
  });
});

// Initialize first tab as active
document.addEventListener('DOMContentLoaded', () => {
  if (tabButtons.length > 0 && serviceContents.length > 0) {
    const firstTab = tabButtons[0];
    const firstTabId = firstTab.dataset.tab;
    switchServiceTab(firstTabId);
  }
});

// FAQ is now a simple grid - no accordion needed

// Card hover effects (if needed)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Enhanced package card interactions
document.querySelectorAll('.package-card, .plan-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Timeline step animations
const timelineSteps = document.querySelectorAll('.timeline-step');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

timelineSteps.forEach(step => {
  step.style.opacity = '0';
  step.style.transform = 'translateY(20px)';
  step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  timelineObserver.observe(step);
});

