let home = require('./page-home.es6');
let project = require('./page-project.es6');
let container = document.querySelector('.container');
let body = document.querySelector('body');

function getTemplate(name, id) {
    window.setTimeout(function()
        {
            container.classList.toggle('container--visible');
        }, 1000);
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

var router = new Grapnel({
    pushState: true
});

router.get('/projects/:id', function(req) {
    getTemplate('page-project', req.params.id);
    // document.querySelector('.project').style.display = 'none';
    window.setTimeout(function()
        {   
            project.init();
        }
    ,1000);
});

router.get('/', function(req) {
    getTemplate('page-home');
        window.setTimeout(function()
        {   
           home.init();
        }
    ,1000);
});

router.get('/*', function(req, e) {
    if (!e.parent()) {
        getTemplate('404');
    }
});

// Listen for clicks to navigate
function initClicks(element) {
  let links = element.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
        e.preventDefault();
        listenClicks(e);
    });
  }
}

function listenClicks(e) {
    container.classList.toggle('container--visible');
    console.log('toggle');
    window.setTimeout(function()
    {
        container.innerHTML = '';
        router.navigate(e.target.pathname);  
    },1000);
}

initClicks(body);
