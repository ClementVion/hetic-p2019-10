// Define the app main container
var container = document.querySelector('.container');

// Define the router and the routes
var router = new Grapnel({
    pushState: true
});

router.get('/home', function() {
    getTemplate('page-home');
    var home = require('../../assets/scripts/page-home.es6');
});

router.get('/project', function(req){
    var id = req.params.id;
    getTemplate('page-project');
    var project = require('../../assets/scripts/page-project.es6');
});

router.get('/all-works', function(req){
    getTemplate('all-works');
});

function getTemplate(name) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/html/' + name + '.html', false);
    xhr.onreadystatechange = function() {
        container.innerHTML = this.responseText;
    };
    xhr.send();
};
