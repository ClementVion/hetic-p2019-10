// Define the app main container
var container = document.querySelector('.container');

// Define the router and the routes
var router = new Grapnel({
    pushState: true
});

router.get('/home', function() {
    getTemplate('home');
});

router.get('/project', function(req){
    var id = req.params.id;
    getTemplate('page-project');
});

router.get('/all-works', function(req){
    getTemplate('all-works');
});

function getTemplate(name){
    console.log("get template start function");
    var template = require('../../assets/html/page-project.html');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/html/' + name + '.html', false);
    xhr.onreadystatechange = function() {
        container.innerHTML = template({name: 'Hello'});
    };
    xhr.send();
};
