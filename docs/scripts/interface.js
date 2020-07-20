function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

ready(function () {
    // set current page active
    var url = window.location.pathname;

    var links = document.querySelectorAll("nav.sidebar a");
    for (var i = 0; i < links.length; i++) {
        if (url.endsWith(links[i].getAttribute("href"))) {
            links[i].parentNode.classList.add("active");
        }
    }

    // handle search
    var search = document.getElementById("search");
    if (search) {
        search.addEventListener("keydown", function (e) {
            if (e.which === 13 || e.keyCode === 13) {
                window.location.href = "/search/?q=" + e.target.value;
            }
        });
    }

    // handle scrolling
    var nav = document.querySelector("nav.sidebar");
    var navButton = document.querySelector('body > .container > .sidebarToggle');
    var mainContent = document.querySelector('body > .container > main');
    var navStick = false;
    var headerElement = document.querySelector('body > header');

    var onScroll = function (e) {
        // phones
        // if (window.innerWidth <= 480) {
        //     nav.style.top = 0;
        //     return;
        // }

        var s = document.body.scrollTop;
        var headerHeight = headerElement.clientHeight;
        if (s < headerHeight) {
            nav.style.top = (headerHeight - s) + "px";
            navStick = false;
        } else if (!navStick) {
            nav.style.top = 0;
            navStick = true;
        }
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();


    var onNavButtonClick = function (evt) {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            navButton.classList.remove('active');
        } else {
            nav.classList.add('active');
            navButton.classList.add('active');
        }

        evt.preventDefault();
        evt.stopPropagation();
    };
    navButton.addEventListener('mousedown', onNavButtonClick, false);
    navButton.addEventListener('touchstart', onNavButtonClick, false);

    var onMainContentClick = function (evt) {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            navButton.classList.remove('active');

            evt.preventDefault();
            evt.stopPropagation();
        }
    };
    mainContent.addEventListener('mousedown', onMainContentClick);
    mainContent.addEventListener('touchdown', onMainContentClick);


    var filterNav = function (value) {
        clearFilter();

        var els = document.querySelectorAll("nav.sidebar li");

        for (var i = 0; i < els.length; i++) {
            if (els[i].id.toLowerCase().indexOf(value.toLowerCase()) < 0) {
                if (els[i].classList) {
                    els[i].classList.add("hidden");
                }
            }
        }
    };

    var clearFilter = function () {
        var els = document.querySelectorAll("nav.sidebar li");

        for (var i = 0; i < els.length; i++) {
            if (els[i].classList) {
                els[i].classList.remove("hidden");
            }
        }
    };

    var filter = document.getElementById("filter-input");
    filter.addEventListener("keydown", function (e) {
        filterNav(e.target.value);
    });
    filter.addEventListener("keyup", function (e) {
        filterNav(e.target.value);
    });


    // // code highlighting
    // var els = document.querySelectorAll("textarea");
    // for (var i = 0; i < els.length; i++) {
    //     CodeMirror(els[i], {
    //         value: els[i].textContent,
    //         mode: "javascript",
    //         readOnly: true
    //     });
    // }
});
