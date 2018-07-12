// Coding challenge

/*
John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268. To tip the waiter a fair amount, JOhn created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200 and 10% if the bill is more than $200. 

In the end, John would like to have 2 arrays:

1. Containing all 3 tips (one for each bill)
2. Containing all 3 final paid amounts (bill * tip)

*/

var tips = new Array();
var paid_amounts = new Array();

var billsToPay = parseInt(prompt("How many bills do you want to pay?"));
for (var i=0; i< billsToPay; i++){
    paid_amounts[i] = parseInt(prompt("Insert the amount for bill no. " + parseInt(i+1)));
    //calculate the tip to pay based on the paid amount
    tips[i] = tipCalculator(paid_amounts[i]);
    // calculate the total amount of money you need to pay
    paid_amounts[i] = tips[i] + paid_amounts[i];
    console.log(i);
}

console.log(tips);
console.log(paid_amounts);

function tipCalculator(paidAmount){
    var percentage;
    if (paidAmount >= 5 && paidAmount < 50){
        percentage = 0.2;
    }else if (paidAmount >= 50 && paidAmount < 200){
        percentage = 0.15;
    }else if (paidAmount >= 200) {
        percentage = 0.10;
    }else{//avoid zero values negative numbers
        percentage = 0;
    }
    return Math.round(percentage * paidAmount);
}//end of function