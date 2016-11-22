const loader = require('./loader.es6');
const routing = require('./router.es6');

const container = document.querySelector('.container');

function listenClicks(elem) {
  console.log(elem);
  container.classList.toggle('container--visible');
  window.setTimeout(() => {
    container.innerHTML = '';
    routing.router.navigate(elem.getAttribute('href'));
  }, 1000);
}

// Listen for clicks to navigate
function initClicks (element) {
  const links = element.getElementsByTagName('a');
  for (const link of links) {
    link.addEventListener('click', (e) => {
      console.log(this);
      e.preventDefault();
      listenClicks(link);
    });
  }
}

function getHeader(page) {
  const template = require('../../assets/html/partials/header.html');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../../assets/html/partials/header.html', false);
  xhr.onreadystatechange = () => {
    if (page !== 'page-home') {
      const param = { project: page };
      const compile = template(param);
      if (container.innerHTML.length > 0 && container.classList.contains('loaded')) {
        container.innerHTML = '';
      }
      container.innerHTML += compile;
    } else {
      const compile = template();
      if (container.innerHTML.length > 0 && container.classList.contains('loaded')) {
        container.innerHTML = '';
      }
      container.innerHTML += compile;
    }
  };
  xhr.send();
}

function getTemplate(name, id) {
  getHeader(name);
  const template = require('../../assets/html/' + name + '.html');
  const xhr = new XMLHttpRequest();

  xhr.open('GET', '../../assets/html/' + name + '.html', false);
  xhr.onreadystatechange = () => {
    if (id) {
      const compile = template(require('../content/' + id + '.json'));
      container.innerHTML += compile;
    } else {
      const compile = template();
      container.innerHTML += compile;
    }
  };
  xhr.send();
}

function getLoader(name, id) {
  const template = require('../../assets/html/loader.html');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../../assets/html/loader.html', false);
  xhr.onreadystatechange = () => {
    if (container.innerHTML.length > 0) {
      container.innerHTML = '';
    }
    const compile = template();
    container.innerHTML = compile;
    getTemplate(name, id);
    loader.init();
  };
  xhr.send();
}

exports.initClicks = initClicks;
exports.listenClicks = listenClicks;
exports.getLoader = getLoader;
exports.getTemplate = getTemplate;
exports.getHeader = getHeader;
