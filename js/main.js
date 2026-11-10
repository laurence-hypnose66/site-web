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

  // 3. Gestion du formulaire de contact (envoi direct sans client mail obligatoire)
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Vérification honeypot anti-spam
      const honeypot = document.getElementById('website_trap');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot détecté');
        return;
      }

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const consultType = document.getElementById('consultType').value;
      const message = document.getElementById('message').value.trim();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Envoi de votre message en cours...';
      }

      const payload = {
        nom: name,
        email: email,
        telephone: phone,
        demande: consultType,
        message: message || "(Aucun message spécifique renseigné)",
        _subject: `Nouveau message hypnose66.fr : ${name} (${consultType})`,
        _template: "table",
        _captcha: "false"
      };

      try {
        const response = await fetch("https://formsubmit.co/ajax/laurence.hypnose66@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Erreur réseau (${response.status})`);
        }

        const data = await response.json();

        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `
            <strong>Merci beaucoup ${name} !</strong><br>
            Votre message a bien été transmis directement à Laurence Gaudy.<br>
            Elle prendra contact avec vous très rapidement.<br>
            <span style="font-size: 0.85rem; margin-top: 0.4rem; display: inline-block;">
              En cas de besoin urgent, vous pouvez également la joindre au <a href="tel:0675518267" style="color: inherit; font-weight: 700; text-decoration: underline;">06 75 51 82 67</a>.
            </span>
          `;
        }
        contactForm.reset();

      } catch (err) {
        console.error("Erreur d'envoi du formulaire:", err);
        // Fallback transparent : préparation du mail pré-rempli si le réseau ou un bloqueur interfère
        const subjectMail = encodeURIComponent(`Nouveau contact site web : ${name} (${consultType})`);
        const bodyMail = encodeURIComponent(
          `Bonjour Laurence,\n\n` +
          `Nom : ${name}\n` +
          `Email : ${email}\n` +
          `Téléphone : ${phone}\n` +
          `Demande : ${consultType}\n\n` +
          `Message :\n${message}\n\n--\nEnvoyé depuis le site hypnose66.fr`
        );
        const mailtoUrl = `mailto:laurence.hypnose66@gmail.com?subject=${subjectMail}&body=${bodyMail}`;

        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.className = 'form-feedback error';
          formFeedback.innerHTML = `
            <strong>Une restriction réseau empêche l'envoi direct automatique.</strong><br>
            Vous pouvez envoyer votre message en 1 clic :<br>
            <a href="${mailtoUrl}" class="btn-fallback-mail">📧 Cliquer ici pour ouvrir votre email pré-rempli</a><br>
            ou joindre Laurence directement au <a href="tel:0675518267" style="color: inherit; font-weight: 700;"><strong>06 75 51 82 67</strong></a>.
          `;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Envoyer mon message à Laurence';
        }
      }
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
