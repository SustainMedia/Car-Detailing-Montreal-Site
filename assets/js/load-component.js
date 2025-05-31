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
    setTimeout(() => {

        adjustMainContentPadding();

        document.querySelectorAll('.setImagePath').forEach(img => {
            const filename = img.getAttribute('data-filename');
            const origin = window.location.origin;
            // console.log(origin)
            if(origin === 'https://alikhokhar123.github.io') {
                img.src = `${window.location.origin}/Free-Flow-Plumbing-Site/assets/images/${filename}`;
            }
            else{
                img.src = `${window.location.origin}/assets/images/${filename}`;
            }
        });

        document.querySelectorAll('.setNavLinkPath').forEach(link => {
            const filename = link.getAttribute('data-filename');
            const origin = window.location.origin;
            console.log(origin)
            if(origin === 'https://alikhokhar123.github.io') {
                link.href = `${window.location.origin}/Free-Flow-Plumbing-Site/${filename}`;
            }
            else{
                console.log("it works")
                link.href = `${window.location.origin}/${filename}`;
            }
        });

    }, 500);
});

$(document).ready(function () {
    $("#footer-placeholder").load("./assets/components/footer.html");
});