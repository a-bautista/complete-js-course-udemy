// Coding challenge

/*
Remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods. 

1. For each of them, create an object with properties for their full name, mass, and height. 
2. Add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Do not forget they might have the same BMI. 

*/


numberOfPeople = prompt('How many people will participate in the challenge?');
arrayNumberOfPeople = new Array(numberOfPeople);

for (var i=0; i<numberOfPeople; i++){
    arrayNumberOfPeople[i] = new Person(prompt('Insert the name'), prompt('Insert the last name'), parseFloat(prompt('Insert the weight')), parseFloat(prompt('Insert the height')));
}


function Person(firstName, lastName, mass, height){
    this.firstName = firstName;
    this.lastName = lastName;
    this.mass     = mass;
    this.height   = height;
    this.BMI      = Math.round(mass / (height * height));      
};


//Determine BMIs for 2 people
if (arrayNumberOfPeople[0].BMI > arrayNumberOfPeople[1].BMI){
    console.log(arrayNumberOfPeople[0].firstName + ' ' + arrayNumberOfPeople[0].lastName + ' has a BMI of ' + arrayNumberOfPeople[0].BMI + ' which is greater than ' + arrayNumberOfPeople[1].firstName + ' ' + arrayNumberOfPeople[1].lastName + " 's BMI which is " + arrayNumberOfPeople[1].BMI);
}else if(arrayNumberOfPeople[0].BMI > arrayNumberOfPeople[1].BMI){
    console.log(arrayNumberOfPeople[0].firstName + ' ' + arrayNumberOfPeople[0].lastName + ' has a BMI of ' + arrayNumberOfPeople[0].BMI + ' which is lower than ' + arrayNumberOfPeople[1].firstName + ' ' + arrayNumberOfPeople[1].lastName + " 's BMI which is " + arrayNumberOfPeople[1].BMI);
}else{
    console.log(arrayNumberOfPeople[0].firstName + ' ' + arrayNumberOfPeople[0].lastName + ' has a BMI of ' + arrayNumberOfPeople[0].BMI + ' which is equal to ' + arrayNumberOfPeople[1].firstName + ' ' + arrayNumberOfPeople[1].lastName + " 's BMI which is " + arrayNumberOfPeople[1].BMI);
}