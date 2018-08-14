// Lecture 7.0 ES6

/*
    Difference between foreach and map:
    -----------------------------------
    
    foreach() method affects and changes our original data in an array whereas map() returns an entirely new array without
    affecting the existing one. map() is not only faster than foreach() but also you can chain methods with map() such as filter(), 
    reduce(), etc. foreach() always return values that can mutate whereas map() returns a new array that is independent from the original that was provided at the beginning. 
    
*/

/* Lecture: var in ES5 vs let and const in ES6 
   ------------------------------------------------------------------------
*/


// ES5

var name5 = 'Jane Smith';
var age5  = '25';
name5 = 'John Edwards';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
//name6 = 'Jane Miller';
console.log(name6);

// ES5

function driversLicense(passedTest){
    if(passedTest){
        var firstName = 'John';
        var yearOfBirth = 1990;
        console.log(firstName + ' born in ' + yearOfBirth);
       }
}

driversLicenseES6(true);

//ES6

/* Lecture: Scope variables
   ---------------
*/

function driversLicenseES6(passedTest){
    
    let firstName;
    const yearOfBirth = 1990;
    
    if(passedTest){
        firstName = 'John';
       }
    
    console.log(firstName + ' born in ' + yearOfBirth);
}

driversLicenseES6(true);


//ES5

var x =23;

for (var x = 0; x<5; x++){
    console.log('Value of x:');
    console.log(x);
}

console.log(x);


//ES6

let i =23;

for (let i = 0; i<5; i++){
    console.log('Value of i:');
    console.log(i);
}

console.log(i);


// Lecture: Blocks and IIFEs in ES6

//ES5

(function(){ //Local variable
    var c = 3;
})();
console.log(c); //prints undefined because you cannot access to this variable because it is private

//ES6

{//local variables except for c because it was declared as var
    const a = 1;
    let   b = 2;
    var   c = 3; // can be accessed even if it is in a private block
}

console.log('Value of C:');
console.log(c);

// Lecture: Strings 

let firstName = 'John';
let lastName = 'Smith';
const  yearOfBirth = 1990;

function calcAge(year){
    return 2018 - year;
}

//ES5
console.log('This is '+ firstName + lastName + ' and he was born in ' + yearOfBirth +'. He is ' + calcAge(yearOfBirth) + 'years old.');

//ES6

console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he's ${calcAge(yearOfBirth)} years old.`); //template literal or back ticks

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('h'));
console.log(n.includes('oh'));
console.log(`${firstName}`.repeat('3'));

// Lecture: Arrow functions

const years = [1990, 1965, 1982, 1937];

//ES5

var ages5 = years.map(function(element){
    return 2018 - element;
});

console.log(ages5);

//ES6

console.log('ES6')
let ages6 = years.map(element => 2018 - element);

console.log(ages6);

console.log('I liked this expression of arrow functions')
ages6 = years.map((index, element) => `Age element ${index + 1}: ${2018 - element}.`);
console.log(ages6);

ages6 = years.map((index, element) => 
   {
     const now = new Date().getFullYear();
     const age = now - element;
     return `Age element ${index + 1}: ${age}.`;
   })

console.log("More stuff with arrow functions");
console.log(ages6);
                  

//ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function(){
        //var self = this;
        document.querySelector('.green').addEventListener('click', function(){
            /*
            var str = 'This is box number ' + self.position + ' and it is  ' + self.color;
            */
             var str = 'This is box number ' + this.position + ' and it is  ' + this.color; 
            alert(str);
        })
    }
}
           
//box5.clickMe(); // this throws undefined in position and color because this function" does not contain the properties described from above (closures do not apply here). Some say this is a bug and to fix this you have to create a new var containing the word this.

const box6Working = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
             var str = 'This is box number ' + this.position + ' and it is  ' + this.color; 
            alert(str);
        });
    }
}

box6Working.clickMe(); //this statement throws no undefined variables

/*
const box6StrangeBehaviour = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () =>{
             var str = 'This is box number ' + this.position + ' and it is  ' + this.color; 
            alert(str);
        });
    }
}

box6StrangeBehaviour.clickMe();  // this statement throws undefined. Why? clickMe: () => indicates that all methods and properties point to the global object Window which does not have defined position and color. 
*/

function Person(name){
    this.name = name;
}

Person.prototype.myFriends5 = function (friends){
    //var self = this; this is the basic trick to solve the problem of undefined but we can use bind and call
    
    /*
    bind: creates a copy of a function and you can insert any parameter in this copy, in this case we insert the this keyword 
    call: calls the function immediately
    */
    
    var arr = friends.map(function(element)
    {
       return this.name + ' is friend with ' + element; 
    }.bind(this));
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends); // this throws undefined for John


//ES6

Person.prototype.myFriends6 = function (friends){
    
    var arr = friends.map(element => `${this.name} is friend with ${element}`);
    console.log(arr);
}

new Person('Tom').myFriends5(friends); // this throws undefined for John

//Lecture: Destructuring
 
//ES5
var person = ['John', 26];
//var name = person[0];
//var age  = person[1];

//ES6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const  obj = {
    city: 'Casper',
    state: 'Wyoming'
};

const {city, state} = obj;
console.log(city);
console.log(state);

function calcAgeRetirement(year){
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
    
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);

//Lecture: Arrays

const boxes = document.querySelectorAll('.box');

//ES5
/* var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(current){
    current.style.backgroundColor = 'dodgerblue';
})*/

//ES6

const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(current => current.style.backgroundColor = 'dodgerblue');

// ES5

for(var k=0; k<boxes.length; k++){
    if (boxes[k].className === 'boxblue'){
        continue;
        }
    boxes[k].textContent = 'I changed to blue!';
}

// ES6

for (const current of boxesArr6){
    if (current.className.includes('blue')){
        continue;
    }
    current.textContent = 'I changed to this new blue color';
}

//ES5

var yearsOfNewEra = [2000, 2005, 2010, 2015, 2020];

var full = yearsOfNewEra.map(function(current){
    return current === 2015;
});

console.log(full);
console.log(full.indexOf(true));

//ES6
console.log(yearsOfNewEra.findIndex(current => current === 2015));
console.log(yearsOfNewEra.find(current => current === 2015));


//Lecture: Spread operator

function addFourAges (a, b, c, d){
    return a+b+c+d;
    
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
//sprad operator
const sum3 = addFourAges(...ages); 
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob'];

const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

//take all the html boxes and change them to purple
const h = document.querySelector('h1');
const htmlBoxes = document.querySelectorAll('.box');
const all = [h, ...htmlBoxes];

Array.from(all).forEach(current => current.style.color = 'purple');

// Rest parameters 

//opposite of spread operator because rest accepts the rest of operators in a function whereas spread expands all the elements

//ES5
function isFullAge5(){
    console.log(arguments);
    //convert the Object to an Array
    var argsArr = Array.prototype.slice.call(arguments)
    argsArr.forEach(function(current){
        console.log((2018-current) >= 18);
    })
;}

isFullAge5(1990, 1995, 2000);

//ES6

//convert the Object in an Array
function isFullAge6(...years){
    years.forEach(current => console.log((2018 - current) >=18));
}

isFullAge6(1990, 1995, 2010, 2015);

/***************/

/*Indicate that 18 */
function isFullAge5(limit){
    console.log(arguments);
    //convert the Object to an Array
    var argsArr = Array.prototype.slice.call(arguments, 1);
    argsArr.forEach(function(current){
        console.log((2018-current) >= limit);
    })
;}

isFullAge5(21, 1990, 1995, 2005);

//ES6

function isFullAge6(limit,...years){
    years.forEach(current => console.log((2018 - current) >=limit));
}

isFullAge6(21, 1995, 2010, 2015,2020);

// Default parameters
/*
function SmithPerson(firstName, yearOfBirth, lastName, nationality){
    
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    
    nationality === undefined ? nationality = 'american': nationality = nationality;
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;    
}*/

function SmithPerson(firstName, lastName='Smith', yearOfBirth, nationality = 'american'){
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality; 
}



var john = new SmithPerson('John');
var emily = new SmithPerson('Emily','Diaz', 1985, 'Spanish');

// Lecture: Maps
/*
Facts about Maps:

1. They are like dictionaries in Python.
2. They are iterable. 
3. It's easy to get the size of the Map.
4. It's easy to insert and remove data from Maps.
*/


const question = new Map();

question.set('question', 'What is your first name?');
question.set(1, 'Alejandro');
question.set(2, 'Rodrick');
question.set(3, 'Ferdinand');
question.set('correct', 1);
question.set(true,'Correct answer');
question.set(false,'Incorrect answer');

console.log(question.get('question'));
console.log(question.size);

if(question.has(2)){
    question.delete(2);
}

//question.clear(); erases everything in the map

question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));

for (let [key, value] of 
     question.entries()){
    //console.log(`This is ${key}, and it's set to ${value}`);
    if (typeof(key === 'number')){
        console.log(`Answer ${key}: ${value}`);   
    }
}
    
const ans = parseInt(prompt('Write the correct answer: '));

console.log(question.get(ans === question.get('correct')));


// Lecture: Classes
/* In ES5, classes are function constructors. 
   In ES6, class definitions are not hoisted and only methods can be added to classes but not properties.*/

//ES5

var Cat5 = function(name, breed){
    this.name  = name;
    this.breed = breed;
}

Cat5.prototype.calculateAge = function(){
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var katze = new Cat5('Moni', 2017);

class Cat6 {
    constructor (name, breed, yearOfCatBirth){
        this.name = name;
        this.breed = breed;
        this.yearOfCatBirth = yearOfCatBirth;
    }
    
    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfCatBirth;
    }
    
    static sayMeow(){ //static methods are directly attached to the class but not inherited to the instances. 
        console.log('Meow!');
    }
}


const moni = new Cat6('Moni', 'Callejero', 2017);

// Lecture: Classes and subclasses


//ES5

//super class
var PersonES5 = function(name, yearOfBirth){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
}

PersonES5.prototype.calculateAge = function(){
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}


var AthleteES5 = function(name, yearOfBirth, yearOfOlympicGame, medals) {
    PersonES5.call(this, name, yearOfBirth);
    this.yearOfOlympicGame = yearOfOlympicGame;
    this.medals = medals;
}


AthleteES5.prototype = Object.create(PersonES5.prototype);


//this method only belongs to the Athlete class
AthleteES5.prototype.wonMedal = function(){
        this.medals++;
        console.log(this.medals);
}

var peterAthlete5 = new AthleteES5('Peter', 1990, 2016, 10);

peterAthlete5.calculateAge();
peterAthlete5.wonMedal()

// ES6

class PersonES6 {
    constructor(name, yearOfBirth){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
    }
    
    calculateAge(){
        var age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }
}

class AthleteES6 extends PersonES6 {
    constructor(name, yearOfBirth, olympicGame, medals){
        super(name, yearOfBirth); //call the super class
        this.yearOfOlympicGame = olympicGame;
        this.medals = medals;
    }
    
    wonMedal(){
        this.medals++;
        console.log(this.medals);
    }
}

const peterAthleteES6 = new AthleteES6('Peter', 1990, 2016, 3);
