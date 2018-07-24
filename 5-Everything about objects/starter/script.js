// Object
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

// Blue print of an object as a function constructor
var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    /* this.calculateAge = function(){
        console.log(2018-this.yearOfBirth);
    } */
}


//Inheritance = Person didn't find calculateAge method, so it went up one level to find it 
Person.prototype.calculateAge = 
    function(){
    console.log(2018-this.yearOfBirth);
};
//Again, Person inherits the lastName Smith.
Person.prototype.lastName = 'Smith';

// Instantiation 
/* When using new, a new object Person is created and then the function constructor Person is called and the 'this' word points to the new created variables of the object instead of pointing to the Global object. */


var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1980, 'designer');
var mark = new Person('Mark', 1970, 'retired');


john.calculateAge();
jane.calculateAge();
mark.calculateAge();


console.log(john.lastName);
console.log(jane.lastName);

// Object.create - Create an object directly from a Prototype. With this approach we basically define which object will inherit certain methods or properties 

// Create the object that will work as a Prototype (note that we are not using upper case letters).

var animal = {
    calculateAge: function(){
        console.log(2018-this.yearOfBirth);
    }
}

var dasha = Object.create(animal);
dasha.breed = 'Cocker';
dasha.yearOfBirth = '2013';


var buffy = Object.create(animal, 
{
    breed: {value: 'Cocker Spaniel'},
    yearOfBirth: {value: 2005}
});

// Primitives vs Objects
/* Objects contain a reference in memory to the object,  */


// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);


// Objects
var obj1 = {name:'Alex',
            age: 28};

var obj2 = obj1;
obj1.age = 29;

console.log(obj1.age); //result is 29
console.log(obj2.age); //result is 29

/* Basically, obj1 was created and points to a specific slot of memory. obj2 was copied from obj1 and points to the same slot of memory as obj1. The age of obj1 was "changed" but in fact the memory address was changed to a new memory slot reference, so the age of obj2 is changed too because both point to the same slot of memory. 

                      --------
    obj2--> obj1 --> |#FF3390 |
                      --------                  

*/

// First class functions

var years = [1990, 1995, 2000, 2005, 2010];

function arrayCalc(arr, fn){
    var arrRes = [];
    for (var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}


function calculateAge(element){
    return 2018 - element;
}

function isFullAge(element){
    return element >=18;
}

function isFullAgeBind(limit, element){
    return element >= limit;
}

var resultAges = arrayCalc(years, calculateAge);
console.log(resultAges);

var fullAges = arrayCalc(resultAges, isFullAge);
console.log(fullAges);

var ages      = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAgeBind.bind(this, 20));
console.log(ages);
console.log(fullJapan);


// Functions returning functions

function interviewQuestion(job){
    if (job === 'designer'){
            return function(name){ //anonymous function
                console.log(name + ', can you explain what is UX?');
            }   
        }else if (job === 'teacher'){
            return function(name){ //anonymous function
                console.log('What subject do you teach, ' +name+' ?');
            }          
        }else{
            return function (name){
                console.log('Hey, ' +name+ ' what do you do?');
            }
        } // end if-else statement
}//end function

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');
interviewQuestion('teacher')('Peter');

teacherQuestion('John');
designerQuestion('Alice');

// Immediately Invoked Function Expressions (IIFE)

function game(){
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();


//what's inside a parenthesis cannot be a statement
(function () { 
    var score = Math.random() * 10;
    console.log(score >= 5);
})(); //the last parentheses make the function to be invoked

// this is hidden from the outside scope - data privacy
(function (luck) { 
    var score = Math.random() * 10;
    console.log(score >= 5 - luck);
})(5);


// Closures

function retirement(retAge){
    var a = ' year left until retirement';
    return function(yearOfBirth){
        var age = 2018 - yearOfBirth;
        console.log((retAge - age) + a); //how does this anonymous function use the a and retAge variable??? Closure! An inner function has always access to the variables and parameters of its outer function, even after the outer function has returned and this occurs because the outer most function still remains in memory, so its variables are available. 
    }
}

var retirementUS = retirement(66);
retirementUS(1990);
retirement(66)(1991);

var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementGermany(1990);
retirementIceland(1990);

//Function returning functions converted to Closures
function interviewQuestions(job){
    return function(name){
        if (job === 'designer'){
            console.log(name + ', can you explain what is UX?');
        }else if (job === 'teacher'){
            console.log(name + ', what do you teach?');
        }else{
            console.log(name + ', what do you do?');
        }
    }
}

var interviewQuestion = interviewQuestions('teacher');
interviewQuestion('John');

//Call, Bind and Apply methods

var rosemary = {
    name:'Rosemary',
    age: 28,
    job: 'HR recruiter',
    presentation: function(style, timeOfDay){
        if (style === 'formal'){
            console.log('Good ' + timeOfDay + '! Madame et mesieurs, My name is ' + this.name +' and I am ' + this.age + 'years old. I work as a ' + this.job +'.');
        }else if (style === 'friendly'){
            console.log('Yooo! ' + 'My name is ' + this.name +' and I am ' + this.age + ' years old. I work as a ' + this.job +'. Have a nice ' + timeOfDay + ' !');
        }
    }
};

var yanqing = {
    name:'Yanqing',
    age: 26,
    job: 'Professor',
};

rosemary.presentation('formal', 'night');

// Method borrowing
rosemary.presentation.call(yanqing, 'friendly', 'day'); 

// Apply 
//rosemary.presentation.apply(yanqing, ['friendly', 'afternoon'])

// Bind - similar to the call method except that it stores a copy of the function, so you can use it later. We use this with preset values. 

var rosemaryFriendly = rosemary.presentation.bind(rosemary, 'friendly');

// Carrying - we create a function 
rosemaryFriendly('afternoon');
rosemaryFriendly('morning');