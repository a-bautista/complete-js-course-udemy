// Coding challenge

/*
Let's create a more advanced version using everything we learned! 

John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42. John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200 and 10% when the bill is more than $200. 

Implement a tip calculator using objects and loops:

1. Create an object with an array for the bill values.
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations.
4. As an output, create:
   a) A new array containing all tips
   b) An array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.
   
Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $ 375, $110 and $45. Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bills is between $100 and $300, and 25% if the bill is more than $300.

5. Implement the same functionality as before, this time using Mark's tipping rules.
6. Create a function to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sume of the array, divide it by the number of elements in it.
7. Calculate the average tip for each family.
8. Log to the console which family paid the highest tips on average.

*/

var tips_user_one = {
    //Properties
    billsToPay:  prompt("How many bills do you want to submit?"),
    paidAmounts: new Array(),
    tips: new Array(),
    
    //methods
    tipCalculation: function(){
        var percentage = 0;
        //var tips = new Array()
        for (var i=0; i< this.billsToPay; i++){
            this.paidAmounts[i] = parseInt(prompt("Insert the amount for bill no. " + parseInt(i+1)));
            //calculate the tip to pay based on the paid amount
            if (this.paidAmounts[i] >= 5 && this.paidAmounts[i] < 50){
                    percentage = 0.2;
            }else if (this.paidAmounts[i] >= 50 && this.paidAmounts[i] < 200){
                    percentage = 0.15;
            }else if (this.paidAmounts[i] >= 200) {
                    percentage = 0.10;
            }else{//avoid zero values negative numbers
                    percentage = 0;
            }
            this.tips[i] = Math.round(percentage * this.paidAmounts[i]);
            this.paidAmounts[i] = parseFloat(this.paidAmounts[i]) + parseFloat(this.tips[i]);
        }
    }
}


var tips_user_two = {
    //Properties
    billsToPay:  prompt("How many bills do you want to submit?"),
    paidAmounts: new Array(),
    tips: new Array(),
    
    //methods
    tipCalculation: function(){
        var percentage = 0;
        //var tips = new Array()
        for (var i=0; i< this.billsToPay; i++){
            this.paidAmounts[i] = parseInt(prompt("Insert the amount for bill no. " + parseInt(i+1)));
            //calculate the tip to pay based on the paid amount
            if (this.paidAmounts[i] >= 5 && this.paidAmounts[i] < 100){
                    percentage = 0.2;
            }else if (this.paidAmounts[i] >= 100 && this.paidAmounts[i] < 300){
                    percentage = 0.10;
            }else if (this.paidAmounts[i] >= 300) {
                    percentage = 0.25;
            }else{//avoid zero values negative numbers
                    percentage = 0;
            }
            this.tips[i] = Math.round(percentage * this.paidAmounts[i]);
            this.paidAmounts[i] = parseFloat(this.paidAmounts[i]) + parseFloat(this.tips[i]);
        }
    }
}

function averageTip(tips){
    sumOfElements = 0;
    for (var i = 0; i<tips.length; i++){
        sumOfElements = sumOfElements + tips[i];
        }
    sumOfElements = sumOfElements/tips.length
    return sumOfElements;
}
    

alert('User 1');
console.log(tips_user_one);
tips_user_one.tipCalculation();
console.log(tips_user_one.tips)
console.log(tips_user_one.paidAmounts)


alert('User 2');
console.log(tips_user_two);
tips_user_two.tipCalculation();
console.log(tips_user_two.tips)
console.log(tips_user_two.paidAmounts)

var tipUserOne = averageTip(tips_user_one.tips);
var tipUserTwo = averageTip(tips_user_two.tips);


console.log(tipUserOne);
console.log(tipUserTwo);

if (tipUserOne > tipUserTwo){
    console.log("User one paid " + tipUserOne + " and user two paid " + tipUserTwo +" . User one paid higher than user two.");
}else if(tipUserTwo){
    console.log("User one paid " + tipUserOne + " and user two paid " + tipUserTwo +" . User two paid higher than user one.")     
}else{
    console.log("User one paid " + tipUserOne + " and user two paid " + tipUserTwo +" . Both users paid the same.")
}

/*
var tips = new Array();
tips.push(tips_user_one.tips);
tips.push(tips_user_two.tips);
console.log(tips)
averageTip(tips);
*/

