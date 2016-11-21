let container = document.querySelector('.container');
let loader = require('./loader.es6');
let routing = require('./router.es6');

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
        routing.router.navigate(e.getAttribute('href'));  
    },1000);
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

exports.initClicks = initClicks;
exports.listenClicks = listenClicks;
exports.getLoader = getLoader;
exports.getTemplate = getTemplate;
exports.getHeader = getHeader;
