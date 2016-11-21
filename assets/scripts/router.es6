let home = require('./page-home.es6');
let project = require('./page-project.es6');
let routesModule = require('./routes.es6');
let container = document.querySelector('.container');
let body = document.querySelector('body');
let loader = require('./loader.es6');

let routes = routesModule.routes;

var router = new Grapnel(
    {
        pushState: true
    }
);


router.get('/', function(req)
{   

    if(!container.classList.contains('loaded')){
        getLoader('page-home', 'home');
    } else {
        getTemplate('page-home', 'home');
    }
    window.setTimeout(function()
    {  
        console.log('hihi');
        container.classList.toggle('container--visible');
        if(container.classList.contains('loaded')) {
            home.init();
        }
        initClicks(container);
    }
    ,1000);
});

router.get('/projects/:id', function(req) 
{
    if (routes.indexOf(req.params.id) === -1 ) {
        getTemplate('404');
        window.setTimeout(function()
            {   
                container.classList.toggle('container--visible');
                initClicks(container);
            }
        ,1000);
    } else {
        
        if(!container.classList.contains('loaded')){
            getLoader('page-project', req.params.id);
        } else {
            getTemplate('page-project', req.params.id);
        }
        window.setTimeout(function()
        {   
            container.classList.toggle('container--visible');
            if(container.classList.contains('project--scrolling')){
                document.querySelector('.container').classList.toggle('project--scrolling')
            }
            if(container.classList.contains('loaded')) {
                project.init();
            }
            initClicks(container);
        }
        ,1000);
    }
});

router.get('/about', function(req)
{
   if(!container.classList.contains('loaded')){
        getLoader('about');
    }
    window.setTimeout(function()
    {  
        container.classList.toggle('container--visible');
        initClicks(container);
    }
    ,1000);
});

router.get('/*', function(req, e) 
{
    if (!e.parent()) {
        getTemplate('404');
        window.setTimeout(function()
        {  
            container.classList.toggle('container--visible');
            initClicks(container);
        }
        ,1000);
    } 
});

// Listen for clicks to navigate
function initClicks(element) 
{
  let links = element.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
        e.preventDefault();
        listenClicks(this);
    });
  }
}

function listenClicks(e) 
{
    container.classList.toggle('container--visible');
    window.setTimeout(function()
    {
        container.innerHTML = '';
        router.navigate(e.getAttribute('href'));  
    },1000);
}

window.onpopstate = function(e) 
{
    container.classList.toggle('container--visible');
}

function getTemplate(name, id) 
{
    getHeader(name);
    let template = require('../../assets/html/' + name + '.html');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../assets/html/' + name + '.html', false);
    xhr.onreadystatechange = function() {
        if (id) {
            var compile = template(require('../content/' + id + '.json'));
        } else {
            var compile = template();
        }
        container.innerHTML += compile;
    };
    xhr.send();
};

function getHeader(page) {
     var template = require('../../assets/html/partials/header.html');
     var xhr = new XMLHttpRequest();
     xhr.open('GET', '../../assets/html/partials/header.html', false);
     xhr.onreadystatechange = function() {
    if (page != 'page-home') {
        var param = {project: page};
        var compile = template(param);
    } else {
        var compile = template();
    }
    if (container.innerHTML.length > 0 && container.classList.contains('loaded')) {
        container.innerHTML = '';
    }
    container.innerHTML += compile;
    };
    xhr.send();
 };

function getLoader(name, id) {
    var template = require('../../assets/html/loader.html');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../assets/html/loader.html', false);
    xhr.onreadystatechange = function() {
        if (container.innerHTML.length > 0) {
            container.innerHTML = '';
        }
        var compile = template();
        container.innerHTML = compile;
        getTemplate(name,id);
        loader.init();
    };
    xhr.send();
 };

 exports.router = router;
