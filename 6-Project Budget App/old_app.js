// Module pattern: It returns the object that contains all the functions that are going to be public.

var budgetController = (function(){//anonymous function or IIFE because it gets called immediately for this object
    
    //this variable is private
    var x = 23;
    
    //this method is private 
    var add = function(a){
        return x + a;
    }
    
    return {
        publicTest: function(b){ //closures: this function has access to the variables and methods from the upper function
            return add(b);
        }
    }
    
})();



var UIController = (function(){
    
    
    
})();


//Global app controller
var controller = (function (budgetCtrl, UICtrl){
    
    var c = budgetCtrl.publicTest(5);
    
    return {
        anotherPublic: function(){
            console.log(c);
        }
    }
    
})(budgetController, UIController);