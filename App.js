
import {hide,show,setText} from './utils/util.js';



//get all the elements
const inputEl=document.getElementById("textInput");
const buttonEl=document.getElementById("search");
const resultEl=document.getElementById("results");
const errorEl=document.getElementById("error");
const loaderEl=document.getElementById("loader");

//add event listener
buttonEl.addEventListener('click',serveRecipe);


async function serveRecipe(){
    //get the text
    const query=inputEl.value;
//check if the text is valid,
    if(!query){
        alert("Type the food!");
        return;
    }

show(loaderEl);

//call the api using the query endpoint
try{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    const mealData= await data.json();
 

    if(!mealData.meals){
        setText(errorEl,"No Data available!");
        return;
        
    }

    displayMeals(mealData.meals);
}
catch(error){
    setText(errorEl,error.message);
}
finally{
    hide(loaderEl);
}

}


function displayMeals(meals){
    meals.map(meal=>{
        const card=document.createElement("div");
        card.classList.add("card");

        //add the inner html
        card.innerHTML=`
        <img src="${meal.strMealThumb}"><br>
        <p>${meal.strMeal}</p>
        <p>${meal.strArea}</p>
        `;

        //take it to another page to show the instruction when you click the card element
        card.addEventListener('click',()=>{
            //save the current instruction to localeStorage to pass it to the recipe.html file
            localStorage.setItem("instructions",meal.strInstructions);
            localStorage.setItem("meal",meal.strMeal);
            //go the page
            window.location.href="recipe.html"
        });

        //append it to the result div container
        resultEl.appendChild(card);
    });
}