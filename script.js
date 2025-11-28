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

// Animate skill progress bars
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const percent = item.getAttribute('data-percent');
        const progress = item.querySelector('.progress');
        // progress.style.width = '0%'; // Already 0 in CSS usually?
        
        // Animate width
        gsap.to(progress, {
            width: percent + '%',
            duration: 1,
            ease: "power2.out"
        });
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

// Typing Effect
const typingText = document.querySelector('.typing-text span');
const words = ["Frontend Developer", "Web Designer", "Tech Enthusiast", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typingText.textContent = currentChar;
    typingText.classList.add('stop-blinking');

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        isDeleting = !isDeleting;
        typingText.classList.remove('stop-blinking');
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}

typeEffect();

// Particle Background Effect
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

// Create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#b74b4b';
        ctx.fill();
    }
    // Check particle position, check mouse position, move the particle, draw the particle
    update() {
        // Check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // Draw particle
        this.draw();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 25000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#b74b4b';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Check if particles are close enough to draw line between them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 9) * (canvas.height / 9)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(183, 75, 75,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Resize event
window.addEventListener('resize',
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
        init();
    }
);

// Mouse out event
window.addEventListener('mouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

init();
animate();

// --- NEW FEATURES ---

// 1. Hacker Text Scramble Effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.querySelectorAll("h1, h2, .logo").forEach(element => {
    element.addEventListener("mouseover", event => {
        let iteration = 0;
        const originalText = event.target.innerText;
        
        clearInterval(event.target.interval);
        
        event.target.interval = setInterval(() => {
            event.target.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return event.target.dataset.value[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
                clearInterval(event.target.interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    });
});

// Set data-value attribute for scramble effect
document.querySelectorAll("h1, h2, .logo").forEach(el => {
    el.dataset.value = el.innerText;
});


// 2. Magnetic Buttons Effect
const magneticButtons = document.querySelectorAll('.btn, .social-icons a');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;

        gsap.to(btn, {
            duration: 0.3,
            x: x * 0.3,
            y: y * 0.3,
            ease: "power2.out"
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            duration: 1,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// 3. Vanilla Tilt Initialization
VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card, .education-box, .activity-box"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.05
});

// 3. GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate Home Content
gsap.from(".home-content h1", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5
});

gsap.from(".home-content h3", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.8
});

gsap.from(".home-content p", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1.1
});

gsap.from(".social-icons", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1.4
});

gsap.from(".home-img", {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    delay: 0.5
});

// Animate Sections on Scroll
const animateSection = (selector, yVal = 50) => {
    gsap.utils.toArray(selector).forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: yVal,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
};

// Staggered animations for grids
gsap.utils.toArray('.skills-grid').forEach(grid => {
    gsap.from(grid.children, {
        scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            onEnter: () => animateSkills() // Trigger skill bar animation
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });
});

gsap.utils.toArray('.projects-container').forEach(container => {
    gsap.from(container.children, {
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });
});

// Education timeline effect
gsap.utils.toArray('.education-box').forEach((box, i) => {
    gsap.from(box, {
        scrollTrigger: {
            trigger: box,
            start: "top 85%",
        },
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

