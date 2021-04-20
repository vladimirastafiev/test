/* Nav-menu */
document.querySelectorAll('.nav-item').forEach((it_menu) => {
    it_menu.onclick = function () {
        if (!it_menu.classList.contains('active')) {
            document.querySelectorAll('.nav-item').forEach((el) => { /* remove class 'active' for all 'nav-item' */
                if (el.classList.contains('active'))
                    el.classList.remove('active');
            })
            it_menu.classList.add('active');
        }
    }
})
