/* ===================================
   CONTACT PAGE - SIMPLIFIED VERSION
   Capital Innovation Fund
   Email Redirect on Form Submit
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
  initContactPage();
});

/* ==================================
   MAIN INITIALIZATION
   ================================== */
function initContactPage() {
  initNavigationEffects();
  initFormSubmission();
  initFormInteractions();
  initContactCardInteractions();
  
  console.log('✓ Capital Innovation Fund - Contact Page Loaded');
}

/* ==================================
   NAVIGATION EFFECTS
   ================================== */
function initNavigationEffects() {
  const nav = document.getElementById('mainNav');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = nav.offsetHeight;
          const targetPosition = target.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ==================================
   FORM SUBMISSION - EMAIL REDIRECT
   ================================== */
function initFormSubmission() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const company = document.getElementById('company').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Compose email
    const recipientEmail = 'info@capitalinnovation.fund';
    const subject = `Strategic Inquiry from ${fullName} - ${company}`;
    
    const body = `
Full Name: ${fullName}
Company/Institution: ${company}
Phone: ${phone}
Email: ${email}

Message:
${message}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Optional: Show confirmation message
    showNotification('Opening your email client...', 'success');
    
    // Reset form after short delay
    setTimeout(() => {
      form.reset();
    }, 1000);
  });
}

function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  const colors = {
    success: '#00d98e',
    error: '#ff4757',
    info: '#00a8cc'
  };
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: ${colors[type]};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-size: 14px;
    font-weight: 600;
    max-width: 400px;
    animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

/* ==================================
   FORM INTERACTIONS
   ================================== */
function initFormInteractions() {
  // Auto-resize textarea
  const textarea = document.querySelector('textarea');
  if (textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
  
  // Input focus effects
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      const formGroup = this.closest('.form-group');
      if (formGroup) {
        formGroup.style.transform = 'translateY(-2px)';
        formGroup.style.transition = 'transform 0.3s ease';
      }
    });
    
    input.addEventListener('blur', function() {
      const formGroup = this.closest('.form-group');
      if (formGroup) {
        formGroup.style.transform = 'translateY(0)';
      }
    });
  });
}

/* ==================================
   CONTACT CARD INTERACTIONS
   ================================== */
function initContactCardInteractions() {
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach(item => {
    item.style.cursor = 'pointer';
    
    item.addEventListener('click', function() {
      const contactValue = this.querySelector('.contact-value');
      if (contactValue) {
        const text = contactValue.textContent.trim();
        copyToClipboard(text);
        
        // Visual feedback
        const label = this.querySelector('.contact-label');
        const originalText = label.textContent;
        label.textContent = 'Copied!';
        label.style.color = '#00ffa3';
        
        setTimeout(() => {
          label.textContent = originalText;
          label.style.color = '';
        }, 2000);
      }
    });
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('✓ Copied:', text);
      showNotification('Copied to clipboard', 'success');
    }).catch(err => {
      console.error('Copy failed:', err);
      fallbackCopyToClipboard(text);
    });
  } else {
    fallbackCopyToClipboard(text);
  }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    showNotification('Copied to clipboard', 'success');
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }
  
  document.body.removeChild(textArea);
}

/* ==================================
   CSS ANIMATIONS
   ================================== */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);