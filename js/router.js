'use strict';

class Route {
    constructor(name, html, defaultRoute) {
        this.name = name;
        this.html = html;
        this.default = defaultRoute;
    }
    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}

class Router {
    constructor(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
        this.init();
    }

    init() {
        window.addEventListener('hashchange', (e) => {
            this.hasChanged();
        });

        this.hasChanged();
    }

    hasChanged() {
        const r = this.routes;

        
        if(window.location.hash.length > 0) {
            for( let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    this.goToRoute(route.html);
                }
            }
        } else {
            for(let i = 0, length = r.length; i < length; i++) {
                let route = r[i];
                if(route.default) {
                    console.log('defaulting');
                    this.goToRoute(route.html);
                }
            }
        }
    }

    goToRoute(html) {
        const url = 'views/' + html;
        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
            if(http.readyState === 4 && http.status === 200) {
                this.rootElem.innerHTML = http.responseText;
            }
        };

        http.open('GET', url, true);
        http.send();
    }
}
