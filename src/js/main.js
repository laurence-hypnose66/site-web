// ==========================================================================
// Antigravity – Site Vitrine Laurence Gaudy (Scripts interactifs)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Toggle
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Fermer le menu lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Carrousel des Avis Clients Google
  const slides = document.querySelectorAll('.review-slide');
  const dots = document.querySelectorAll('.review-dot');
  const reviewsCard = document.querySelector('.hero-reviews-card');
  let currentSlide = 0;
  let slideInterval = null;

  function goToSlide(index) {
    if (!slides.length) return;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  if (dots.length > 0) {
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
        goToSlide(slideIdx);
        resetAutoSlide();
      });
    });

    function startAutoSlide() {
      if (!slideInterval && slides.length > 1) {
        slideInterval = setInterval(nextSlide, 6500);
      }
    }

    function stopAutoSlide() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }

    function resetAutoSlide() {
      stopAutoSlide();
      startAutoSlide();
    }

    if (reviewsCard) {
      reviewsCard.addEventListener('mouseenter', stopAutoSlide);
      reviewsCard.addEventListener('mouseleave', startAutoSlide);
      reviewsCard.addEventListener('touchstart', stopAutoSlide, { passive: true });
    }

    startAutoSlide();
  }

  // 3. Gestion du formulaire de contact avec protection anti-spam (honeypot)
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Vérification honeypot
      const honeypot = document.getElementById('website_trap');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot détecté');
        return;
      }

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      const consultType = document.getElementById('consultType').value;

      // Construction du mailto direct pour envoyer directement à Laurence
      const subject = encodeURIComponent(`Nouveau contact site web : ${name} (${consultType})`);
      const body = encodeURIComponent(
        `Bonjour Laurence,\n\nVous avez reçu un nouveau message depuis votre site internet :\n\n` +
        `Nom : ${name}\n` +
        `Email : ${email}\n` +
        `Téléphone : ${phone}\n` +
        `Modalité souhaitée : ${consultType}\n\n` +
        `Message :\n${message}\n\n--\nEnvoyé depuis votre site vitrine`
      );

      const mailtoUrl = `mailto:laurence.hypnose66@gmail.com?subject=${subject}&body=${body}`;

      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `Merci ${name} ! Votre client de messagerie va s'ouvrir pour envoyer le message directement à Laurence. Si rien ne se passe, vous pouvez la joindre directement au <a href="tel:0675518267"><strong>06 75 51 82 67</strong></a>.`;
      }

      // Déclenchement de l'ouverture du client mail
      window.location.href = mailtoUrl;
    });
  }

  // 3. Défilement fluide des ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
