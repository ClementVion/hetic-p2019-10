const home = require('./page-home.js');
const project = require('./page-project.js');
const routesModule = require('./routes.js');
const allworks = require('./page-allworks.js');
const templating = require('./templating.js');
const Grapnel = require('grapnel');

const container = document.querySelector('.container');
const routes = routesModule.routes;
const router = new Grapnel({pushState: true});


router.get('/', () => {
  if (!container.classList.contains('loaded')) {
    templating.getLoader('page-home', 'home');
  } else {
    templating.getTemplate('page-home', 'home');
  }
  window.setTimeout(() => {
    container.classList.toggle('container--visible');
    if (container.classList.contains('loaded')) {
      home.init();
    }
    templating.initClicks(container);
  }
  , 1000);
});


router.get('/projects/:id', (req) => {
  if (routes.indexOf(req.params.id) === -1) {
    templating.getTemplate('404');
    window.setTimeout(() => {
      container.classList.toggle('container--visible');
      templating.initClicks(container);
    }
    , 1000);
  } else {
    if (!container.classList.contains('loaded')) {
      templating.getLoader('page-project', req.params.id);
    } else {
      templating.getTemplate('page-project', req.params.id);
    }
    window.setTimeout(() => {
      container.classList.toggle('container--visible');
      if (container.classList.contains('project--scrolling')) {
        document.querySelector('.container').classList.toggle('project--scrolling');
      }
      if (container.classList.contains('loaded')) {
          project.init();
      }
      templating.initClicks(container);
    }
    , 1000);
  }
});

router.get('/works', () => {
  if (!container.classList.contains('loaded')) {
    templating.getLoader('allworks', 'home');
  } else {
    templating.getTemplate('allworks', 'home');
  }
  window.setTimeout(() => {
    container.classList.toggle('container--visible');
    if (container.classList.contains('loaded')) {
      allworks.init();
    }
    templating.initClicks(container);
  }
  , 1000);
});

router.get('/about', () => {
  if (!container.classList.contains('loaded')) {
    templating.getLoader('about');
  } else {
    templating.getTemplate('about');
  }
  window.setTimeout(() => {
    container.classList.toggle('container--visible');
    templating.initClicks(container);
  }
  , 1000);
});

router.get('/*', (req, e) => {
  if (!e.parent()) {
    templating.getTemplate('404');
    window.setTimeout(() => {
      container.classList.toggle('container--visible');
      templating.initClicks(container);
    }
    , 1000);
  }
});

window.onpopstate = () => {
  container.classList.toggle('container--visible');
};

exports.router = router;
