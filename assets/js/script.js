$(document).ready(function () {
    console.log('JS Loaded');

    $('#schedule_btn_form').on('click', function (e) {
        e.preventDefault();
        console.log("Button clicked");

        $('.schedule_message').html('');

        let service = $('#schedule_service').val();
        let address = $('#schedule_address').val().trim();
        let name = $('#schedule_name').val().trim();
        let email = $('#schedule_email').val().trim();
        let phone = $('#schedule_phone').val().trim();
        let pageUrl = window.location.href;

        if (!service || !address || !name || !email || !phone) {
            $('.schedule_message').html('<span style="color: red;">Please fill out all required fields.</span>');
            return;
        }

        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/i;
        if (!emailPattern.test(email)) {
            $('.schedule_message').html('<span style="color: red;">Please enter a valid email address.</span>');
            return;
        }

        $('#schedule_btn_form').prop('disabled', true);

        $.ajax({
            url: './assets/php/submit-form-schedule.php',
            method: 'POST',
            data: {
                name: name,
                address: address,
                email: email,
                phone: phone,
                service: service,
                page_url: pageUrl
            },
            success: function (res) {
                console.log(res);
                $('.schedule_message').html('<span style="color: green;">Thank you! Your estimate request has been sent.</span>');
                $('#schedule_service').prop('selectedIndex', 0);
                $('#schedule_address').val('');
                $('#schedule_name').val('');
                $('#schedule_email').val('');
                $('#schedule_phone').val('');
                $('#schedule_btn_form').prop('disabled', false);
            },
            error: function () {
                $('.schedule_message').html('<span style="color: red;">Something went wrong. Please try again later.</span>');
                $('#schedule_btn_form').prop('disabled', false);
            }
        });
    });
});