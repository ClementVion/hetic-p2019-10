// Define the app main container
var container = document.querySelector('.container');
var balam  = 'rrrr';
// Define the router and the routes
var router = new Grapnel({
    pushState: true
});

router.get('/home', function() {
    console.log("calling home");
    getTemplate('home');
});

router.get('/project/:id?', function(req){
    var id = req.params.id;
    getTemplate('single-project');
});

router.get('/all-works', function(req){
    getTemplate('all-works');
});

function getTemplate(name) {
    console.log("get template start function");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'assets/html/' + name + '.html', false);
    xhr.onreadystatechange = function() {
        console.log(this.readyState);
        console.log(this.responseText);
        container.innerHTML = this.responseText;
    };
    console.log('over');
    xhr.send();
};
