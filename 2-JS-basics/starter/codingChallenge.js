// Coding challenge

/*
User 1 and User 2 are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2.

1. Ask to user 1 and user 2 about their mass and height. Store the mass and height in variables.
2. Calculate both their BMIs.
3. Create a boolean variable containing information about whether user 1 has a higher BMI than user 2. 
4. Print a string to the console containing the variable from step 3.
*/

var firstUserName = prompt("What's your name?");
var firstUserLastname = prompt("What's your last name?");
var firstUserMass = prompt("What's your weight in kg?");
var firstUserHeight = prompt("What's your height in meters?");
var firstUserBMI = firstUserMass / (firstUserHeight * 2);

var secondUserName = prompt("What's your name?");
var secondUserLastname = prompt("What's your last name?");
var secondUserMass = prompt("What's your weight in kg?");
var secondUserHeight = prompt("What's your height in meters?");
var secondUserBMI = secondUserMass / (secondUserHeight * 2);


if (firstUserBMI > secondUserBMI){
    console.log(firstUserName + firstUserLastname + 'has a greater BMI than User 2: ' + firstUserBMI);
    
}else{
    console.log(secondUserName + secondUserLastname + 'has a greater BMI than User 1: ' + secondUserBMI);
}
