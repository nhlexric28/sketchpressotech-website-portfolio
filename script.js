function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}


document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.boxShadow = '0 0 10px #00ff99';
    });
    element.addEventListener('blur', () => {
        element.style.boxShadow = 'none';
    });
});


