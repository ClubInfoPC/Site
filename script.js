// Gestion du thème
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialiser le thème
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Changer le thème
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Bouton retour en haut
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation des sections au défilement
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les sections pour l'animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Menu mobile
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Copier les liens de navigation
    const navLinks = document.querySelector('.nav-links').cloneNode(true);
    mobileMenu.appendChild(navLinks);
    
    // Ajouter le bouton et le menu au navbar
    navbar.appendChild(mobileMenuButton);
    navbar.appendChild(mobileMenu);
    
    // Gérer l'ouverture/fermeture du menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.querySelector('i').className = 
            mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    });
    
    // Fermer le menu quand on clique sur un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuButton.querySelector('i').className = 'fas fa-bars';
        });
    });
};

// Initialiser les fonctionnalités
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    createMobileMenu();
    
    // Ajouter des classes d'animation aux éléments
    document.querySelectorAll('.projet-card, .membre-card, .stat-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
});

// Ajouter des styles CSS pour les animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .mobile-menu {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background-color: var(--background);
        padding: 1rem;
        transform: translateY(-100%);
        transition: transform 0.3s ease-in-out;
        z-index: 999;
    }
    
    .mobile-menu.active {
        transform: translateY(0);
    }
    
    .mobile-menu .nav-links {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        color: var(--text-color);
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }
    }
`;

document.head.appendChild(style); 