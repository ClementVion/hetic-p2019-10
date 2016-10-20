var exports = module.exports = {}

exports.checkName= (firstName, lastName) => {
 if(firstName !== 'nader' || lastName !== 'dabit') {
   console.log('You are not Nader Dabit')
   document.write('lol')
 } else {
    console.log('You are Nader Dabit')
    document.write('lol')
  }
}
