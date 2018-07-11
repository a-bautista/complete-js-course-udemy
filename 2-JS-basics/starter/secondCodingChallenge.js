// Coding challenge

/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.

1. Calculate the average score for each team.
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output. 
3. Change the scores to show different winners. Do not forget to take into account there migt be a draw. 
4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. 
*/

var johnsGames = [110, 129, 120];
var mikesGames = [116, 94, 123];
var johnsaverage = 0;
var mikesaverage = 0;

for (i=0; i<johnsGames.length; i++) { 
    johnsaverage = johnsaverage + johnsGames[i] 
}

for (j=0; j<mikesGames.length; j++) { 
    mikesaverage = mikesaverage + mikesGames[j] 
}

if (johnsaverage > mikesaverage) {
    console.log("John wins in average against Mike because John's average " + johnsaverage/johnsGames.length + " is higher than Mike's average: "+ mikesaverage/mikesGames.length);
}else if(johnsaverage < mikesaverage){
    console.log("Mike wins in average against John because Mike's average " + mikesaverage/mikesGames.length + " is higher than John's average: "+ johnsaverage/johnsGames.length);
}else{
    console.log("Mike and John had draws Mike's average is " + mikesaverage/mikesGames.length + " and John's average is : "+ johnsaverage/johnsGames.length);
}
