// Define the app main container
var container = document.querySelector('.container');

// Define the router and the routes
var router = new Grapnel({
    pushState: true,
    root: '/'
});

router.get('home', function(req) {
    getTemplate('home');
});

router.get('projects/:id', function(req) {
    getTemplate('page-project', req.params.id);
});

function getTemplate(name, id) {
    var template = require('../../assets/html/' + name + '.html');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../assets/html/' + name + '.html', false);
    xhr.onreadystatechange = function() {
        if (id) {
            var compile = template(require('../content/' + id + '.json'));
        } else {
            var compile = template();
        }
        container.innerHTML = compile;
    };
    xhr.send();
};
