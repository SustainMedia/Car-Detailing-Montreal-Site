$(document).ready(function() {
    $('#schedule_btn_form').on('click', function(e) {
        e.preventDefault();

        $('.schedule_message').html('');

        const service = $('#schedule_service').val();
        const address = $('#schedule_address').val().trim();
        const name = $('#schedule_name').val().trim();
        const email = $('#schedule_email').val().trim();
        const phone = $('#schedule_phone').val().trim();
        const currentURL = window.location.href;

        if (!service) {
            $('.schedule_message').html('<div style="color:red;">Please select a service.</div>');
            return;
        } else if (address === '') {
            $('.schedule_message').html('<div style="color:red;">Please enter your full address.</div>');
            return;
        } else if (name === '') {
            $('.schedule_message').html('<div style="color:red;">Please enter your name.</div>');
            return;
        } else if (email === '' || !/^\S+@\S+\.\S+$/.test(email)) {
            $('.schedule_message').html('<div style="color:red;">Please enter a valid email.</div>');
            return;
        } else if (phone === '' || !/^\+?[0-9\s\-]{7,15}$/.test(phone)) {
            $('.schedule_message').html('<div style="color:red;">Please enter a valid phone number.</div>');
            return;
        }

        $.ajax({
            url: './assets/php/submit-form-schedule.php',
            method: 'POST',
            data: {
                service: service,
                address: address,
                name: name,
                email: email,
                phone: phone,
                page_url: currentURL
            },
            success: function(response) {
                $('.schedule_message').html('<div style="color:green;">Thank you! Your request has been submitted.</div>');
                $('#schedule_service').val('').prop('selectedIndex', 0);
                $('#schedule_address, #schedule_name, #schedule_email, #schedule_phone').val('');
            },
            error: function(xhr, status, error) {
                $('.schedule_message').html('<div style="color:red;">There was an error submitting the form. Please try again later.</div>');
            }
        });
    });
});



$(document).ready(function() {
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();

        $('.showMessage').html('');

        const name = $('#name').val().trim();
        const address = $('#address').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();
        const message = $('#message').val().trim();
        const currentURL = window.location.href;

        let services = [];
        $('input[name="services[]"]:checked').each(function() {
            services.push($(this).val());
        });

        if (name === '') {
            $('.showMessage').html('<div style="color:red;">Please enter your name.</div>');
            return;
        } else if (address === '') {
            $('.showMessage').html('<div style="color:red;">Please enter your address.</div>');
            return;
        } else if (email === '' || !/^\S+@\S+\.\S+$/.test(email)) {
            $('.showMessage').html('<div style="color:red;">Please enter a valid email.</div>');
            return;
        } else if (phone === '' || !/^\+?[0-9\s\-]{7,15}$/.test(phone)) {
            $('.showMessage').html('<div style="color:red;">Please enter a valid phone number.</div>');
            return;
        } else if (services.length === 0) {
            $('.showMessage').html('<div style="color:red;">Please select at least one service.</div>');
            return;
        } else if (message === '') {
            $('.showMessage').html('<div style="color:red;">Please enter your message.</div>');
            return;
        }

        $.ajax({
            url: './assets/php/submit-form-contact.php',
            method: 'POST',
            data: {
                name: name,
                address: address,
                email: email,
                phone: phone,
                services: services,
                message: message,
                page_url: currentURL
            },
            success: function(response) {
                $('.showMessage').html('<div style="color:green;">Thank you! Your message has been submitted.</div>');
                $('#contact-form')[0].reset();
            },
            error: function(xhr, status, error) {
                $('.showMessage').html('<div style="color:red;">There was an error submitting the form. Please try again later.</div>');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const scrollButtons = document.querySelectorAll('.js-scroll-trigger');

    scrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSelector = button.dataset.target;
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.warn(`Target element not found for selector: ${targetSelector}`);
            }
        });
    });
});