let home = require('./page-home.es6');
let project = require('./page-project.es6');
let container = document.querySelector('.container');
let body = document.querySelector('body');

let routes = ['tropical'];

function getTemplate(name, id) {
    let template = require('../../assets/html/' + name + '.html');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../assets/html/' + name + '.html', false);
    xhr.onreadystatechange = function() {
        if (id) {
            var compile = template(require('../content/' + id + '.json'));
        } else {
            var compile = template();
        }
        console.log(compile);
        if (container.innerHTML.length > 0) {
            container.innerHTML = '';
        }
        container.innerHTML += compile;
    };
    xhr.send();
};

var router = new Grapnel({
    pushState: true
});

router.get('/', function(req) {
    getTemplate('page-home');
    console.log('home');
    window.setTimeout(function()
    {  
        container.classList.toggle('container--visible');
        home.init();
        initClicks(container);
    }
    ,1000);
});



router.get('/projects/:id', function(req) {
    if (routes.indexOf(req.params.id) === -1 ) {
        getTemplate('404');
        window.setTimeout(function()
            {   
                container.classList.toggle('container--visible');
                initClicks(container);
            }
        ,1000);
    } else {
        getTemplate('page-project', req.params.id);
        // document.querySelector('.project').style.display = 'none';
        window.setTimeout(function()
            {   
                container.classList.toggle('container--visible');
                project.init();
                initClicks(container);
            }
        ,1000);
    }
});

router.get('/*', function(req, e) {
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
function initClicks(element) {
  let links = element.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
        e.preventDefault();
        listenClicks(this);
    });
  }
}

function listenClicks(e) {
    container.classList.toggle('container--visible');
    window.setTimeout(function()
    {
        console.log('1s');
        container.innerHTML = '';
        router.navigate(e.getAttribute('href'));  
    },1000);
}

window.onpopstate = function(e) {
    container.classList.toggle('container--visible');
}

// initClicks(container);