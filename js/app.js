'use strict';

let router;

const init = () => {
    router = new Router([
            new Route('home', 'home.html', true),
            new Route('about', 'about.html')
    ]);
}

init();