document.addEventListener('DOMContentLoaded', () => {
    // Dynamic year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Theme switcher
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    html.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        document.body.style.animation = 'none';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10);
    });
    
    // Form validation
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            showMessage('Thank you! Your message has been sent. I\'ll get back to you soon!', 'success');
            form.reset();
        }
    });
    
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!name) {
            showMessage('Please enter your name', 'error');
            return false;
        }
        if (!email || !emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return false;
        }
        if (message.length < 10) {
            showMessage('Message should be at least 10 characters long', 'error');
            return false;
        }
        return true;
    }
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message form-message--${type}`;
        
        if (type === 'success') {
            messageDiv.style.animation = 'fadeInUp 0.5s ease-out';
        }
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.header__nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Skills interaction
    document.querySelectorAll('.skills__item').forEach((item, index) => {
        item.addEventListener('click', () => {
            item.classList.toggle('skills__item--active');
        });
        
        // Staggered entrance
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Project cards hover sound effect (optional)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) rotate(1deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(section);
    });
    
    // PWA-like install prompt (bonus)
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });
});
