require('babel-polyfill');
require('./assets/styles/main.scss');
window._ = require('underscore');
var gsap = require('gsap'),
lazyload = require('lazysizes'),
virtualscroll = require('./assets/scripts/VirtualScroll.js'),
home = require('./assets/scripts/page-home.js'),
project = require('./assets/scripts/page-project.js'),
routing = require('./assets/scripts/router.js'),
templating = require('./assets/scripts/templating.js'),
loader = require('./assets/scripts/loader.js');
require('babel-runtime/core-js/promise').default = require('bluebird');
