// 

// Budget Controller
var budgetController = (function (){
   
    //Function constructors start with upper case
    var Expense = function(id, description, value){
        this.id = id,
        this.description = description,
        this.value = value    
        this.percentage = -1;
    };
    
    Expense.prototype.calculatePercentages = function(totalIncome){
        if (totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);    
        }else{
            this.percentage = -1;
        }
    };
    
    Expense.prototype.getPercentage = function(){
      return this.percentage;  
    };
    
    //Function constructors start with upper case
    var Income = function(id, description, value){
        this.id = id,
        this.description = description,
        this.value = value    
    };
    
    var calculateTotal = function(type){
        var sum = 0;

        data.allItems[type].forEach(function(current){
            sum += current.value;
        });
        data.totals[type] = sum;
    };
    
    //
    var data = {
        allItems:{
            expense: [],
            income: []
        },
        totals:{
            expense:0,
            income:0
        },
        budget:0,
        percentage:-1
    };
    
    
    return {
        addItem: function(type, description, value){
            var newItem;
            
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length -1].id + 1; // get the current id of the expense or income   
            }else{
                ID = 0; // if a new item is created, you set this to 0 
            }
            
            // Create a new item based on income or expense
            if (type === 'expense'){
                newItem =  new Expense(ID, description, value);    
            }else if(type === 'income'){
                newItem =  new Income(ID, description, value);    
            }
            
            data.allItems[type].push(newItem);
            
            return newItem;
        },
        
        deleteItem: function(type, id){
            
            //id = 6
            //data.allItems[type][id];
            //ids =[1 2 4 6 8]
            //index = 3
            
            var ids, index;
            console.log(data.allItems);
            
            // for each item, a new index is given
            ids= data.allItems[type].map(function(current){
                return current.id;    
            });
            
            index = ids.indexOf(id);
            
            if (index !== -1){
                //splice removes elements
                data.allItems[type].splice(index, 1);
            }
        },
        
        calculateBudget: function(){
            
            //calculate total income and expenses
            calculateTotal('expense');
            calculateTotal('income');
            
            //calculate the budget: income - expenses
            data.budget = data.totals.income - data.totals.expense;
            
            if (data.totals.income > 0){
                //calculate the % of income that we spent
                data.percentage = Math.round((data.totals.expense/data.totals.income) * 100);
                console.log(data.percentage);
            }else{
                data.percentage = -1;
            }
            
        },
        
        calculatePercentages: function(){
            data.allItems.expense.forEach(function(current){
               current.calculatePercentages(data.totals.income); 
            });
        },
        
        getPercentages: function(){
            //map is used 
            var allPercentages = data.allItems.expense.map(function(current){
                return current.getPercentage();
            });
            return allPercentages;
        },
        
        getBudget: function(){
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totalExpense: data.totals.expense,
                percentage:data.percentage
            }
        },
        
        testing: function(){
            console.log(data);
        },
    };
    
})();


// UI Controller - It receives the values from the UI 
var UIController = (function(){
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription:'.add__description',
        inputValue: '.add__value',  
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
        buttonLabel: 'ion-ios-checkmark-outline'
    };
    
    var formatNumber = function(number, type){
          var numSplit, int, dec;
          /*
            + or - before number 
            exactly 2 decimal points
            comma separating the thousands
            
            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
          */
          
          number = Math.abs(number);
          number = number.toFixed(2); 
          
          numSplit = number.split('.');
          int = numSplit[0];
          
          if(int.length > 3){
              int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3, 3) //starting position - ending position
             }
          
          dec = numSplit[1];
          
          return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec
          
      };
        
      var nodeListForEach = function(list, callback){
          //console.log(list);
          for (var i = 0; i<list.length; i++){
               callback(list[i], i);
            }    
         };
    
     return {
      getInput: function(){
          // return an object
          return{
              type : document.querySelector(DOMstrings.inputType).value, // receive a + or - (income or expense)
              description : document.querySelector(DOMstrings.inputDescription).value,
              value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
      },
        
        
      displayBudget: function(obj){
          var type;
          obj.budget > 0 ? type = 'income' : type = 'expense';
          document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'income');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExpense, 'expense');
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage; 
          
            if (obj.percentage>0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%'; 
            }else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '-----'; 
            }
      },
        
     displayPercentages: function(percentages){
           
         console.log(percentages);
         // study this again
         var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);
         //console.log(fields);
         
         nodeListForEach(fields, function(current, index){
             //console.log(fields);
             //console.log(fields[index]);
             if(percentages[index]>0){
                current.textContent = percentages[index] + ' % ';   
             }else{
                current.textContent = '---';
             }
             
         });
         
      },
        
      displayMonth: function(){
          var year, month, months
          var now = new Date();
          months = ['January','February','March','April','May','June','July','August','September','October','November','December']
          month = now.getMonth();
          year = now.getFullYear();
          document.querySelector(DOMstrings.dateLabel).textContent = year + ' ' + months[month];
      },    
          
      getDOMstrings: function(){
          return DOMstrings;
      },
         
      changedType: function(){
          //You must use the document.querySelectoAll to select all the html elements that are in the selectors array
          
          var selectors = [DOMstrings.inputType, DOMstrings.inputDescription, DOMstrings.inputValue, DOMstrings.inputBtn, DOMstrings.buttonLabel];
          
          var fields = document.querySelectorAll(selectors);
          
          
          nodeListForEach(fields, function(current){
            //console.log(current);
             current.classList.toggle('red-focus'); 
          });
      },
        
      addListItem: function(obj, type){ //display the current items (expense or income) in the UI
        
        var html, newHtml, element;
        // Create HTML string with placeholder text when the app starts
        if (type === 'income'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'    
        }else if(type === 'expense'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'        
        }
            
        // Replace the placeholder text with some actual data
        
        // Income or Expense 
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description); //overwrite the newHtml
        newHtml = newHtml.replace('%value%', formatNumber(obj.value, type)); //overwrite the newHtml
          
        // Insert the HTML in the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
          
      },
        
      deleteListeItem: function(selectorID){
         //console.log(selectorID);
         var element =  document.getElementById(selectorID);
          element.parentNode.removeChild(element);
      },
        
      clearFields: function(){
         var fields, fieldsArray;
         fields = document.querySelectorAll(DOMstrings.inputDescription + ', '+ DOMstrings.inputValue);
         fieldsArray = Array.prototype.slice.call(fields);
         fieldsArray.forEach(function(current, index, array){
                current.value = ""; //clear all the fields
         }); 
         fieldsArray[0].focus();
         
      },
        
    };
    
})();


// Global App Controller
var controller =(function(budgetCtrl, UICtrl){
    
    var setupEventListeners = function(){
        
        var DOM = UICtrl.getDOMstrings();
        
        //when you click on the add button you call the ctrlAddItem function to add the item
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
   
        //When you hit the Enter button, you call the ctrlAddItem function to add the item
        document.addEventListener('keypress', function(event){
        
            //which is used in case any browser does not support the keyCode
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
                }   
        });
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };
    
    
    var updateBudget = function(){
        
        //1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        //2. Return the budget - it returns the budget, totalIncome, totalExpense, percentage
        var budget = budgetCtrl.getBudget(); 
        
        //3. Display the budget on the UI
        UICtrl.displayBudget(budget);
        
    };
    
    var updatePercentages = function (){
        
        //1. Calculate %
        //This is done in the Prototype
        budgetCtrl.calculatePercentages(); 
        
        
        //2. Read percentages
        var percentages = budgetCtrl.getPercentages();
        
        
        //3. Update the UI
        UICtrl.displayPercentages(percentages);
        
    };
    
    var ctrlAddItem = function(){
        //1. Get the field input data
        var input, newItem;
        
        var input = UICtrl.getInput();
        //console.log(input);
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0 && isNaN(input.description)){
            
            //2. Add the item to the budget controller
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);
        
            //4. Clear fields from the input
            UICtrl.clearFields();
            
            //5. Calculate the budget
            updateBudget();
            
            //6. Update %
            updatePercentages();
        }
    };
    
    var ctrlDeleteItem = function(event){  
        var itemID, splitID, type, ID; 
        itemID = event.target.parentNode.parentNode.parentNode.id;  
        console.log(event.target.parentNode.parentNode.parentNode.id); //DOM Traversing
        
        if (itemID){
            //income
            splitID = itemID.split('-');
            type    = splitID[0];
            ID      = parseInt(splitID[1]);
            
            //1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            //2. Delete an item from the DOM
            UICtrl.deleteListeItem(itemID);
            
            //3. Update budget
            updateBudget();
            
            //4. Update %
            updatePercentages();
        }
    };
    
    
    return {
        init: function(){
            console.log('Application has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget:0,
                totalIncome:0,
                totalExpense:0,
                percentage:-1
            });
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();