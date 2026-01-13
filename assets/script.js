// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Cycling text for home subtitle
document.addEventListener('DOMContentLoaded', function() {
    const cyclingText = document.getElementById('cyclingText');
    if (!cyclingText) return;

    const roles = ['Poet', 'Front End Developer', 'Researcher', 'Changemaker'];
    let currentIndex = 0;

    function cycleText() {
        // Fade out
        cyclingText.style.opacity = '0';
        cyclingText.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            // Update text
            currentIndex = (currentIndex + 1) % roles.length;
            cyclingText.textContent = roles[currentIndex];
            // Fade in
            cyclingText.style.opacity = '1';
            
            // Schedule next cycle
            setTimeout(cycleText, 3000);
        }, 500);
    }
    
    // Start cycling after 3 seconds
    setTimeout(cycleText, 3000);
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

document.addEventListener("scroll", function() {
    const items = document.querySelectorAll(".timeline-item");
    const triggerBottom = window.innerHeight * 0.85;

    items.forEach(item => {
        const boxTop = item.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            item.classList.add("active");
        }
    });
});

// Mini-gallery lightbox
document.querySelectorAll('.board-photo').forEach(fig => {
    fig.addEventListener('click', (e) => {
        const img = fig.querySelector('img');
        const caption = fig.querySelector('.photo-caption')?.textContent || '';
        if (img) openImageModal(img.src, caption);
    });
});

// Simple poem toggle
function togglePoem(button) {
    const card = button.closest('.poetry-card');
    if (card) card.classList.toggle('expanded');
}

function openImageModal(src, caption) {
    const modal = document.createElement('div');
    modal.className = 'img-modal';

    const inner = document.createElement('div');
    inner.className = 'modal-inner';

    const img = document.createElement('img');
    img.src = src;
    img.alt = caption || '';

    const cap = document.createElement('div');
    cap.className = 'modal-caption';
    cap.textContent = caption;

    inner.appendChild(img);
    inner.appendChild(cap);
    modal.appendChild(inner);

    modal.addEventListener('click', (ev) => {
        if (ev.target === modal) document.body.removeChild(modal);
    });

    document.body.appendChild(modal);

    // Close on Esc
    const onKey = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', onKey);
        }
    };
    document.addEventListener('keydown', onKey);
}
