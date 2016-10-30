// Define the app main container
var container = document.getElementById('container');
// Define the router and the routes
var router = new Grapnel({ pushState : true });

console.log(router);

router.get('/home', function(){
  getTemplate('hello');
});

function getTemplate(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'assets/partials/' + name + '.hbs', true);
  xhr.onreadystatechange= function() {
    container.innerHTML = this.responseText;
  };
  xhr.send();
}
