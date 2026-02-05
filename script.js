// ========== PARTICLES (Embers) ==========
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 12 + 10) + 's';
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particlesContainer.appendChild(particle);
    }
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ========== PROJECT TOGGLE ==========
function toggleProject(projectId) {
    var details = document.getElementById('details' + projectId);
    var toggle = document.getElementById('toggle' + projectId);
    if (details.style.maxHeight === '800px') {
        details.style.maxHeight = '0px';
        toggle.style.transform = 'rotate(0deg)';
    } else {
        details.style.maxHeight = '800px';
        toggle.style.transform = 'rotate(180deg)';
    }
}

// ========== PAGE TRANSITIONS ==========

const pageMessages = {
    'index.html': 'Retour au sanctuaire...',
    'experience.html': 'Consultation des chroniques...',
    'competences.html': 'Révélation des savoirs...',
    'projets.html': 'Ouverture du grimoire...',
    'contact.html': 'Invocation du corbeau...'
};

// Create overlay element once
(function initTransition() {
    const overlay = document.createElement('div');
    overlay.id = 'page-overlay';
    overlay.innerHTML = '<span id="page-overlay-text"></span>';
    document.body.appendChild(overlay);

    // On page load: if we came from a transition, the overlay is visible -> fade it out
    if (sessionStorage.getItem('transitioning')) {
        sessionStorage.removeItem('transitioning');
        overlay.classList.add('visible');
        // Let browser paint, then fade out
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.classList.remove('visible');
            });
        });
    }
})();

// Intercept internal links
document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;

    // Don't transition to the current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (href === currentPage) {
        e.preventDefault();
        return;
    }

    e.preventDefault();

    const overlay = document.getElementById('page-overlay');
    const text = document.getElementById('page-overlay-text');
    const pageName = href.split('/').pop();

    text.textContent = pageMessages[pageName] || 'Voyage en cours...';
    sessionStorage.setItem('transitioning', 'true');

    // Show overlay (fade in)
    overlay.classList.add('visible');

    // Navigate once the fade-in is done
    overlay.addEventListener('transitionend', function handler(ev) {
        if (ev.propertyName === 'opacity' && overlay.classList.contains('visible')) {
            overlay.removeEventListener('transitionend', handler);
            window.location.href = href;
        }
    });
});
