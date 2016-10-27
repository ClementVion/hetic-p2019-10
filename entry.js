require('./assets/styles/main.scss');
require('./assets/html/home.html');
var compiled = require('./assets/partials/hello.hbs');
var content = require('./assets/scripts/content.es6');
function hello() 
{
  console.log('this');
  return compiled({name: "world"});
}
hello();
