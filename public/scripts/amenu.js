(function (window, document) {

    var menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function (e) {
        var active = 'active';
        var mq = window.matchMedia( "(max-width: 500px)");
        if (!(mq.matches)) {
            e.preventDefault();
            toggleClass(menu, active);
            toggleClass(menuLink, active);
        }
    };

}(this, this.document));
