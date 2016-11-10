// Define the app main container
var container = document.querySelector('.container');
var routes = {
    '/projects/:id': function(req) {
        getTemplate('page-project', req.params.id);
        var project = require('../../assets/scripts/page-project.es6');
    },
    '/': function(req) {
        getTemplate('page-home');
        getTemplate('loader');
        var home = require('../../assets/scripts/page-home.es6');
    },
    '/*': function(req, e) {
        if (!e.parent()) {
            getTemplate('404');
        }
    }
}

Grapnel.listen({
    pushState: true
}, routes);

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
        container.innerHTML = container.innerHTML + compile;
    };
    xhr.send();
};
