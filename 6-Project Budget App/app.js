// Module pattern: It returns the object that contains all the functions that are going to be public.

var budgetController = (function(){//anonymous function or IIFE because it gets called immediately for this object
    
    //function constructor
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    //function constructor
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Object
    var data = {
        allItems:{
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        }
    };
    
    return {
        addItem: function(type, description, value){ //the function addItem will be used for other modules to get access to the encapsulated objects
            var newItem, ID;
            
            //create a new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;     
            }else{
                ID = 0;
            }
            
            
            //Create a new item
            if (type === 'expense'){
                newItem = new Expense(ID, description, value);    
            }else if (type === 'income'){
                newItem = new Income(ID, description, value);    
            }
    
            data.allItems[type].push(newItem); //insert the newly created expense or income in the data object structure
            
            return newItem; //return the new element
            
        }
    };
    
})();


var UIController = (function(){
    
    // Define the attributes of the object from the html
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    }
   
    // 
    return {
        getinput: function(){ //closure
            // Data of the new object is encapsulated and only available through this function
            return {
                //values should be inc or exp
                type: 
                document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: 
                document.querySelector(DOMstrings.inputValue).value    
            };           
        },
        
        addListItem: function(obj, type){
            
            // Create HTML string with placeholder text
            if (type === 'income'){
                    html = '<div class="item clearfix" id="income-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div><div class="item clearfix" id="income-1"><div class="item__description">Sold car</div><div class="right clearfix"><div class="item__value">+ 1,500.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'    
                }else if(type === 'expense'){
                    html = '<div class="item clearfix" id="expense-0"><div class="item__description">Apartment rent</div><div class="right clearfix"><div class="item__value">- 900.00</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div><div class="item clearfix" id="expense-1"><div class="item__description">Grocery shopping</div><div class="right clearfix"><div class="item__value">- 435.28</div><div class="item__percentage">10%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'        
                }
            
            
            
            
            // Replace the placeholder with some actual data
            
            
            // Insert the HTML
            
        },
       
       // Data of the new object is encapsulated and only available through this function
       getDOMstrings: function(){
           return DOMstrings;
        }
   }; 
    
})();


//Global app controller
var controller = (function (budgetCtrl, UICtrl){
    
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event){ 
            if (event === 13 || event.which === 13){
                console.log('ENTER was pressed.');    
                ctrlAddItem();
            }
        });
    };
    
    
    var ctrlAddItem = function()
    {
        var input , newItem;
        
        //1. Get the field input data
        input = UICtrl.getinput();
        //console.log(input);

        //2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        //3. Add the item to the UI

        //4. Calculate the budget

        //5. Display the budget on the UI

        console.log('works!');
    };
    
    return {
        init: function(){
            console.log('Application has started!');
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();