// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// EmailJS Integration
(function() {
    // IMPORTANT: Replace these with your actual EmailJS credentials
    const USER_ID = 'YOUR_USER_ID';       // From EmailJS Account Settings
    const SERVICE_ID = 'YOUR_SERVICE_ID'; // From Email Services
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // From Email Templates

    // Initialize EmailJS with your User ID
    emailjs.init(USER_ID);

    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Disable submit button during submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Send email using EmailJS
        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            from_name: name,
            from_email: email,
            message: message,
            to_email: "arjun.magotra.india@gmail.com"
        }).then(
            function(response) {
                console.log("SUCCESS", response);
                alert("Thank you for your message! I will get back to you soon.");
                contactForm.reset();
            },
            function(error) {
                console.log("FAILED", error);
                alert("Oops! There was a problem sending your message. Please try again.");
            }
        ).finally(() => {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    });
})();

// Contact form submission handler
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const inputs = this.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (isValid) {
        // Removed alert and form reset here
    } else {
        alert('Please fill out all fields.');
    }
});

// Add clipboard copy functionality to contact info
document.querySelectorAll('.contact-info p').forEach(infoItem => {
    infoItem.addEventListener('click', function() {
        // Extract the text content after the colon
        const textToCopy = this.textContent.split(': ')[1];
        
        // Create a temporary textarea to copy text
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);
        
        // Select and copy the text
        tempTextArea.select();
        document.execCommand('copy');
        
        // Remove the temporary textarea
        document.body.removeChild(tempTextArea);
        
        // Show a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Copied!';
        tooltip.style.position = 'fixed';
        tooltip.style.bottom = '20px';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.backgroundColor = '#2ecc71';
        tooltip.style.color = 'white';
        tooltip.style.padding = '10px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.zIndex = '1000';
        
        document.body.appendChild(tooltip);
        
        // Remove tooltip after 2 seconds
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 2000);
    });
});

// Optional: Add subtle animations or interactions
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('fade-in');
        }
    });
});
