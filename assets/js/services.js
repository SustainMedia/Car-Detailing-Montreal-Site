$(document).ready(function () {
    $('.question').click(function () {
        $(this).next('.answer').slideToggle();
        $(this).find('.plus, .minus').toggleClass('hidden');
    });
});