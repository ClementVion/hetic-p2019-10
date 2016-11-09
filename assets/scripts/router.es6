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

router.get('projects/:id', function(req){
    console.log("projects/id");
    console.log(req.params.id);
    getTemplate('page-project');
});

function getTemplate(name){
    console.log(name);
    var template = require('../../assets/html/page-project.html');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/html/' + name + '.html', false);
    xhr.onreadystatechange = function() {
        container.innerHTML = template(require('../content/name.json'));
    };
    xhr.send();
};
