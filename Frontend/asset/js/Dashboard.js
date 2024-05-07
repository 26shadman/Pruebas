document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector(".toggle");
    const menuDashboard = document.querySelector(".menu-dashboard");
    const enlacesMenu = document.querySelectorAll(".enlace");

    if (toggle && menuDashboard && enlacesMenu.length > 0) {
        const iconoMenu = toggle.querySelector("i");

        toggle.addEventListener("click", () => {
            menuDashboard.classList.toggle("open");
            iconoMenu.classList.toggle("bx-x");
            iconoMenu.classList.toggle("bx-menu");
        });

        enlacesMenu.forEach(enlace => {
            enlace.addEventListener("click", () => {
                // Eliminar la clase activo de todos los enlaces
                enlacesMenu.forEach(enlace => {
                    enlace.classList.remove("activo");
                });
                // Agregar la clase activo al enlace clickeado
                enlace.classList.add("activo");

                menuDashboard.classList.add("open");
                iconoMenu.classList.replace("bx-menu", "bx-x");
                
                const url = enlace.getAttribute("data-url");
                window.location.href = url;
            });
        });
    } else {
    }
});
