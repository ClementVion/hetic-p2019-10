(function(){

let compiled = require('../partials/hello.hbs')
let content = require('../content/name.json')
let o = compiled(content)


if (document.querySelector('.coucou')) {
  document.querySelector('body').innerHTML += o;
} else {
  console.log('oooo')
}
})();
