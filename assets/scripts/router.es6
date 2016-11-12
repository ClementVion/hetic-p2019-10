var container = document.querySelector('.container');

function callLoad(){
     getTemplate("page-project", "tropical");
 }

document.querySelector(".link").addEventListener("click", function(){
    callLoad();
});
//
// var routes = {
//     '/projects/:id': function(req) {
//         getTemplate('page-project', req.params.id);
//     },
//     '/': function(req) {
//         getTemplate('page-home');
//         var home = require('../../assets/scripts/page-home.es6');
//     },
//     '/*': function(req, e) {
//         if (!e.parent()) {
//             getTemplate('404');
//         }
//     }
// }
//
// Grapnel.listen({
//     pushState: true
// }, routes);

function getTemplate(name, id) {
    console.log("GET THAT FUCKING TEMPLATE");
    var template = require('../../assets/html/' + name + '.html');
    var container = document.querySelector('.container');
    var xhr = new XMLHttpRequest();
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
    
    document.querySelector(".link").addEventListener("click", function(){
        callLoad();
    });
};
 