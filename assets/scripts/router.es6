let container = document.querySelector('.container');

/* Système temporaire permettant de travailler les transitions entre les pages en écoutant
   un click sur une div et en chargeant le template de la page suivante dans le container,
*/

document.querySelector(".link").addEventListener("click", function(){
    callLoad();
});

function callLoad(){
     getTemplate("page-project", "tropical");
 }

 function getTemplate(name, id) {
     let template = require('../../assets/html/' + name + '.html');
     let container = document.querySelector('.container');
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

     document.querySelector(".link").addEventListener("click", function(){
         callLoad();
     });
 };

/* Système de route fonctionnel (renvoie le bon template et les bons paramètres etc)
mais qui ne permet pas d'append un template à la suite d'un autre au sein du même container
(la page se recharge, et le template est chargé dans le container vide de l'index.html)
 */
 
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


// function getHeader(page) {
//     console.log(page);
//     var template = require('../../assets/html/partials/header.html');
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', '../../assets/html/partials/header.html', false);
//     xhr.onreadystatechange = function() {
//         if (page != 'page-home') {
//             console.log(page);
//             var param = {project: page};
//             var compile = template(param);
//         } else {
//             var compile = template();
//         }

//         container.innerHTML = compile;
//     };
//     xhr.send();
// };
