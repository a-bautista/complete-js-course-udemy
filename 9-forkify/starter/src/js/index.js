// Global app controller

//import str from './models/Search.js';
//import {add as a, multiply as m, ID} from './views/searchView.js'
//import * as searchView from './views/searchView.js';

//console.log(`Using imported functions! ${a(ID, 2)} and ${m(3,5)}. ${str}`);
//console.log(`Using imported functions! ${searchView.add(ID, 2)} and ${searchView.multiply(3,5)}. ${str}`);

import Search from './models/Search.js';
import Recipe from './models/Recipe.js';
import List from  './models/List.js';
import Likes from './models/Likes.js';
import * as recipeView from './views/recipeView.js';
import * as likesView from './views/likesView.js';
import * as listView from './views/listView.js';
import * as searchView from './views/searchView.js'
import { elements, renderLoader, clearLoader } from './views/base.js'


/** Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/


const state = {};


/*
* Search controller
*/

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    console.log(query);
    
    if (query){
        //2) New search object and add to state
        
        state.search = new Search(query);
        
        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        
        try{
            //4) Search for recipes
            await state.search.getResults();
        
            //5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);    
            
        }catch(error){
            alert(error);   
            clearLoader();
        } 
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//Testing
window.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    //console.log(btn);
    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10); //10 indicates base 10
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        
    } 
});


/*
* Recipe Controller
*/

const controlRecipe = async () =>{
  // Get ID from url
  const id = window.location.hash.replace('#', '');
  console.log(id);
    
  if (id){
      //Prepare UI for changes
      recipeView.clearRecipe();
      renderLoader(elements.recipe);
      
      //Highlight selected search item
      if (state.search) searchView.highlightSelected(id);
      
      
      //Create new recipe object
      state.recipe = new Recipe(id);
      
      
      try{
        //Get recipe data and parse ingredients
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
      
        //Calc time servings
        state.recipe.calcTime();
        state.recipe.calcServings();
      
        //Render recipe
        clearLoader();
        recipeView.renderRecipe(
            state.recipe,
            state.likes.isLiked(id)
        );
          
      }catch(error){
          alert(error);
      }
      
    }
};

//window.addEventListener('hashchange',controlRecipe);
//window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/*
* List controller
*/

const controlList =() => {
  //create a new list if there is none yet
  if (!state.list) state.list = new List();
    
  //Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(element => {
       const item = state.list.addItem(element.count, element.unit, element.ingredient); 
       listView.renderItem(item);
    });
}


//Handle delete and update list item events
elements.shopping.addEventListener('click', element =>{
   const id = element.target.closest('.shopping__item').dataset.itemid;
    
    //Handle the delete button
    if(element.target.matches('.shopping__delete, .shopping__delete *')){
        //Delete from state
        state.list.deleteItem(id);
        
        //Delete from UI
        listView.deleteItem(id);
        
    //handle the count update
    }else if(element.target.matches('.shopping__count-value')){
        const val = parseFloat(element.target.value);
        state.list.updateCount(id, val);
    }
});

/*
* Likes controller
*/


const controlLike = () => {
    
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    
    
    //user has not yet liked current recipe
    if(!state.likes.isLiked(currentID)){
    
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        
        // Toggle the like button
        likesView.toggleLikeBtn(true);
        
        
        // Add like to the UI list
        likesView.renderLike(newLike);
        
        
    //user has liked current recipe
    }else{
        
        // Remove like from the state
        state.likes.deleteLike(currentID);
        
         // Toggle the like button
        likesView.toggleLikeBtn(false);
        
        
        // Remove like from the UI list
        likesView.deleteLike(currentID);
        
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    
};

//Restore liked recipes on page loads
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    //Restore likes
    state.likes.readStorage();
    
    //Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());    
    
    //Render likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


// Handling recipe button clicks
elements.recipe.addEventListener('click', element =>{
   if (element.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked
       if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');  
            recipeView.updateServingsIngredients(state.recipe);
          }
    } else if(element.target.matches('.btn-increase, .btn-increase *')){
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }else if(element.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    }else if(element.target.matches('.recipe__love, .recipe__love *')){
        //Like controller
        controlLike();
    }
});

