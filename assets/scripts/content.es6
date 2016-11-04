(function (){
    console.log("hello content.es6");
    let compiled = require('../partials/page-project.hbs')
    let content = require('../content/name.json')
    document.body.innerHTML = compiled(content);
})();
