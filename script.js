// Toggle mobile navigation
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('nav');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking on nav links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll animation for sections
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // If this is the skills section, animate the progress bars
            if (entry.target.classList.contains('skills')) {
                animateSkills();
            }
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});

// Animate skill progress bars
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const percent = item.getAttribute('data-percent');
        const progress = item.querySelector('.progress');
        progress.style.width = '0%';
        
        setTimeout(() => {
            progress.style.width = percent + '%';
        }, 300);
    });
}

// Active link highlighting
function highlightActiveLink() {
    const scrollPos = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// Add CSS animation classes
document.head.insertAdjacentHTML('beforeend', `
<style>
    section.hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 1s ease;
    }
    
    section.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .education-box, .activity-box, .info-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
        transition-delay: calc(var(--i) * 0.2s);
    }
    
    section.show .education-box,
    section.show .activity-box,
    section.show .info-item {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Enhanced vignette effect for section backgrounds */
    .home::after, .skills::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
        box-shadow: inset 0 0 100px 60px rgba(0, 0, 0, 0.9);
    }
    
    /* Ensure content appears above the vignette */
    .home-content, .skills .heading, .skills-container {
        z-index: 3;
    }
</style>
`);

// Add animation delay to elements
document.querySelectorAll('.education-box, .activity-box, .info-item').forEach((item, index) => {
    item.style.setProperty('--i', index);
});
