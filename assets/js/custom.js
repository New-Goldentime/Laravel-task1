$('.test_slide').slick({
    infinite: true,
    speed: 1000,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
});

document.getElementById("toggle").addEventListener("click", () => {
    const sidebarEl = document.getElementsByClassName("sidebar")[0];
    sidebarEl.classList.toggle("sidebar--isHidden");

    // document.getElementById("toggle").innerHTML = sidebarEl.classList.contains(
    //     "sidebar--isHidden"
    // )
    //     ? "Show Sidebar"
    //     : "Hide Sidebar";
});
