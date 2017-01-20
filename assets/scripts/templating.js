const loader = require('./loader.js');
const routing = require('./router.js');

const container = document.querySelector('.container');

/**
 * When click on the link, navigate
 * @param {object} elem the link clicked.
 * @returns {void}
 */
function listenClicks(elem) {
  container.classList.toggle('container--visible');
  window.setTimeout(() => {
    container.innerHTML = '';
    routing.router.navigate(elem.getAttribute('href'));
  }, 1000);
}


/**
 * Listens to the clicks on the links
 * @param {object} element the container we want to watch.
 * @returns {void}
 */
function initClicks(element) {
  const links = element.querySelectorAll('a');
  for (let link of links.keys()) {
    links[link].addEventListener('click', (e) => {
      e.preventDefault();
      listenClicks(links[link]);
    });
  }
}

/**
 * Disable transitions on small screens
 * Disable select on small screens
 * @returns {void}
 */
function mobileBehaviour() {
  console.log('checking');
  if (parseInt(getComputedStyle(document.querySelector('.container')).width, 10) <= 700) {
    const allTags = document.querySelector('body').getElementsByTagName('*');
    for (var i = 0, len = allTags.length; i < len; i++) {
      allTags[i].classList.add('notransition');
      allTags[i].classList.add('noSelect');
    }
  }
}

/**
 * Gets the header
 * @param {string} page the page we load the header in.
 * @returns {void}
 */
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

/**
 * Gets the body template
 * @param {string} name the name of the page.
 * @param {string} id the id of the page we load
 * @returns {void}
 */
function getTemplate(name, id) {
  getHeader(name);
  const template = require('../../assets/html/' + name + '.html');
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `../../assets/html/${name}.html`, false);
  xhr.onreadystatechange = () => {
    if (id) {
      const compile = template(require('../content/' + id + '.json'));
      container.innerHTML += compile;
    } else {
      const compile = template();
      container.innerHTML += compile;
    }
    mobileBehaviour();
    console.log(window.pageYOffset);
    window.scrollTo(0,0);
  };
  xhr.send();
}

/**
 * Gets the loader
 * @param {string} name the name of the page.
 * @param {string} id the id of the page we load
 * @returns {void}
 */
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
