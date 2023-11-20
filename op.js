document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav a');
    const contentContainer = document.querySelector('.content-container');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    function handleNavLinkClick(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        scrollToTarget(targetElement);

        e.preventDefault();
    }

    function scrollToTarget(targetElement) {
        window.scroll({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', function () {
        highlightActiveSection();
        toggleScrollToTopBtn();
    });

    function highlightActiveSection() {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                navLinks.forEach(link => link.classList.remove('active'));
                document.querySelector(`nav a[href="#${section.id}"]`).classList.add('active');
            }
        });
    }

    function toggleScrollToTopBtn() {
        const scrollPosition = window.scrollY;
        scrollToTopBtn.style.display = scrollPosition > 300 ? 'block' : 'none';
    }

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (validateInputs(nameInput, emailInput, messageInput)) {
            submitForm(nameInput, emailInput, messageInput);
        }
    });

    function submitForm(nameInput, emailInput, messageInput) {
        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('email', emailInput.value);
        formData.append('message', messageInput.value);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'submit-form.php', true);
        xhr.onload = function () {
            if (this.status === 200) {
                alert('Form submitted successfully!');
            } else {
                alert('An error occurred while submitting the form. Please try again.');
            }
        };
        xhr.send(formData);
    }

    function validateInputs(...inputs) {
        let isValid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }

    const loadingSpinner = document.getElementById('loadingSpinner');
});



