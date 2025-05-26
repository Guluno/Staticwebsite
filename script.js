// This script displays the current time and updates every second
function updateClock() {
    const now = new Date();
  
    // Format the time as HH:MM:SS
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
  
    const timeString = `${hours}:${minutes}:${seconds}`;
  
    // Find the clock div and update its text
    document.getElementById('digitalClock').textContent = timeString;
  }
  
  // Initial call
  updateClock();
  
  // Update clock every second
  setInterval(updateClock, 1000);

// Show/hide Kontakt modal logic
document.addEventListener('DOMContentLoaded', function() {
  var kontaktBtn = document.getElementById('kontaktBtn');
  var kontaktModal = document.getElementById('kontaktModal');
  var closeKontakt = document.getElementById('closeKontakt');

  if (kontaktBtn && kontaktModal && closeKontakt) {
    kontaktBtn.addEventListener('click', function(e) {
      e.preventDefault();
      kontaktModal.style.display = 'flex';
    });
    closeKontakt.addEventListener('click', function() {
      kontaktModal.style.display = 'none';
    });
    kontaktModal.addEventListener('click', function(e) {
      if (e.target === kontaktModal) {
        kontaktModal.style.display = 'none';
      }
    });
  }

  // Show auth modal on Login / Registrieren click
  const loginBtn = document.getElementById('loginBtn');
  const authModal = document.getElementById('authModal');
  if (loginBtn && authModal) {
    loginBtn.onclick = function(e) {
      e.preventDefault();
      authModal.style.display = 'flex';
      // Show login form by default
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      if (loginForm) loginForm.style.display = 'block';
      if (registerForm) registerForm.style.display = 'none';
    };
  }

  // Optional: close modal on outside click
  if (contactModal) {
    contactModal.addEventListener('click', function(e) {
      if (e.target === contactModal) contactModal.style.display = 'none';
    });
  }

  // SLIDESHOW LOGIC
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }

  // --- FORM VALIDATION ---
  // Login form validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      const email = document.getElementById('loginEmail');
      const password = document.getElementById('loginPassword');
      let valid = true;
      if (!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
        valid = false;
        email.style.borderColor = 'red';
      } else {
        email.style.borderColor = '';
      }
      if (password.value.length < 6) {
        valid = false;
        password.style.borderColor = 'red';
      } else {
        password.style.borderColor = '';
      }
      if (!valid) {
        e.preventDefault();
        document.getElementById('loginError').style.display = 'block';
        document.getElementById('loginError').textContent = 'Bitte geben Sie eine gültige E-Mail und ein Passwort mit mindestens 6 Zeichen ein.';
      }
    });
  }
  // Register form validation
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      const email = document.getElementById('registerEmail');
      const password = document.getElementById('registerPassword');
      let valid = true;
      if (!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
        valid = false;
        email.style.borderColor = 'red';
      } else {
        email.style.borderColor = '';
      }
      if (password.value.length < 6) {
        valid = false;
        password.style.borderColor = 'red';
      } else {
        password.style.borderColor = '';
      }
      if (!valid) {
        e.preventDefault();
        document.getElementById('registerError').style.display = 'block';
        document.getElementById('registerError').textContent = 'Bitte geben Sie eine gültige E-Mail und ein Passwort mit mindestens 6 Zeichen ein.';
      }
    });
  }

  // --- SLIDESHOW AUTOPLAY & PAUSE ---
  let slideInterval;
  function startSlideShow() {
    slideInterval = setInterval(function() { plusSlides(1); }, 4000);
  }
  function stopSlideShow() {
    clearInterval(slideInterval);
  }
  const slideshow = document.querySelector('.slideshow-container');
  if (slideshow) {
    slideshow.addEventListener('mouseenter', stopSlideShow);
    slideshow.addEventListener('mouseleave', startSlideShow);
    startSlideShow();
  }

  // --- MODAL CLOSE ON ESC/OUTSIDE ---
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
  }
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal('kontaktModal');
      closeModal('authModal');
    }
  });
  document.querySelectorAll('.modal').forEach(function(modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal(modal.id);
    });
  });

  // --- DARK MODE TOGGLE ---
  const darkModeBtn = document.createElement('button');
  darkModeBtn.textContent = '🌙';
  darkModeBtn.title = 'Dark Mode';
  darkModeBtn.style.position = 'fixed';
  darkModeBtn.style.bottom = '20px';
  darkModeBtn.style.right = '20px';
  darkModeBtn.style.zIndex = '9999';
  darkModeBtn.style.background = '#222';
  darkModeBtn.style.color = '#fff';
  darkModeBtn.style.border = 'none';
  darkModeBtn.style.borderRadius = '50%';
  darkModeBtn.style.width = '44px';
  darkModeBtn.style.height = '44px';
  darkModeBtn.style.fontSize = '1.5em';
  darkModeBtn.style.cursor = 'pointer';
  document.body.appendChild(darkModeBtn);
  function setDarkMode(on) {
    if (on) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', '1');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', '0');
    }
  }
  darkModeBtn.onclick = function() {
    setDarkMode(!document.body.classList.contains('dark-mode'));
  };
  if (localStorage.getItem('darkMode') === '1') setDarkMode(true);

  // --- SCROLL TO TOP BUTTON ---
  const scrollBtn = document.createElement('button');
  scrollBtn.textContent = '↑';
  scrollBtn.title = 'Nach oben';
  scrollBtn.style.position = 'fixed';
  scrollBtn.style.bottom = '80px';
  scrollBtn.style.right = '20px';
  scrollBtn.style.zIndex = '9999';
  scrollBtn.style.background = '#2667FF';
  scrollBtn.style.color = '#fff';
  scrollBtn.style.border = 'none';
  scrollBtn.style.borderRadius = '50%';
  scrollBtn.style.width = '44px';
  scrollBtn.style.height = '44px';
  scrollBtn.style.fontSize = '1.5em';
  scrollBtn.style.cursor = 'pointer';
  scrollBtn.style.display = 'none';
  document.body.appendChild(scrollBtn);
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) scrollBtn.style.display = 'block';
    else scrollBtn.style.display = 'none';
  });
  scrollBtn.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  // --- ACCESSIBILITY IMPROVEMENTS ---
  // Keyboard navigation for menu
  document.querySelectorAll('.nav-links > li > a').forEach(function(link) {
    link.setAttribute('tabindex', '0');
  });
  // ARIA attributes for dropdowns
  document.querySelectorAll('.dropdown').forEach(function(drop) {
    drop.setAttribute('aria-haspopup', 'true');
    drop.setAttribute('aria-expanded', 'false');
    drop.addEventListener('focusin', function() {
      drop.setAttribute('aria-expanded', 'true');
    });
    drop.addEventListener('focusout', function() {
      drop.setAttribute('aria-expanded', 'false');
    });
  });

  // --- CONTACT FORM AJAX SUBMISSION ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const statusDiv = document.getElementById('cf-status');
      statusDiv.textContent = 'Sende...';
      fetch('contact-form-handler.php', {
        method: 'POST',
        body: formData
      })
      .then(res => res.text())
      .then(data => {
        if (data.trim() === 'success') {
          statusDiv.style.color = 'green';
          statusDiv.textContent = 'Vielen Dank! Ihre Nachricht wurde gesendet.';
          contactForm.reset();
        } else {
          statusDiv.style.color = 'red';
          statusDiv.textContent = 'Fehler beim Senden. Bitte versuchen Sie es später erneut.';
        }
      })
      .catch(() => {
        statusDiv.style.color = 'red';
        statusDiv.textContent = 'Fehler beim Senden. Bitte versuchen Sie es später erneut.';
      });
    });
  }

  // Contact form login/register buttons
  const openLoginBtn = document.getElementById('openLoginFromContact');
  const openRegisterBtn = document.getElementById('openRegisterFromContact');
  if (openLoginBtn) {
    openLoginBtn.onclick = function() {
      if (authModal) authModal.style.display = 'flex';
      if (loginForm) loginForm.style.display = 'block';
      if (registerForm) registerForm.style.display = 'none';
    };
  }
  if (openRegisterBtn) {
    openRegisterBtn.onclick = function() {
      if (authModal) authModal.style.display = 'flex';
      if (loginForm) loginForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'block';
    };
  }
});
