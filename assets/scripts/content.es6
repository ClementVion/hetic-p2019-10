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


class Person {
    constructor(name = 'John', age = 0, gender = '?') {
        this.name = name
        this.age = age
        this.gender = gender
    }

    greet() {
        alert('Hello ' + this.name + '!')
    }
}

var John = new Person('John', 21, 'M')
console.log(John.greet()) // Hello John!
