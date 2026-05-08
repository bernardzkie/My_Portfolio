const scrollLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll('main section');
const header = document.querySelector('.site-nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

function smoothScroll(event) {
  const targetId = event.currentTarget.getAttribute('href');
  if (targetId.startsWith('#')) {
    event.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  }
}

scrollLinks.forEach(link => link.addEventListener('click', smoothScroll));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('tech-grid')) {
          // Stagger animation for tech cards
          const cards = entry.target.querySelectorAll('.tech-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('revealed');
            }, index * 100);
          });
        } else {
          entry.target.classList.add('revealed');
        }
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
document.querySelectorAll('.tech-grid').forEach(grid => observer.observe(grid));

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (navLink) {
        navLink.classList.toggle('active', entry.isIntersecting);
      }
    });
  },
  {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  }
);

sections.forEach(section => navObserver.observe(section));

window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Close mobile menu when clicking a link
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  }
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

// Scroll progress
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
  backToTopBtn.classList.toggle('visible', window.scrollY > 300);
  updateScrollProgress();
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Typing effect for hero title
const heroTitle = document.getElementById('hero-title');
const originalText = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
function typeWriter() {
  if (i < originalText.length) {
    heroTitle.textContent += originalText.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

setTimeout(typeWriter, 1000);

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }
  
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  
  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // EmailJS configuration
  // IMPORTANT: Replace these with your actual EmailJS credentials
  // 1. Go to https://www.emailjs.com/ and create an account
  // 2. Create an email service (Gmail, Outlook, etc.)
  // 3. Create an email template
  // 4. Get your Service ID, Template ID, and Public Key
  
  const serviceID = 'service_2olwz7n'; // EmailJS service ID
  const templateID = 'template_nc1xk8p'; // EmailJS template ID
  const publicKey = 'F9_ovZ2vyqnOQI4oX'; // EmailJS public key
  
  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
    to_email: 'bernardquizonjr@gmail.com', // Your email address
    to_phone: '+63 951 723 0370', // Your phone number (for SMS integration)
    reply_to: email
  };
  
  // Initialize EmailJS
  emailjs.init(publicKey);
  
  // Send email using EmailJS
  emailjs.send(serviceID, templateID, templateParams)
    .then((response) => {
      console.log('Email sent successfully!', response);
      
      // For SMS functionality, you can integrate with Twilio or similar service
      // Example Twilio integration (requires Twilio account and API key):
      /*
      fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'To': '+639517230370',
          'From': 'YOUR_TWILIO_NUMBER',
          'Body': `New message from ${name}: ${message}`
        })
      })
      .then(smsResponse => smsResponse.json())
      .then(smsData => console.log('SMS sent:', smsData))
      .catch(smsError => console.error('SMS failed:', smsError));
      */
      
      alert('Thank you for your message! I\'ve received it via email and will get back to you soon.');
      contactForm.reset();
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      alert('Sorry, there was an error sending your message. Please try again or contact me directly at bernardquizonjr@gmail.com or +63 951 723 0370.');
    })
    .finally(() => {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});
