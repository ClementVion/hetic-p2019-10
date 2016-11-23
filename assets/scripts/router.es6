let home = require('./page-home.es6');
let project = require('./page-project.es6');
let routesModule = require('./routes.es6');
let allworks = require('./page-allworks.es6');
let container = document.querySelector('.container');
let body = document.querySelector('body');
let loader = require('./loader.es6');
let templating = require('./templating.es6');

let routes = routesModule.routes;
let previousPage;

var router = new Grapnel(
    {
        pushState: true
    }
);


router.get('/', function(req)
{
    previousPage = 'home';
    if(!container.classList.contains('loaded')){
        templating.getLoader('page-home', 'home');
    } else {
        templating.getTemplate('page-home', 'home');
    }
    window.setTimeout(function()
    {
        container.classList.toggle('container--visible');
        if(container.classList.contains('loaded')) {
            home.init();
        }
        templating.initClicks(container);
    }
    ,1000);
});

router.get('/projects/:id', function(req)
{
    if (routes.indexOf(req.params.id) === -1 ) {
        templating.getTemplate('404');
        window.setTimeout(function()
            {
                container.classList.toggle('container--visible');
                templating.initClicks(container);
            }
        ,1000);
    } else {

        if(!container.classList.contains('loaded')){
            templating.getLoader('page-project', req.params.id);
        } else {
            templating.getTemplate('page-project', req.params.id);
        }
        window.setTimeout(function()
        {
            container.classList.toggle('container--visible');
            if(container.classList.contains('project--scrolling')){
                document.querySelector('.container').classList.toggle('project--scrolling')
            }
            if(container.classList.contains('loaded')) {
                    project.init();
                previousPage = 'project';
            }
            templating.initClicks(container);
        }
        ,1000);
    }
});

router.get('/works', function(req)
{
    previousPage = 'works';
   if(!container.classList.contains('loaded')){
        templating.getLoader('allworks', 'home');
    } else {
        templating.getTemplate('allworks', 'home');
    }
    window.setTimeout(function()
    {
        container.classList.toggle('container--visible');
        if(container.classList.contains('loaded')) {
            allworks.init();
        }
        templating.initClicks(container);
    }
    ,1000);
});

router.get('/about', function(req)
{
    previousPage = 'about';
   if(!container.classList.contains('loaded')){
        templating.getLoader('about');
    } else {
        templating.getTemplate('about');
    }
    window.setTimeout(function()
    {
        container.classList.toggle('container--visible');
        templating.initClicks(container);
    }
    ,1000);
});

router.get('/*', function(req, e)
{
    if (!e.parent()) {
        previousPage = '404';
        templating.getHeader('404');
        window.setTimeout(function()
        {
            container.classList.toggle('container--visible');
            templating.initClicks(container);
        }
        ,1000);
    }
});

window.onpopstate = function(e)
{
    container.classList.toggle('container--visible');
}

 exports.router = router;
