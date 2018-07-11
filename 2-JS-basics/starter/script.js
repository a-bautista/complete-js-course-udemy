var firstName = 'John'; //camel case notation
var lastName = "Smith";
var age = 28;
var fullAge = true;
var job; //undefined

console.log(firstName);
console.log(fullAge)


/*************************************
* Data types in JS
There are 5 data types:
1. Number: floating point numbers.
2. String: sequence of characters
3. Boolean: logical data types
4. Undefined: data type that does not have a value yet
5. Null: non-existent 

JS has dynamic typing and data types are automatically assigned to variables.
*/

/************************************
* Variable mutation and type coercion
*/

var firstName = "Tony";
var age = 28;
var job, isMarried;
job = "policeman";
isMarried = false;
console.log(firstName + ' '+age); //type coercion
console.log(firstName + ' is a '+ age + ' year old ' + job + '\nMarried? '+isMarried); //type coercion

//variable mutation = JS changes the type of variables on the fly
age = 'twenty eight';

//var firstName= prompt("What's your first name");
//var lastName= prompt("What's your last name");
//console.log(firstName + ' '+lastName)

/************************************
* Basic operators
*/

var year = 2020;
var ageJohn = 28;
var ageMark = 33;
var fullAge = 15;
var x;

// Math operators
var yearJohn = year - ageJohn;
var yearMark = year - ageMark;
console.log(yearJohn);


// Logical operators
var johnOlder = ageJohn < ageMark;
console.log(johnOlder);

//typeof operator
console.log(typeof(johnOlder));
console.log(typeof(x));

/************************************
* Operator precedence
*/

// Multiple operators
var isFullAge = year - yearJohn >= fullAge;
console.log(isFullAge);


// Grouping
var average = (ageJohn + ageMark)/2;
console.log(average);

// Multiple assignments
var x, y;
x = y = (3+5)*4-6;
console.log(x)

// More operators
x *=2; //x = x * 2;
console.log(x)

x++
console.log(x);

/************************************
* if - else statements
* && - and
* || - or
* ! - not

*/

var firstName = 'John';
var civilStatus = 'single';
var age = 16;

if (civilStatus === 'married')
    {
        console.log(firstName + ' is married.')
    }else{
        console.log(firstName + ' is single.')
    }

if (age < 13){
    console.log(firstName + ' is a boy.');
}else if (age >=13 && age <20){
    console.log(firstName + ' is a teenager');
}else if (age >= 20 && age <30 ){
    console.log(firstName + ' is a young man');
}else{
    console.log(firstName + ' is a man');
}

switch(true){
    case age < 13:
        console.log(firstName + ' is a boy.');
        break;
    case age >= 13 && age < 20:
        console.log(firstName + ' is a teenager');
        break;
    case age >= 20 && age <30:
        console.log(firstName + ' is a young man');
        break;
    default:
        console.log(firstName + ' is a man');
}
    

/*****************************************
* ternary operators and switch statements 
* ternary - an alternative to write an if-else statement
*/
var firstName = 'Alex';
var age = 22;


age >= 18? console.log(firstName + ' drinks beer.'):console.log(firstName + 'drinks juice.')

var drink = age >= 18 ? 'beer' : 'juice';
console.log(drink);


//switch statement

var job = 'teacher';

switch(job){
    case 'teacher':
        console.log(firstName + ' teaches kids how to code because he is a ' + job);
        break;
    case 'driver':
        console.log(firstName + ' drives an uber in Lisbon because he is a ' + job);
        break;
    case 'designer':
        console.log(firstName + ' designs beautiful websites because he is a ' + job);
        break;
    default:
        console.log(firstName + ' does something because he is a ' + job);
       }

/*****************************************
* Truthy and Falsy values and equality operators
*/

// falsy values: undefined, null, 0 (ZERO), '', NaN
// truthy values: NOT falsy values

var height=0;

if (height || height === 0){ // avoid type coercion
    console.log('Variable is defined')
    
}else{
    console.log('Variable has not been defined.')
    
}

height = 23
// equality operators
if (height == '23'){ // the height 23 gets converted to string
    console.log("The == operator does type coercion!!! ");
}


/*****************************************
* Functions
*/

function calculateAge(birthYear){
    return year - birthYear;
}

var ageJohn = calculateAge(1990);
console.log(ageJohn);


//function declaration
function yearsUntilRetirement(birthYear, retirementAge, firstName){
    var age = calculateAge(birthYear);
    var yearsBeforeRetirement = retirementAge - age;
    if (yearsBeforeRetirement <= 0){
        console.log(firstName + ' already retired. ')
    }else{
        console.log(firstName + ' retires in ' + yearsBeforeRetirement + ' years. ')
    }
}

yearsUntilRetirement(1955, 65, 'Alejandro');

/*****************************************
* Function Statements
*/


//function expression
var whatDoYouDo = function(job, firstName){
    switch(job){
    case 'teacher':
        return firstName + ' teaches kids how to code because he is a ' + job; // the return finishes the function
    case 'driver':
        return firstName + ' drives an uber in Lisbon because he is a ' + job;
    case 'designer':
        return firstName + ' designs beautiful websites because he is a ' + job;
    default:
        return firstName + ' does something because he is a ' + job;
       }    
}

console.log(whatDoYouDo('teacher', 'Steven'));
console.log(typeof(whatDoYouDo))

/*****************************************
* Arrays
*/

var names = ['John', 'Mark', 'Jane'];
var years = new Array(1990, 1969, 1948);

//mutate array
names[1] = 'Ben';
names[names.length] = 'Mary';
console.log(names);

names.push('James');
names.unshift('Henry');
console.log(names)

names.pop();
names.shift();
console.log(names);

console.log(names.indexOf('John')); //locate if an element is an array
//-1 indicates that the element was not found

