///////////////////////////////////////
// Execution context -> Everything inside a function is an execution context. 
// Global execution context -> Code that isn't related to a function is related to the Global Execution context. All the variables not inside in an execution context are related to a Windows object,i.e., lastName === Window.lastName


// Lecture: Hoisting
// Variables are available before the code execution starts. 
// Hoisting only works for function declarations.


//function declaration
function calculateAge(year){
    console.log(2018-year);
}

calculateAge(1990);


//function expressions
// retirement(1990); //this isn't gonna work because you need to declare the variable that will hold the result
var retirement = function(year){
    console.log(65-(2018-year));
}
retirement(1990);


//variables
console.log(age); //this works, variables are already available because when the code is scanned in the creation phase, the variables are assigned to an undefined value before they are created.
var age = 23; //if we remove this variable then we will get an error if we leave the console.log(age) because the variable age wasn't defined even though it is available.  
console.log(age);


function foo(){
    var age = 65;
    console.log(age); //prints 65
}
foo();
console.log(age); // prints 23



///////////////////////////////////////
// Lecture: Scoping


// First scoping example


var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c); //lexical scope, child functions have access to their parents' variables but parent functions do not have access to their child's variables
    }
}




// Example to show the differece between execution stack and scope chain


var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + d);
}




///////////////////////////////////////
// Lecture: The this keyword

//console.log(this);

calculateAge(1990);
function claculateAge(year){
    console.log(2018-year);
    console.log(this);
}


var john = {
    name: 'John',
    yearOfBirth: '1990',
    calculateAge: function(){
        console.log(this);
        console.log(2018-this.yearOfBirth);
        /*
        function innerFunction(){
            console.log(this); // functions call the Window object. Why? Because all the functions declared at first call directly to the Window object. 
        }
        innerFunction();*/
    }
}
    
john.calculateAge();


var mike = {
    name: 'Mike',
    yearOfBirth: '1970'
};   
    
//method borrowing
mike.calculateAge = john.calculateAge;
mike.calculateAge();