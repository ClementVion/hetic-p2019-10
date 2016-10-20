var exports = module.exports = {}

exports.checkName= (firstName, lastName) => {
 if(firstName !== 'nader' || lastName !== 'dabit') {
   console.log('You are not Nader Dabit')
 } else {
    console.log('You are Nader Dabit')
    document.write('lol')
   	document.write('<a href="assets/html/page1.html">a</a>')
  }
}
