function adjustMainContentPadding() {
    const navbar = document.querySelector('.main-nav-box');
    const mainContent = document.querySelector('.main-content');

    if (navbar && mainContent) {
        const navbarHeight = navbar.offsetHeight;
        console.log(navbarHeight)
        mainContent.style.paddingTop = `${navbarHeight}px`;
    }
}

$(document).ready(function () {
    $("#nav-placeholder").load("./assets/components/header.html");
});

$(document).ready(function () {
    $("#footer-placeholder").load("./assets/components/footer.html");
});